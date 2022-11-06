#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::io::prelude::*;
use std::{fs::File, io::Write,io::BufReader};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn save(path: &str, text: &str){
    let mut file = File::create(path).unwrap();
    file.write_all(text.as_bytes()).unwrap();
    println!("save");
}

#[tauri::command]
fn open(path: &str) -> String{
    std::fs::read_to_string(&path).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save,open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
