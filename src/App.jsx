import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message, open, save } from '@tauri-apps/api/dialog'

function App() {

  const [text, setText] = useState("");//本文
  const [pathtitle, setPathtitle] = useState("");//ポイントパス
 

  //ボタンの処理
  //新規保存
  async function save_txt() {
    let path = await save({
      multiple: false,
    })
    if (path == "" || path == null || path == undefined) { return }
    setPathtitle(path)
    await invoke("save_txt", { path, text })
  }
  //上書き保存
  async function over_save_txt() {
    if (pathtitle == "" || pathtitle == null || pathtitle == undefined) {
      message("ファイルを開くか、保存してください")
      return
    }
    let path = pathtitle
    await invoke("save_txt", { path, text })
    message("上書き保存しました")
  }
  //開く
  async function open_txt() {
    let path = await open({
      multiple: false,
    })
    if (path == null || path == undefined) { return }
    let fileText = await invoke("open_txt", { path })
    if (fileText == "") { message("値が入っていません") }
    setPathtitle(path)
    setText(fileText)

  }
  //ファイル探索
  async function match_txt() {
    if (pathtitle == null || pathtitle == undefined || pathtitle == "") {
      message("ファイルを開くか、保存してください")
      return
    }
    if (text == null || text == undefined || text == "") {
      message("何も入力されていません")
      return
    }
    let [fileText, path] = await invoke("one_match_txt", { text, pathtitle })
    if (path == "" || path == null || path == undefined) {
      message("ファイルが見つかりませんでした")
      return
    }
    setText(fileText)
    setPathtitle(path)
  }

  //clear
  function clear_txt() {
    setText("")
  }

  return (
    <div>
      <button type="button" onClick={() => save_txt()}>
        新規保存
      </button>

      <button type="button" onClick={() => open_txt()}>
        ファイルを開く
      </button>

      <button type="button" onClick={() => over_save_txt()}>
        上書き保存
      </button>

      <button type="button" onClick={() => match_txt()}>
        ファイル探索
      </button>

      <button type="button" onClick={() => clear_txt()}>
        クリア
      </button>

      <p>ポイントパス：{pathtitle}</p>
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
