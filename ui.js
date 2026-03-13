export function displayTasks(tasks, container){

container.innerHTML="";

let completedCount = 0;

tasks.forEach(task => {

if(task.completed) completedCount++;

const div = document.createElement("div");

div.classList.add("task");

if(task.completed){
div.classList.add("completed");
}

div.innerHTML = `

<p>${task.title}</p>

<div class="taskButtons">

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

}

function updateProgress(total, completed){

const counter = document.getElementById("taskCounter");

const progressFill = document.getElementById("progressFill");

counter.textContent = `${completed}/${total} tasks completed`;

const percent = total === 0 ? 0 : (completed/total)*100;

progressFill.style.width = percent + "%";

}


