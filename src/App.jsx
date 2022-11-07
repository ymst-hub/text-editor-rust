import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open, save } from '@tauri-apps/api/dialog'

function App() {
  const [text, setText] = useState("");
  const [pathtitle, setPathtitle] = useState("");
  //ボタンの処理
  async function save_txt() {
    let path = await save({
      multiple: false,
    })
    if (path == null || path == undefined) { return }
    setPathtitle(path)
    await invoke("save_txt", { path, text })
  }
  async function open_txt() {
    let path = await open({
      multiple: false,
    })
    if (path == null || path == undefined) { return }
    let return_text = await invoke("open_txt", { path })
    setPathtitle(path)
    setText(return_text)

  }

  async function match_txt() {
    if (pathtitle == null || pathtitle == undefined || pathtitle == "") {
      alert("ファイルを開くか、保存してください")
      return
    }
    if (text == null || text == undefined || text == "") {
      alert("何も入力されていません")
      return
    }
    let [fileText, paths] = await invoke("fast_match_txt", { text, pathtitle })
    setText(fileText)
    setPathtitle(paths)
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

      <button type="button" onClick={() => match_txt()}>
        FastMatch
      </button>

      <textarea id="texts" name="texts"
        value={text}
        rows="16" cols="33"
        onChange={(e) => setText(e.currentTarget.value)}
      >
      </textarea>
      <p>最後に利用したパス：{pathtitle}</p>
    </div>
  );

}

export default App;
