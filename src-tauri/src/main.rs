#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::{fs::File, io::Write};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn save_txt(path: &str, text: &str){
    let mut file = File::create(path).unwrap();
    file.write_all(text.as_bytes()).unwrap();
}

#[tauri::command]
fn open_txt(path: &str) -> String{
    std::fs::read_to_string(&path).unwrap()
}
#[tauri::command]
fn match_txt(text: &str) -> String{
    todo!()
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_txt,open_txt,match_txt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
