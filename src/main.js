window.addEventListener("DOMContentLoaded", () => {
  let timeLeft = 5;

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("time").textContent = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      window.close();
    }

    if (timeLeft <= 10) {
      document.getElementById("timer-container").style.color = "#ff0000"; // Berubah merah saat kritis
    }

    timeLeft--;
  }, 1000);
});
