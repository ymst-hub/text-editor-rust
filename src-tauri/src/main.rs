#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::{fs::File, io::Write};
use std::path::Path;
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
fn match_txt(text: &str, pathtitle: &str) -> String {
    println!("{}",text);
    let path = Path::new(pathtitle).with_file_name("");
    println!("{} text: {}", path.to_str().unwrap(),text);
    let files = path.read_dir().unwrap();
    for file in files {
        let txt_buf = std::fs::read_to_string(file.unwrap().path()).unwrap();
        let result =txt_buf.find(text).unwrap_or(txt_buf.len());
        println!("{}",result);
        if result != txt_buf.len() {
            return txt_buf;
        };
    }
    "".to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_txt, open_txt,match_txt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
