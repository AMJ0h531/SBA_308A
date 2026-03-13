import { fetchTasks } from "./api.js";
import { displayTasks } from "./ui.js";

let currentPage = 1;

let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskContainer = document.getElementById("taskContainer");

async function loadTasks(searchTerm=""){

const apiTasks = await fetchTasks(currentPage);

const allTasks = [...localTasks, ...apiTasks];

const filtered = allTasks.filter(task =>
task.title.toLowerCase().includes(searchTerm.toLowerCase())
);

displayTasks(filtered, taskContainer);

}

// Add Task
document.getElementById("addTaskBtn").addEventListener("click", () => {

const title = document.getElementById("newTaskTitle").value;

if(!title){
alert("Enter a task");
return;
}

const newTask = {
id: Date.now(),
title:title,
completed:false
};

localTasks.unshift(newTask);

localStorage.setItem("tasks", JSON.stringify(localTasks));

document.getElementById("newTaskTitle").value="";

loadTasks();

});

// Task buttons
taskContainer.addEventListener("click",(e)=>{

const id = Number(e.target.dataset.id);

if(e.target.classList.contains("completeBtn")){

localTasks = localTasks.map(task =>
task.id===id ? {...task,completed:!task.completed} : task
);

}

if(e.target.classList.contains("deleteBtn")){

localTasks = localTasks.filter(task => task.id!==id);

}

localStorage.setItem("tasks",JSON.stringify(localTasks));

loadTasks();

});

// Search
document.getElementById("searchBtn").addEventListener("click",()=>{

const searchValue=document.getElementById("searchInput").value;

loadTasks(searchValue);

});

// Pagination
document.getElementById("nextPage").addEventListener("click",()=>{

currentPage++;

loadTasks();

});

document.getElementById("prevPage").addEventListener("click",()=>{

if(currentPage>1){
currentPage--;
loadTasks();
}

});

// Dark Mode
document.getElementById("darkModeToggle").addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

loadTasks();