#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::path::Path;
use std::{fs::File, io::Write};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn save_txt(path: &str, text: &str) {
    let mut file = File::create(path).unwrap();
    file.write_all(text.as_bytes()).unwrap();
}

#[tauri::command]
fn open_txt(path: &str) -> String {
    std::fs::read_to_string(&path).unwrap()
}

#[tauri::command]
fn fast_match_txt(text: &str, pathtitle: &str) -> (String, String) {
    let path = Path::new(pathtitle).with_file_name("");
    let files = path.read_dir().unwrap();

    for file in files {
        if file.as_ref().unwrap().path().is_dir() {
            continue;
        }
        let txt_buf = match std::fs::read_to_string(file.as_ref().unwrap().path()){
            Ok(val) => val,
            Err(_) => {continue;}, 
        };
        let result = txt_buf.find(text).unwrap_or(txt_buf.len());

        if result != txt_buf.len() {
            return (
                txt_buf,
                file.unwrap().path().to_string_lossy().into_owned(),
            );
        };
    }
    ("".to_string(), pathtitle.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_txt,
            open_txt,
            fast_match_txt
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
