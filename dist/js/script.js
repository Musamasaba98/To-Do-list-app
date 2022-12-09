window.onload = function loadTodos() {
  loadTodosFromLocalStorage();
};
const date = document.querySelector("#date");
const btn = document.querySelector(".btn");
const lists = document.querySelector("#lists");
const input = document.querySelector("#text");
const form = document.querySelector("#form");
const edit = document.querySelector(".fa-pen-to-square");
const alert = document.querySelector(".alert");
let listItem = document.querySelector("#lists").childNodes;

//make the todo value to edit global
let currentEditValue = "";
//array of todos
let todos = [];
//function that creates list element
let listElement = (todo_task, checker = false, textDecoration = "none") => {
  let task = document.createElement("li");
  let label = document.createElement("label");
  let checkmark = document.createElement("span");
  let check = document.createElement("input");
  let cover = document.createElement("span");
  let upperDiv = document.createElement("div");
  let icons = document.createElement("div");
  check.setAttribute("type", "checkbox");
  check.setAttribute("checked", checker);
  let editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.className = "editInput";
  upperDiv.className = "check-text";
  label.className = "container";
  checkmark.className = "checkmark";
  cover.className = "item-text";
  cover.style.textDecoration = textDecoration;
  check.className = "custom-checkbox";
  let button = document.createElement("button");
  check.checked = checker;
  button.className = "editBtn";
  button.innerHTML = "Edit";
  icons.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  icons.innerHTML += '<i class="fa-solid fa-trash-can"></i>';
  task.classList.add("list-item");
  lists.appendChild(task);
  label.appendChild(check);
  label.appendChild(checkmark);
  upperDiv.appendChild(label);
  upperDiv.appendChild(cover);
  cover.textContent = todo_task;
  task.appendChild(upperDiv);
  task.appendChild(editInput);
  task.appendChild(button);
  task.appendChild(icons);
  input.value = "";
};

//button functionality
const add = () => {
  input.addEventListener("input", () => {
    alert.style.display = "none";
  });
  btn.addEventListener("click", () => {
    if (input.value === "") {
      alert.innerHTML = "Add Task";
      alert.style.display = "block";
    } else {
      //convert input value to sentence case
      (function () {
        let stringToConvert = input.value;
        stringToConvert = stringToConvert
          .toLowerCase()
          .replace(/(^|\s)\S/, (L) => L.toUpperCase());
        if (!todos.length) {
          todos.push({ text: stringToConvert, checked: false });
          let task = todos[todos.length - 1];
          localStorage.setItem("Mon", JSON.stringify({ todos: todos }));
          listElement(task.text, false);
        } else {
          let arrayOfText = [];
          todos.forEach((element) => {
            arrayOfText.push(element.text);
          });
          if (!arrayOfText.includes(stringToConvert)) {
            todos.push({ text: stringToConvert, checked: false });
            let task = todos[todos.length - 1];
            listElement(task.text, false);
            if (todos.length > 0) {
              if (localStorage.length <= 0) {
                localStorage.setItem("Mon", JSON.stringify({ todos: todos }));
              } else {
                let addToLocalStorage = todos[todos.length - 1];
                let currentStorageItems = JSON.parse(
                  localStorage.getItem("Mon")
                );
                let arrayOfTodos = currentStorageItems.todos;
                let newTodosArray = arrayOfTodos.concat(addToLocalStorage);
                localStorage.setItem(
                  "Mon",
                  JSON.stringify({ todos: newTodosArray })
                );
              }
            }
          } else {
            alert.innerHTML = "Task already added";
            alert.style.display = "block";
          }
        }
      })();
    }
  });
};

const loadTodosFromLocalStorage = () => {
  if (JSON.parse(localStorage.getItem("Mon"))) {
    let currentStorageItems = JSON.parse(localStorage.getItem("Mon"));
    let arrayOfTodos = currentStorageItems.todos;
    todos = arrayOfTodos;
    if (todos.length) {
      todos.forEach((element) => {
        listElement(
          element.text,
          element.checked,
          element.checked ? "line-through" : "none"
        );
      });
    }
  }
};

//edit todo
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-pen-to-square")) {
    const text = e.target.parentElement.parentElement.childNodes[1];
    let editInput = e.target.parentElement.parentElement.childNodes[1];
    let button = e.target.parentElement.parentElement.childNodes[2];
    editInput.style.display = "block";
    button.style.display = "block";
    editInput.value =
      e.target.parentElement.parentElement.childNodes[0].textContent;
    e.target.parentElement.parentElement.firstChild.lastChild.textContent = "";
    currentEditValue = text.value;
  }
});
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("editBtn")) {
    let editInput = e.target.parentElement.childNodes[1];
    let button = e.target.parentElement.childNodes[2];
    if (editInput.value !== "") {
      let value = editInput.value;
      value = value.toLowerCase().replace(/(^|\s)\S/, (L) => L.toUpperCase());
      e.target.parentElement.childNodes[0].childNodes[1].textContent = value;
      editInput.style.display = "none";
      button.style.display = "none";
      if (currentEditValue !== value) {
        e.target.parentElement.childNodes[0].childNodes[0].childNodes[0].checked = false;
        e.target.parentElement.childNodes[0].childNodes[1].style.textDecoration =
          "none";
        let index = todos.findIndex((item) => item.text === currentEditValue);
        todos.splice(index, 1, { text: value, checked: false });
        localStorage.setItem("Mon", JSON.stringify({ todos: todos }));
      }
    }
  }
});
//remove todo
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    let text = e.target.parentElement.parentElement.innerText;
    let index = todos.findIndex((item) => item.text === text);
    todos.splice(index, 1);
    localStorage.setItem("Mon", JSON.stringify({ todos: todos }));
    e.target.parentElement.parentElement.remove();
  }
});
//completed tasks
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("custom-checkbox")) {
    //checkbox state
    let checkBoxState = e.target.checked;
    console.log(checkBoxState);
    let text = e.target.parentElement.parentElement.childNodes[1];
    let todoText = text.textContent;
    if (checkBoxState === true) {
      text.style.textDecoration = "line-through";
      todos.forEach((element) => {
        if (element.text === todoText) {
          element.checked = true;
          localStorage.setItem("Mon", JSON.stringify({ todos: todos }));
        }
      });
    } else {
      text.style.textDecoration = "none";
      todos.forEach((element) => {
        if (element.text === todoText) {
          element.checked = false;
          localStorage.setItem("Mon", JSON.stringify({ todos: todos }));
        }
      });
    }
  }
});
//Date functionality
const newDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let dayId = today.getDay();
  switch (dayId) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  today = `${dd}/${mm}/${yyyy}-${day.slice(0, 3)}`;
  date.innerHTML = today;
};
newDate();
add();
/// Change functionality of Enter Key
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    document.querySelector(".btn").click();
  }
});
/// prevent the form default command/refresh
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let numberOfEggs=30||0;