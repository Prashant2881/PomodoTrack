let timer;
let isRunning = false;
let timeLeft = 25 * 60;
let pomodoroCount = 0; 
let totalTasks = 0;
let completedTasks = 0; 


const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const themeSelect = document.getElementById("theme");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const setTimerButton = document.getElementById("setTimer");
const pomodoroCountElement = document.getElementById("pomodoroCount");


const todoInput = document.getElementById("todoInput");
const addTaskButton = document.getElementById("addTask");
const todoList = document.getElementById("todoList");


const completionPercentageElement = document.getElementById("completionPercentage");
const progressBarElement = document.getElementById("progressBar");
const completedTasksCountElement = document.getElementById("completedTasksCount");
const totalTasksCountElement = document.getElementById("totalTasksCount");


function updateDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Pomodoro session completed!");
        incrementPomodoroCount();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60; 
  updateDisplay();
}


setTimerButton.addEventListener("click", () => {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  timeLeft = hours * 3600 + minutes * 60;
  updateDisplay();
});


function incrementPomodoroCount() {
  pomodoroCount++;
  pomodoroCountElement.textContent = pomodoroCount;
}


function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    totalTasks++;
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="taskCheckbox" onchange="toggleTaskCompletion(this)">
      <span>${taskText}</span>
      <button onclick="deleteTask(this)">Delete</button>
    `;
    todoList.appendChild(li);
    todoInput.value = "";
    updateProgress();
  }
}

function toggleTaskCompletion(checkbox) {
  const taskItem = checkbox.parentElement;
  const taskText = taskItem.querySelector("span");

  
  if (checkbox.checked) {
    taskItem.classList.add("completed");
    completedTasks++;
  } else {
    taskItem.classList.remove("completed");
    completedTasks--;
  }

  updateProgress();
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  const checkbox = taskItem.querySelector("input[type='checkbox']");
  if (checkbox.checked) {
    completedTasks--;
  }
  totalTasks--;
  taskItem.remove();
  updateProgress();
}


function updateProgress() {
  if (totalTasks === 0) {
    completionPercentageElement.textContent = "0%";
    progressBarElement.style.width = "0%";
  } else {
    const percentage = Math.floor((completedTasks / totalTasks) * 100);
    completionPercentageElement.textContent = `${percentage}%`;
    progressBarElement.style.width = `${percentage}%`;
  }

 
  completedTasksCountElement.textContent = completedTasks;
  totalTasksCountElement.textContent = totalTasks;
}


startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);


addTaskButton.addEventListener("click", addTask);


updateDisplay();
