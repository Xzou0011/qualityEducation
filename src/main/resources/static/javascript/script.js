// find the local time and set the minimum input date as today
var tzoffset = new Date().getTimezoneOffset() * 60000;
var localTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)
    .split("T")[0];
document.getElementById("date").setAttribute("min", localTime);

//validate the user input - blank
function validateForm() {
  var name = document.getElementById("name").value;
  var date = document.getElementById("date").value;
  var duration = document.getElementById("duration").value;
  if (name == "") {
    alert("name is required");
    return false;
  }

  if (date == "") {
    alert("date is required");
    return false;
  }
  //set the duration maximum 90 minutes
  if (duration == "") {
    alert("duration is required");
    return false;
  } else if (duration > 90) {
    alert("try to divided it into a smaller task");
    return false;
  }
  return true;
}

//show data from localstorage
function showData() {
  var taskList;
  var gameModeButton = document.getElementById("game-mode-btn");
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
    if (taskList.length === 0) {
      gameModeButton.style.display = "none";
    } else {
      gameModeButton.style.display = "block";
    }
  }

  var html = "";
  taskList.forEach(function (element, index) {
    html += "<tr>";
    html +=
        "<td style='display: none' class='game-column' onchange='checkIfchecked()'> <input type='checkbox' class='check-boxs'> </td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.date + "</td>";
    html += "<td>" + element.duration + "</td>";
    html +=
        '<td class = "action-buttons"> <button onclick="deleteData(' +
        index +
        ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
        index +
        ')" class="btn btn-warning m-2">Update</button> </td>';
    html +=
        '<td style="display: none" class="complete-column" onclick="chanegCompleteRowStatus(' +
        index +
        ')"> <button class="btn btn-danger complete-button">Complete</button> </td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all data when page load
document.onload = showData();

//function to add new created task to local storage
function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var duration = document.getElementById("duration").value;
    var taskList;
    if (localStorage.getItem("taskList") == null) {
      taskList = [];
    } else {
      taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    taskList.push({
      name: name,
      date: date,
      duration: duration,
      completed: false,
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("duration").value = "";
  }
}

//delete function
function deleteData(index) {
  var taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  showData();
}

//function to edit the data
function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  document.getElementById("name").value = taskList[index].name;
  document.getElementById("date").value = taskList[index].date;
  document.getElementById("duration").value = taskList[index].duration;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      taskList[index].name = document.getElementById("name").value;
      taskList[index].date = document.getElementById("date").value;
      taskList[index].duration = document.getElementById("duration").value;

      localStorage.setItem("taskList", JSON.stringify(taskList));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("date").value = "";
      document.getElementById("duration").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}

//game mode
function showCheckBox() {
  var gameColumn = document.getElementsByClassName("game-column");
  var actionButtons = document.getElementsByClassName("action-buttons");
  var inputGroup = document.getElementById("add-input-group");
  var gameModeButton = document.getElementById("game-mode-btn");
  var cancelButton = document.getElementById("cancel-button");
  for (let i = 0; i < gameColumn.length; i++) {
    if (gameColumn[i].style.display === "none") {
      gameColumn[i].style.display = "block";
      actionButtons[i].style.display = "none";
      inputGroup.style.display = "none";
      gameModeButton.style.display = "none";
      cancelButton.style.display = "inline";
    } else {
      return false;
    }
  }
}

//
//game mode
const timerDiv = document.getElementById("time-buttons");
const animationArea = document.getElementById("animationArea");

//start the game
function startGame() {
  const startButton = document.getElementById("start-button");
  startButton.style.display = "none";
  timerDiv.style.display = "block";
  //display animation
  // animationArea.style.display = "block";
  hideUnchecked();
  hideCheckColumn();
}

//back to the planner page and display all sections
function cancelGameMode() {
  var gameColumn = document.getElementsByClassName("game-column");
  var actionButtons = document.getElementsByClassName("action-buttons");
  var inputGroup = document.getElementById("add-input-group");
  var gameModeButton = document.getElementById("game-mode-btn");
  var startButton = document.getElementById("start-button");
  var cancelButton = document.getElementById("cancel-button");
  for (let i = 0; i < gameColumn.length; i++) {
    gameColumn[i].style.display = "none";
    actionButtons[i].style.display = "block";
    inputGroup.style.display = "block";
    gameModeButton.style.display = "block";
    startButton.style.display = "none";
    cancelButton.style.display = "none";
    animationArea.style.display = "none";
  }
  timerDiv.style.display = "none";
  hideCompleteColumn();
  showAllRows();
  resetTimer();
  checkComplete();
  //clear the check box
  updateCheckBoxToUncheck();
}

//when start the game, hide the check boxs column
function hideCheckColumn() {
  var gameColumn = document.getElementsByClassName("game-column");

  for (let i = 0; i < gameColumn.length; i++) {
    gameColumn[i].style.display = "none";
  }
}

//check if any checkBox checked, if so, display start button
function checkIfchecked() {
  const checkBoxs = document.querySelectorAll(".check-boxs");
  const startButton = document.getElementById("start-button");

  let isChecked = false;
  for (let i = 0; i < checkBoxs.length; i++) {
    if (checkBoxs[i].checked) {
      isChecked = true;
      break;
    }
  }

  if (isChecked) {
    startButton.style.display = "inline";
  } else {
    startButton.style.display = "none";
  }
}

//update the checkbox to uncheck when back to study planner page
function updateCheckBoxToUncheck() {
  const checkBoxs = document.querySelectorAll(".check-boxs");
  for (let i = 0; i < checkBoxs.length; i++) {
    checkBoxs[i].checked = false;
  }
}

//when click start hide the unchecked rows
function hideUnchecked() {
  const checkBoxs = document.querySelectorAll(".check-boxs");

  checkBoxs.forEach((checkbox) => {
    const row = checkbox.parentNode.parentNode;
    if (!checkbox.checked) {
      row.style.display = "none";
    } else {
      row.style.display = "table-row";
    }
  });
}

//show all the rows after the user cancel the game mode
function showAllRows() {
  const checkBoxs = document.querySelectorAll(".check-boxs");

  checkBoxs.forEach((checkbox) => {
    const row = checkbox.parentNode.parentNode;
    row.style.display = "table-row";
  });
}

//show the complete column
function showCompleteColumn() {
  var completeColumn = document.getElementsByClassName("complete-column");
  for (let i = 0; i < completeColumn.length; i++) {
    completeColumn[i].style.display = "block";
  }
}
//hide the complete column
function hideCompleteColumn() {
  var completeColumn = document.getElementsByClassName("complete-column");
  for (let i = 0; i < completeColumn.length; i++) {
    completeColumn[i].style.display = "none";
  }
}

//
//timer start
const playButtonClick = document.getElementsByClassName("timer-controller")[0];
const allTimeDisplay = document.getElementsByClassName("allTimeDisplay")[0];

var seconds = 0;
var minutes = 0;
var hours = 0;
var clickToPause = false;

//the time logic and display
function timeDisplay() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  //ensure the timer display in good-looking format
  if (hours < 10) {
    if (minutes < 10) {
      allTimeDisplay.innerHTML =
          "0" + hours + "&nbsp;:&nbsp;0" + minutes + "&nbsp;:&nbsp;" + seconds;
    }
    if (seconds < 10) {
      allTimeDisplay.innerHTML =
          "0" + hours + "&nbsp;:&nbsp;0" + minutes + "&nbsp;:&nbsp;0" + seconds;
    }
  } else {
    if (minutes < 10) {
      allTimeDisplay.innerHTML =
          hours + "&nbsp;:&nbsp;0" + minutes + ":" + seconds;
    }
    if (seconds < 10) {
      allTimeDisplay.innerHTML =
          hours + "&nbsp;:&nbsp;0" + minutes + "&nbsp;:&nbsp;0" + seconds;
    }
  }
  clickToPause = true;
}

//set interval as refreshed each second -> call timeDisplay function each second
function timerController() {
  if (clickToPause == false) {
    playButtonClick.innerHTML = "Have a Rest";
    alreasyPause = setInterval(timeDisplay, 1000);
    showCompleteColumn();
  } else {
    playButtonClick.innerHTML = "Start";
    clearInterval(alreasyPause);
    clickToPause = false;
    hideCompleteColumn();
  }
}

//reset the timer to 0 when back to the planner page
function resetTimer() {
  playButtonClick.innerHTML = "Start";
  clearInterval(alreasyPause);
  clickToPause = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  allTimeDisplay.innerHTML = "00 : 00 : 00";
}

//when click the complete button the selected row change style
// to line-through and italic
const completeButton = document.querySelectorAll(".complete-button");
completeButton.forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.parentNode.parentNode;
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    const selectedRow =
        completeButton[rowIndex].parentNode.parentNode.parentNode;
    selectedRow.getElementsByTagName("tr")[rowIndex].style.textDecoration =
        "line-through";
    selectedRow.getElementsByTagName("tr")[rowIndex].style.fontStyle = "italic";
    //hide the button when click
    button.style.display = "none";
  });
});

//user click complete button, the attribute completed will change from false
//to true
function chanegCompleteRowStatus(index) {
  var taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  taskList[index].completed = true;
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

//check whether the task was completed during the game mode
function checkComplete() {
  var taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  taskList.forEach((element, index) => {
    if (element.completed === true) {
      deleteData(index);
    }
  });
}
