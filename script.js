const countdownElement = document.getElementById("countdown");

// Fetch the remaining time from the server
async function fetchCountdownTime() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/countdown");
    const data = await response.json();
    const { remainingTime } = data;

    // Start the countdown timer
    startCountdown(remainingTime);
  } catch (error) {
    console.error("Failed to fetch countdown time:", error);
  }
}

// Start the countdown timer
function startCountdown(remainingTime) {
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = remainingTime - now;

    const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${months}month(s) ${days}day(s) ${hours}hour(s) ${minutes}m ${seconds}s`;

    // Check if the countdown is finished
    if (distance < 0) {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = "We're finally here!";
    }
  }, 1000);
}

// Fetch the countdown time when the page loads
fetchCountdownTime();

// Toggle light/dark mode
const toggleMode = document.getElementById("toggle-mode");
const logo = document.getElementById("logo");
const modeLabel = document.getElementById("mode-label");
const overlay = document.querySelector(".overlay");

const setMode = (mode) => {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    logo.src = "logo-dark.jpeg";
    modeLabel.textContent = "Dark Mode";
    modeLabel.style.color = "#FA403C";
    modeLabel.style.fontWeight = "600";
    overlay.classList.remove("light-overlay");
    overlay.classList.add("dark-overlay");
  } else {
    document.body.classList.remove("dark-mode");
    logo.src = "logo-light.jpeg";
    modeLabel.textContent = "Light Mode";
    modeLabel.style.color = "#FB613C";
    modeLabel.style.fontWeight = "600";
    overlay.classList.remove("dark-overlay");
    overlay.classList.add("light-overlay");
  }
};

// Set initial mode based on user's device preference
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  toggleMode.checked = true;
  setMode("dark");
}

// Listen for mode toggle changes
toggleMode.addEventListener("change", () => {
  if (toggleMode.checked) {
    setMode("dark");
  } else {
    setMode("light");
  }
});
