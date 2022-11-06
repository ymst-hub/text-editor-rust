import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open, save } from '@tauri-apps/api/dialog'

function App() {
  const [text, setText] = useState("");
  //ボタンの処理
  async function save_txt() {
    let path = await save({
      multiple: false,
      filters: [{
        name: 'title',
        extensions: ['txt']
      }]
    })
    if (path == null || path == undefined){ return }
    await invoke("save", { path, text })
  }
  async function open_txt() {
    let path = await open({
      multiple: false,
      filters: [{
        name: 'title',
        extensions: ['txt']
      }]
    })
    if (path == null || path == undefined) { return }
    setText(await invoke("open", { path }))
    
  }
  //todo ボタンの処理を追加して、保存できるようにする（ファイルがあれば追記）
  //todo ファイル検索を作成する
  return (
    <div>
      <button type="button" onClick={() => save_txt()}>
        Save
      </button>

      <button type="button" onClick={() => open_txt()}>
        Open
      </button>

      <textarea id="texts" name="texts"
        value={text}
        rows="16" cols="33"
        onChange={(e) => setText(e.currentTarget.value)}
      >
      </textarea>
    </div>
  );

}

export default App;
