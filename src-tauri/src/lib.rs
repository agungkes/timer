// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{Emitter, Manager, PhysicalPosition};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_single_instance::init(|app, args, _cwd| {
            if args.len() > 1 {
                let event_name = &args[1];
                app.emit("dslr-event", event_name).unwrap();
            }
        }))
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            if let Some(window) = app.get_webview_window("main") {
                window.set_ignore_cursor_events(true).unwrap();
            }

            if let Some(monitor) = window.current_monitor().unwrap() {
                let size = monitor.size();
                println!(
                    "Resolusi monitor utama terdeteksi: {}x{}",
                    size.width, size.height
                );

                let window_size = window.inner_size().unwrap(); // Ukuran jendela kita
                let x = (size.width as i32 / 2) - (window_size.width as i32 / 2);
                let y = 70;

                window.set_position(PhysicalPosition::new(x, y)).unwrap();

                window.set_ignore_cursor_events(true).unwrap();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
