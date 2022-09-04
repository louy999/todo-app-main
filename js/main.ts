// theme page
let body = document.querySelector("body") as HTMLBodyElement;
let container = document.querySelector("#container") as HTMLDivElement;
let btnChangeTheme = document.querySelector(".theme") as HTMLImageElement;
let todoUlAll = document.querySelector("#todo #all-ul") as HTMLUListElement;
let todoUlCompleted = document.querySelector(list
  "#todo #comp-ul"
) as HTMLUListElement;
let todoUlActive = document.querySelector(
  "#todo #active-ul"
) as HTMLUListElement;
// todoUlAll.hidden = true;
todoUlCompleted.hidden = true;
todoUlActive.hidden = true;
btnChangeTheme.addEventListener("click", () => {
  if (body.className === "dark") {
    body.className = "light";
    container.className = "container light";
    btnChangeTheme.src = "../images/icon-moon.svg";
  } else {
    body.className = "dark";
    container.className = "container dark";
    btnChangeTheme.src = "../images/icon-sun.svg";
  }
});

//create todo in list and not make input empty when click create
let btnCreateTodo = document.querySelector("#type span") as HTMLSpanElement;
let inputForWriteTodo = document.querySelector(
  "#type input"
) as HTMLInputElement;
let listTodo = document.querySelector("#todo ul") as HTMLUListElement;

btnCreateTodo.addEventListener("click", () => {
  if (inputForWriteTodo.value !== "") {
    listTodo.innerHTML += `  
    <li draggable="true" class="list-group-item drag ">
              <span
                class="input-group-text rounded-circle"
                id="addon-wrapping"
              ></span
              >${inputForWriteTodo.value}
              <img class='cross' onclick='deleteTask(${i}) ' src='../images/icon-cross.svg'/>
            </li>`;
    getDataFromList();
    forCountTodo();
    CompleteCheck();

    inputForWriteTodo.value = "";
  } else {
    inputForWriteTodo.placeholder = "Please write thing...";
    inputForWriteTodo.focus();
    setTimeout(() => {
      inputForWriteTodo.placeholder = "Create a new todo...";
    }, 5000);
  }
});

let item = document.querySelector(".item") as HTMLSpanElement;
function forCountTodo() {
  let count = listTodo.children.length;
  item.innerHTML = `${count} items left`;
}
let data: any[];
let i: any;
let storage = JSON.parse(localStorage.todo);
if (localStorage.todo !== null) {
  for (i = 0; i < storage.length; i++) {
    listTodo.innerHTML += `    <li  draggable="true"  class="list-group-item ">
                <span
                  class="input-group-text  rounded-circle"
                  id="addon-wrapping"
                ></span
                >${storage[i].todo}
                <img class='cross' onclick='deleteTask(${i}) ' src='../images/icon-cross.svg'/>
              </li>`;
  }
  forCountTodo();
  CompleteCheck();

  data = storage;
} else {
  data = [];
}

//save in Local storage
function getDataFromList() {
  let newData = {
    todo: inputForWriteTodo.value,
  };
  data.push(newData);

  localStorage.setItem("todo", JSON.stringify(data));
}

//delete task from todo list
function deleteTask(i) {
  listTodo.children[i].remove();
  data.splice(i, 1);
  localStorage.todo = JSON.stringify(data);
  forCountTodo();
}

//active status bar
let activitySpan = document.querySelectorAll(".activity span");
function stat() {
  activitySpan.forEach((e) => {
    e.addEventListener("click", () => {
      activitySpan.forEach((i) => {
        i.classList.remove("active");
      });
      e.className = "active";
    });
  });
}
stat();

let lis = document.querySelectorAll("#todo ul li");
let ul = document.querySelector("#todo ul") as HTMLUListElement;
lis.forEach((li) => {
  li.addEventListener("dragstart", (e: any) => {
    e.target.classList.add("draggable");
  });
  li.addEventListener("dragend", (e: any) => {
    e.target.classList.remove("draggable");
  });
});
ul.addEventListener("dragover", (e: any) => {
  e.preventDefault();
  console.log("over");
  const dra = document.querySelector("#todo ul li") as HTMLOListElement;
  ul.append(dra);
});

function CompleteCheck() {
  document.querySelectorAll("#todo li span")?.forEach((check: any) => {
    check.addEventListener("click", () => {
      if (check.classList[2] !== "check") {
        check.classList.add("check");
        check.innerHTML = `<img src="../images/icon-check.svg" />`;
        check.parentElement.style.opacity = "0.5";
      } else {
        check.classList.remove("check");
        check.innerHTML = ``;
        check.parentElement.style.opacity = "1";
      }
    });
  });
}
let ulCom = document.querySelector(
  ".activity span#completed"
) as HTMLSpanElement;
ulCom.addEventListener("click", filterCompleted);
function filterCompleted() {
  let com = document.querySelectorAll(".check");
  todoUlAll.hidden = true;
  todoUlCompleted.hidden = false;
  com.forEach((c: any) => {
    let createLi = document.createElement("li");
    let createDraggable = document.createAttribute("draggable");
    createDraggable.value = "true";
    createLi.setAttributeNode(createDraggable);
    createLi.className = "list-group-item ";
    createLi.innerHTML += c.parentElement.innerHTML;
    createLi.style.opacity = ".5";
    todoUlCompleted.appendChild(createLi);
    // CompleteCheck();
    console.log("done");
  });
}
let ulAll = document.querySelector(
  ".activity span#completed"
) as HTMLSpanElement;

ulAll.addEventListener("click", () => {
  console.log("done");
  todoUlAll.hidden = false;
  todoUlCompleted.hidden = true;
  // console.log("fod");
});
