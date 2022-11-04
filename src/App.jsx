import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  //todo ボタンの処理を追加して、保存できるようにする（ファイルがあれば追記）
  //todo ファイル検索を作成する
  return (
    <div>
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
