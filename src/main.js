const { getCurrentWindow } = window.__TAURI__.window;
const { listen } = window.__TAURI__.event;

window.addEventListener("DOMContentLoaded", async () => {
  let timeLeft = 5;

  const statusEl = document.getElementById("status-display");

  await listen("dslr-event", async (event) => {
    const dslrEvent = event.payload; // Ini berisi "session_start", "countdown_start", dll.

    statusEl.innerText = `Event masuk: ${dslrEvent}`;

    // Contoh: Jika countdown dslrBooth mulai, munculkan timer kita
    // if (dslrEvent === "countdown_start") {
    //   await getCurrentWindow().show();
    //   startMyTimer(); // Fungsi timer yang sudah kamu buat
    // }
  });

  // const timerInterval = setInterval(async () => {
  //   const minutes = Math.floor(timeLeft / 60);
  //   const seconds = timeLeft % 60;

  //   document.getElementById("time").textContent = `${String(minutes).padStart(
  //     2,
  //     "0"
  //   )}:${String(seconds).padStart(2, "0")}`;

  //   if (timeLeft <= 0) {
  //     clearInterval(timerInterval);
  //     const appWindow = getCurrentWindow();
  //     await appWindow.hide();
  //   }

  //   if (timeLeft <= 10) {
  //     document.getElementById("timer-container").style.color = "#ff0000"; // Berubah merah saat kritis
  //   }

  //   timeLeft--;
  // }, 1000);
});
