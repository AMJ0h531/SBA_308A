export function displayTasks(tasks, container){

container.innerHTML = "";

let completedCount = 0;

tasks.forEach(task => {

if(task.completed) completedCount++;

const div = document.createElement("div");

div.classList.add("task");
div.classList.add(task.priority || "low");

div.dataset.id = task.id;

if(task.completed){
div.classList.add("completed");
}

div.innerHTML = `
<p>
${task.title}
<br>
<small>Due: ${task.dueDate || "No date"}</small>
</p>

<div>
<button class="completeBtn" data-id="${task.id}">
${task.completed ? "Undo" : "Complete"}
</button>

<button class="deleteBtn" data-id="${task.id}">
Delete
</button>
</div>
`;

container.appendChild(div);

});

updateProgress(tasks.length, completedCount);

renderCalendar(tasks);
}



function updateProgress(total, completed){

const counter = document.getElementById("taskCounter");
const progressFill = document.getElementById("progressFill");

counter.textContent = `${completed}/${total} tasks completed`;

const percent = total === 0 ? 0 : (completed/total)*100;

progressFill.style.width = percent + "%";

}



function renderCalendar(tasks){

const cal = document.getElementById("calendar");

cal.innerHTML = "";

tasks.forEach(task => {

if(task.dueDate){

const item = document.createElement("div");

item.textContent = `${task.dueDate} - ${task.title}`;

cal.appendChild(item);

}

});

}