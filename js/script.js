// Calendar

//Get the calendar
const calendar = document.querySelector("#calendar");

//Get current month
function currentMonth() {
  let month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  let currentDate = new Date();
  let currentMonth = month[currentDate.getMonth()];
  document.querySelector("#current-month").innerHTML = currentMonth;
}

// Call current month
currentMonth();

// Get days and weeks
function getDayName(dayName) {
  const date = new Date(Date.UTC(2020, 5, day));
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

for (var day = 1; day <= 30; day++) {
  let weekDay = getDayName(day);
  let field = `<div class="day openbtn"><span>${weekDay}</span><span>${day}</span></div>`;
  calendar.insertAdjacentHTML("beforeend", field);
}

// Modal

// Get the modal
const modal = document.getElementById("modal");

// Get the button that opens the modal
const allButtons = document.querySelectorAll(".day");

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (e) {
    let result = this.childNodes[1].textContent;

    e.currentTarget.classList.add("selected");

    // Task list
    const form = document.querySelector("#task-form");
    const taskList = document.querySelector(".task-list");
    const clearBtn = document.querySelector(".clear-tasks");
    const filter = document.querySelector("#filter");
    const taskInput = document.querySelector("#task");

    // Load all event listeners
    loadEventListeners();

    // Load all event listeners
    function loadEventListeners() {
      //DOM Load event
      document.addEventListener("DOMContentLoaded", getTasks);
      // Add task event
      form.addEventListener("submit", addTask);
      // Remove task event
      taskList.addEventListener("click", removeTask);
      // Remove task event
      clearBtn.addEventListener("click", clearTasks);
      // Filter tasks event
      filter.addEventListener("keyup", filterTasks);
    }

    // Get Tasks from Local Storage
    function getTasks() {
      let tasks;
      if (localStorage.getItem(result) === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem(result));
      }

      tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "list-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
      });
    }

    // Add task
    function addTask(e) {
      if (taskInput.value === "") {
        alert("Add a task");
      }

      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "list-item";
      // Create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));
      // Create new link element
      const link = document.createElement("a");
      // Add class
      link.className = "delete-item secondary-content";
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);

      // Append li to ul
      taskList.appendChild(li);

      // Store in Local Storage
      storeTaskInLocalStorage(taskInput.value);

      //  Clear input
      taskInput.value = "";

      e.preventDefault();
    }

    // Store Task
    function storeTaskInLocalStorage(task) {
      let tasks;
      if (localStorage.getItem(result) === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem(result));
      }

      tasks.push(task);

      localStorage.setItem(result, JSON.stringify(tasks));
    }

    // Remove Task
    function removeTask(e) {
      if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
          e.target.parentElement.parentElement.remove();

          // Remove from Local Storage
          removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
      }
    }

    // Remove from Local Storage
    function removeTaskFromLocalStorage(taskItem) {
      let tasks;
      if (localStorage.getItem(result) === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem(result));
      }

      tasks.forEach(function (task, index) {
        if (taskItem.textContent == task) {
          tasks.splice(index, 1);
        }
      });

      localStorage.setItem(result, JSON.stringify(tasks));
    }

    // Clear Tasks
    function clearTasks() {
      // taskList.innerHTML = "";

      // Faster
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }

      // Clear from Local Storage
      clearTasksFromLocalStorage();
    }

    // Clear Tasks from Local Storage
    function clearTasksFromLocalStorage() {
      localStorage.clear();
    }

    // Filter Tasks
    function filterTasks(e) {
      const text = e.target.value.toLowerCase();

      document.querySelectorAll(".list-item").forEach(function (task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    }
  });
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

document.querySelectorAll(".openbtn").forEach((item) => {
  item.addEventListener("click", (e) => {
    //handle click
    // When the user clicks the button, open the modal
    item.parentElement.onclick = function () {
      modal.style.display = "block";
    };
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function (e) {
  modal.style.display = "none";
  location.reload();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    location.reload();
  }
};
