import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  return (
    <div>
      <button>
      こんにちは
      </button>
      <button>
        こんにちは
      </button>
      <textarea id="texts" name="texts"
        rows="16" cols="33"
        onChange={(e) => setText(e.currentTarget.value)}
      >
      </textarea>
    </div>
  );
  
}

export default App;
