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
        ')" class="btn delete-button"> <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.16667 3.49992H0.5C0.367392 3.49992 0.240215 3.44724 0.146447 3.35347C0.0526785 3.2597 0 3.13253 0 2.99992C0 2.86731 0.0526785 2.74013 0.146447 2.64637C0.240215 2.5526 0.367392 2.49992 0.5 2.49992H11.5C11.6326 2.49992 11.7598 2.5526 11.8536 2.64637C11.9473 2.74013 12 2.86731 12 2.99992C12 3.13253 11.9473 3.2597 11.8536 3.35347C11.7598 3.44724 11.6326 3.49992 11.5 3.49992H2.16667V12.3333C2.16667 12.4427 2.18822 12.5511 2.2301 12.6522C2.27198 12.7533 2.33336 12.8451 2.41074 12.9225C2.48813 12.9999 2.57999 13.0613 2.6811 13.1032C2.7822 13.145 2.89057 13.1666 3 13.1666H9C9.10944 13.1666 9.2178 13.145 9.3189 13.1032C9.42001 13.0613 9.51187 12.9999 9.58926 12.9225C9.66664 12.8451 9.72802 12.7533 9.7699 12.6522C9.81178 12.5511 9.83333 12.4427 9.83333 12.3333V4.99992C9.83333 4.86731 9.88601 4.74013 9.97978 4.64637C10.0735 4.5526 10.2007 4.49992 10.3333 4.49992C10.4659 4.49992 10.5931 4.5526 10.6869 4.64637C10.7807 4.74013 10.8333 4.86731 10.8333 4.99992V12.3333C10.8333 13.3458 10.0125 14.1666 9 14.1666H3C1.9875 14.1666 1.16667 13.3458 1.16667 12.3333V3.49992ZM4.66667 1.83325C4.53406 1.83325 4.40688 1.78057 4.31311 1.68681C4.21935 1.59304 4.16667 1.46586 4.16667 1.33325C4.16667 1.20064 4.21935 1.07347 4.31311 0.979699C4.40688 0.88593 4.53406 0.833252 4.66667 0.833252H7.33333C7.46594 0.833252 7.59312 0.88593 7.68689 0.979699C7.78065 1.07347 7.83333 1.20064 7.83333 1.33325C7.83333 1.46586 7.78065 1.59304 7.68689 1.68681C7.59312 1.78057 7.46594 1.83325 7.33333 1.83325H4.66667ZM4.16667 6.33325C4.16667 6.20064 4.21935 6.07347 4.31311 5.9797C4.40688 5.88593 4.53406 5.83325 4.66667 5.83325C4.79927 5.83325 4.92645 5.88593 5.02022 5.9797C5.11399 6.07347 5.16667 6.20064 5.16667 6.33325V10.3333C5.16667 10.4659 5.11399 10.593 5.02022 10.6868C4.92645 10.7806 4.79927 10.8333 4.66667 10.8333C4.53406 10.8333 4.40688 10.7806 4.31311 10.6868C4.21935 10.593 4.16667 10.4659 4.16667 10.3333V6.33325ZM6.83333 6.33325C6.83333 6.20064 6.88601 6.07347 6.97978 5.9797C7.07355 5.88593 7.20072 5.83325 7.33333 5.83325C7.46594 5.83325 7.59312 5.88593 7.68689 5.9797C7.78065 6.07347 7.83333 6.20064 7.83333 6.33325V10.3333C7.83333 10.4659 7.78065 10.593 7.68689 10.6868C7.59312 10.7806 7.46594 10.8333 7.33333 10.8333C7.20072 10.8333 7.07355 10.7806 6.97978 10.6868C6.88601 10.593 6.83333 10.4659 6.83333 10.3333V6.33325Z" fill="white"/></svg>&nbsp;&nbsp;Delete</button><button onclick="updateData(' +
        index +
        ')" class="btn update-button"> <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 12C13.1326 12 13.2598 12.0526 13.3536 12.1464C13.4473 12.2402 13.5 12.3673 13.5 12.5C13.5 12.6326 13.4473 12.7597 13.3536 12.8535C13.2598 12.9473 13.1326 13 13 13H1C0.867392 13 0.740215 12.9473 0.646447 12.8535C0.552678 12.7597 0.5 12.6326 0.5 12.5C0.5 12.3673 0.552678 12.2402 0.646447 12.1464C0.740215 12.0526 0.867392 12 1 12H13ZM12.06 0.537125L12.2958 0.772958C13.0125 1.48913 13.0125 2.65046 12.2958 3.36679L5.54367 10.1146C5.20855 10.4495 4.78526 10.6824 4.323 10.7863L1.94417 11.3206C1.57167 11.4045 1.24633 11.0573 1.35433 10.6911L2.0315 8.39612C2.14976 7.99518 2.36665 7.63028 2.66233 7.33479L9.46433 0.537125C10.181 -0.179042 11.3432 -0.179042 12.0598 0.537125H12.06ZM8.9425 2.47346L3.37 8.04229C3.19267 8.21957 3.06259 8.43846 2.99167 8.67896L2.555 10.158L4.10333 9.81012C4.38064 9.74785 4.63459 9.60816 4.83567 9.40729L10.3583 3.88813L8.94267 2.47346H8.9425ZM10.1722 1.24446L9.65033 1.76613L11.066 3.18079L11.5877 2.65929C11.6651 2.5819 11.7266 2.49 11.7685 2.38885C11.8104 2.2877 11.832 2.17928 11.832 2.06979C11.832 1.9603 11.8104 1.85188 11.7685 1.75073C11.7266 1.64958 11.6651 1.55768 11.5877 1.48029L11.3518 1.24446C11.1954 1.08811 10.9832 1.00029 10.762 1.00029C10.5408 1.00029 10.3286 1.08811 10.1722 1.24446Z" fill="white"/></svg>Update</button> </td>';
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
  animationArea.style.display = "block";
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
  //clear the check box
  updateCheckBoxToUncheck();
  checkComplete();
  resetTimer();
}

//when start the game, hide the check boxs column
function hideCheckColumn() {
  var gameColumn = document.getElementsByClassName("game-column");

  for (let i = 0; i < gameColumn.length; i++) {
    gameColumn[i].style.display = "none";
  }
}

const checkBoxs = document.querySelectorAll(".check-boxs");

//check if any checkBox checked, if so, display start button
function checkIfchecked() {
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
  for (let i = 0; i < checkBoxs.length; i++) {
    checkBoxs[i].checked = false;
    console.log("yesyes");
  }
}

//when click start hide the unchecked rows
function hideUnchecked() {
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

//animation

// completeButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     const row = button.parentNode.parentNode;
//     const rowIndex = Array.from(row.parentNode.children).indexOf(row);
//     const selectedRow =
//       completeButton[rowIndex].parentNode.parentNode.parentNode;
//     selectedRow.getElementsByTagName("tr")[rowIndex].style.textDecoration =
//       "line-through";
//     selectedRow.getElementsByTagName("tr")[rowIndex].style.fontStyle = "italic";
//     //hide the button when click
//     button.style.display = "none";
//   });
// });

const rocketGroup = document.getElementById("rocketGroup");
const rocket = document.getElementById("rocket");
const fire = document.getElementById("fire");
const cloud = document.getElementById("cloud");
const smoke = document.getElementById("whitesmoke");

//the animation
window.addEventListener("DOMContentLoaded", () => {
  completeButton.forEach((button) => {
    button.addEventListener("click", () => {
      if (fire.classList.contains("hide")) {
        fire.classList.remove("hide");
        smoke.classList.remove("hide");
        smoke.classList.add("disappear");
        rocket.classList.add("move");
      } else if (cloud.classList.contains("hide")) {
        cloud.classList.remove("hide");
        cloud.classList.add("appear");
      } else if (cloud.classList.contains("appear")) {
        cloud.classList.remove("appear");
        cloud.classList.add("away");
        rocket.classList.remove("move");
        rocket.classList.add("fly");
      }
    });
  });
});

//maybe
// function countTotalChecked() {
//   let count = 0;

//   for (let i = 0; i < checkBoxs.length; i++) {
//     if (checkBoxs[i].checked) {
//       count++;
//     }
//   }
//   if (count < 3) {
//     alert("please select more than three tasks");
//   }
// }
