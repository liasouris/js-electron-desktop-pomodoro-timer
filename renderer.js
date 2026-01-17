let workDuration = 25 * 60; 
let breakDuration = 5 * 60; 
let isWorkSession = true;
let timeLeft = workDuration;
let timerInterval;

const timerDisplay = document.getElementById("timer");
const sessionLabel = document.getElementById("sessionLabel");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const breakBtn = document.getElementById("break");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// sets session label
function setSession(type) {
  sessionLabel.classList.remove("work", "break");
  sessionLabel.classList.add(type);
  sessionLabel.textContent = type === "work" ? "WORK MODE" : "BREAK MODE";
}

// update timer + progress bar
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // progress bar percentage
  let totalTime = isWorkSession ? workDuration : breakDuration;
  let percent = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${Math.floor(percent)}% COMPLETE`;
}

function startTimer() {
  if (timerInterval) return;
  
  setSession(isWorkSession ? "work" : "break");
  
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

// Switches between work and break sessions
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      if (isWorkSession) {
        isWorkSession = false;
        timeLeft = breakDuration;
        setSession("break");
      } else {
        isWorkSession = true;
        timeLeft = workDuration;
        setSession("work");
      }

      updateDisplay();
    }
  }, 1000);
}
// Button events
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  isWorkSession = true;
  timeLeft = workDuration;
  setSession("work");
  updateDisplay();
}

function breakNow() {
  pauseTimer();
  isWorkSession = false;
  timeLeft = breakDuration;
  setSession("break");
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
breakBtn.addEventListener('click', breakNow);

// default display
setSession("work");
updateDisplay();
