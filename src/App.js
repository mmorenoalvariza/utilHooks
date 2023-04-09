import "./styles.css";
import { useEffect, useRef, useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Form />
      <Debounce />
      <InfiniteScroll />
    </div>
  );
}

const Form = () => {
  useEffect(() => {}, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(e.target.name.value);
      }}
    >
      <input type="text" defaultValue={"foo"} name="name" />
      <input type="submit" name="Submit" />
    </form>
  );
};
const Debounce = () => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(time);
  }, [value]);
  return (
    <div>
      <h1>Debounced value</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="name"
      />
      <div>Value {value}</div>
      <div>Debounced value {debouncedValue}</div>
    </div>
  );
};
const INITIAL_ITEMS = Array.from(
  Array(15)
    .fill(null)
    .map((_, i) => "foo " + i)
);

const InfiniteScroll = () => {
  const targetRef = useRef();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const observerCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setItems((oldItems) => {
        const size = oldItems.length;
        return [
          ...oldItems,
          ...Array.from(
            Array(15)
              .fill(null)
              .map((_, i) => "foo " + (i + size))
          )
        ];
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>InfiniteScroll</h1>

      <div
        style={{
          border: "1px solid black",
          width: 500,
          height: "300px",
          overflowY: "scroll"
        }}
      >
        {items.map((i, index) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: "40%",
              backgroundColor: index % 2 === 0 ? "lightgray" : "darkgrey"
            }}
          >
            {i}{" "}
          </div>
        ))}
        <div ref={targetRef} />
      </div>
    </div>
  );
};
