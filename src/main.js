const { getCurrentWindow } = window.__TAURI__.window;
const { listen } = window.__TAURI__.event;
const { fetch } = window.__TAURI__.http;

const startTimer = async () => {
  await getCurrentWindow().show();

  let timeLeft = 5;

  const timerInterval = setInterval(async () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("time").textContent = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      await finishAndGoToSharing();
    }
    if (timeLeft <= 10) {
      document.getElementById("time").style.color = "#ff0000"; // Berubah merah saat kritis
    }
    timeLeft--;
  }, 1000);
};

async function finishAndGoToSharing() {
  try {
    await fetch("127.0.0.1:1500/api/lockscreen/show", {
      method: "GET",
    });

    console.log("Perintah sharing terkirim ke dslrBooth");
  } catch (error) {
    console.error("Gagal kontak dslrBooth:", error);
  } finally {
    await getCurrentWindow().hide();
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  startTimer();

  await listen("dslr-event", async (event) => {
    const dslrEvent = event.payload;

    if (dslrEvent === "session_start") {
      await getCurrentWindow().show();
      startTimer();
    }
  });
});
