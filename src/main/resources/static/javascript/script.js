//validate
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

  if (duration == "") {
    alert("duration is required");
    return false;
  }

  return true;
}

//show data from localstorage
function showData() {
  var taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  var html = "";

  taskList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.date + "</td>";
    html += "<td>" + element.duration + "</td>";
    html +=
      '<td> <button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Update</button> </td>';
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
