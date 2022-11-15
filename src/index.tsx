import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

//Get a reference to the div with ID root
const el = document.getElementById("root");
//Tell React to take control of that element
const root = ReactDOM.createRoot(el!);

//Create a component
const App = () => {
  const ref = useRef() as any;
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const StartService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    StartService();
  }, []);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) {
      return;
    }
    console.log(ref.current);
  };

  return (
    <div>
      <textarea
        rows={10}
        cols={50}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

root.render(<App />);
