// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapArray = [];

const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps');

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  timeDisplay.innerHTML = "00:00:00";
  lapArray = [];
  lapsList.innerHTML = '';
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 10);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

  timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function addLap() {
  if (running) {
    let lapTime = timeDisplay.innerHTML;
    lapArray.push(lapTime);
    let lapElement = document.createElement('li');
    lapElement.innerHTML = lapTime;
    lapsList.appendChild(lapElement);
  }
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('lap-btn').addEventListener('click', addLap);
