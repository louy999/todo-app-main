// theme page
var body = document.querySelector("body");
var container = document.querySelector("#container");
var btnChangeTheme = document.querySelector(".theme");
var todoUlAll = document.querySelector("#todo #all-ul");
var todoUlCompleted = document.querySelector("#todo #comp-ul");
var todoUlActive = document.querySelector("#todo #active-ul");
// todoUlAll.hidden = true;
todoUlCompleted.hidden = true;
todoUlActive.hidden = true;
btnChangeTheme.addEventListener("click", function () {
    if (body.className === "dark") {
        body.className = "light";
        container.className = "container light";
        btnChangeTheme.src = "../images/icon-moon.svg";
    }
    else {
        body.className = "dark";
        container.className = "container dark";
        btnChangeTheme.src = "../images/icon-sun.svg";
    }
});
//create todo in list and not make input empty when click create
var btnCreateTodo = document.querySelector("#type span");
var inputForWriteTodo = document.querySelector("#type input");
var listTodo = document.querySelector("#todo ul");
btnCreateTodo.addEventListener("click", function () {
    if (inputForWriteTodo.value !== "") {
        listTodo.innerHTML += "  \n    <li draggable=\"true\" class=\"list-group-item drag \">\n              <span\n                class=\"input-group-text rounded-circle\"\n                id=\"addon-wrapping\"\n              ></span\n              >".concat(inputForWriteTodo.value, "\n              <img class='cross' onclick='deleteTask(").concat(i, ") ' src='../images/icon-cross.svg'/>\n            </li>");
        getDataFromList();
        forCountTodo();
        CompleteCheck();
        inputForWriteTodo.value = "";
    }
    else {
        inputForWriteTodo.placeholder = "Please write thing...";
        inputForWriteTodo.focus();
        setTimeout(function () {
            inputForWriteTodo.placeholder = "Create a new todo...";
        }, 5000);
    }
});
var item = document.querySelector(".item");
function forCountTodo() {
    var count = listTodo.children.length;
    item.innerHTML = "".concat(count, " items left");
}
var data;
var i;
var storage = JSON.parse(localStorage.todo);
if (localStorage.todo !== null) {
    for (i = 0; i < storage.length; i++) {
        listTodo.innerHTML += "    <li  draggable=\"true\"  class=\"list-group-item \">\n                <span\n                  class=\"input-group-text  rounded-circle\"\n                  id=\"addon-wrapping\"\n                ></span\n                >".concat(storage[i].todo, "\n                <img class='cross' onclick='deleteTask(").concat(i, ") ' src='../images/icon-cross.svg'/>\n              </li>");
    }
    forCountTodo();
    CompleteCheck();
    data = storage;
}
else {
    data = [];
}
//save in Local storage
function getDataFromList() {
    var newData = {
        todo: inputForWriteTodo.value
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
var activitySpan = document.querySelectorAll(".activity span");
function stat() {
    activitySpan.forEach(function (e) {
        e.addEventListener("click", function () {
            activitySpan.forEach(function (i) {
                i.classList.remove("active");
            });
            e.className = "active";
        });
    });
}
stat();
var lis = document.querySelectorAll("#todo ul li");
var ul = document.querySelector("#todo ul");
lis.forEach(function (li) {
    li.addEventListener("dragstart", function (e) {
        e.target.classList.add("draggable");
    });
    li.addEventListener("dragend", function (e) {
        e.target.classList.remove("draggable");
    });
});
ul.addEventListener("dragover", function (e) {
    e.preventDefault();
    console.log("over");
    var dra = document.querySelector("#todo ul li");
    ul.append(dra);
});
function CompleteCheck() {
    var _a;
    (_a = document.querySelectorAll("#todo li span")) === null || _a === void 0 ? void 0 : _a.forEach(function (check) {
        check.addEventListener("click", function () {
            if (check.classList[2] !== "check") {
                check.classList.add("check");
                check.innerHTML = "<img src=\"../images/icon-check.svg\" />";
                check.parentElement.style.opacity = "0.5";
            }
            else {
                check.classList.remove("check");
                check.innerHTML = "";
                check.parentElement.style.opacity = "1";
            }
        });
    });
}
var ulCom = document.querySelector(".activity span#completed");
ulCom.addEventListener("click", filterCompleted);
function filterCompleted() {
    var com = document.querySelectorAll(".check");
    todoUlAll.hidden = true;
    todoUlCompleted.hidden = false;
    com.forEach(function (c) {
        var createLi = document.createElement("li");
        var createDraggable = document.createAttribute("draggable");
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
var ulAll = document.querySelector(".activity span#completed");
ulAll.addEventListener("click", function () {
    console.log("done");
    todoUlAll.hidden = false;
    todoUlCompleted.hidden = true;
    // console.log("fod");
});
