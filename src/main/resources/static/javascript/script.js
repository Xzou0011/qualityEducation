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
        "<td style='display: none' class='game-column'> <input type='checkbox' class='check-boxs'> </td>";
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
        "<td class='complete-column'> <button class='btn btn-danger'>Complete</button> </td>";
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all data when page load
document.onload = showData();

//Function to add data to local storage
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
  var startButton = document.getElementById("start-button");
  var cancelButton = document.getElementById("cancel-button");
  console.log(gameColumn.length);
  for (let i = 0; i < gameColumn.length; i++) {
    if (gameColumn[i].style.display === "none") {
      gameColumn[i].style.display = "block";
      actionButtons[i].style.display = "none";
      inputGroup.style.display = "none";
      gameModeButton.style.display = "none";
      startButton.style.display = "inline";
      cancelButton.style.display = "inline";
    } else {
      return false;
    }
  }
}

function startGame() {
  var startButton = document.getElementById("start-button");
  startButton.style.display = "none";
  hideUnchecked();
  hideCheckColumn();
  showCompleteColumn();
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
  }
  showAllRows();
}

//when start the game, hide the check boxs column
function hideCheckColumn() {
  var gameColumn = document.getElementsByClassName("game-column");

  for (let i = 0; i < gameColumn.length; i++) {
    gameColumn[i].style.display = "none";
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

function showCompleteColumn() {
  var completeColumn = document.getElementsByClassName("complete-column");
  for (let i = 0; i < completeColumn.length; i++) {
    completeColumn[i].style.display = "block";
  }
}
