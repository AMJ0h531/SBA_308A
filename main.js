import { fetchTasks } from "./api.js";
import { displayTasks } from "./ui.js";

let currentPage = 1;
let currentLanguage = "en";

let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskContainer = document.getElementById("taskContainer");
const searchInput = document.getElementById("searchInput");

/* 🌍 TRANSLATION */
async function translateText(text) {
  if (currentLanguage === "en") return text;

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: currentLanguage,
        format: "text"
      })
    });

    const data = await response.json();
    return data.translatedText;

  } catch (error) {
    console.log("Translation failed");
    return text;
  }
}

/* 📦 LOAD TASKS */
async function loadTasks(searchTerm = "") {

  const apiTasksRaw = await fetchTasks(currentPage);

  const apiTasks = apiTasksRaw.map(task => ({
    ...task,
    title: `Sample Task ${task.id}`
  }));

  const allTasks = [...localTasks, ...apiTasks];

  const filtered = allTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // translate titles
  for (const task of filtered) {
    task.title = await translateText(task.title);
  }

  displayTasks(filtered, taskContainer);
}

/* ➕ ADD TASK */
document.getElementById("addTaskBtn").addEventListener("click", () => {

  const title = document.getElementById("newTaskTitle").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (!title) {
    alert("Enter a task");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    dueDate,
    priority
  };

  localTasks.unshift(newTask);

  localStorage.setItem("tasks", JSON.stringify(localTasks));

  document.getElementById("newTaskTitle").value = "";

  loadTasks();
});

/* ✅ COMPLETE / DELETE */
taskContainer.addEventListener("click", (e) => {

  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains("completeBtn")) {
    localTasks = localTasks.map(task => {
      if (task.id === id) {
        if (!task.completed) {
          confetti({
            particleCount: 100,
            spread: 70
          });
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  }

  if (e.target.classList.contains("deleteBtn")) {
    localTasks = localTasks.filter(task => task.id !== id);
  }

  localStorage.setItem("tasks", JSON.stringify(localTasks));
  loadTasks();
});

/* 🔍 SEARCH */
document.getElementById("searchBtn").addEventListener("click", () => {
  loadTasks(searchInput.value);
});

/* 📄 PAGINATION */
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  loadTasks(searchInput.value);
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadTasks(searchInput.value);
  }
});

/* 🌙 DARK MODE */
const toggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );
});

/* 🌍 LANGUAGE SELECT */
const languageSelect = document.getElementById("languageSelect");

languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  loadTasks(searchInput.value);
});

/* 🚀 INITIAL LOAD */
loadTasks();





// import { fetchTasks } from "./api.js";
// import { displayTasks } from "./ui.js";

// let currentPage = 1;

// let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// const taskContainer = document.getElementById("taskContainer");

// const searchInput = document.getElementById("searchInput");


// /* LANGUAGE SETTINGS */

// let currentLanguage = "en";

// async function translateText(text){

// if(currentLanguage === "en") return text;

// try{

// const response = await fetch("https://libretranslate.de/translate",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// q:text,
// source:"auto",
// target:currentLanguage,
// format:"text"
// })
// });

// const data = await response.json();

// return data.translatedText;

// }catch(error){

// console.log("Translation failed");

// return text;

// }

// }

// async function loadTasks(searchTerm=""){

// const apiTasks = (await fetchTasks(currentPage)).map(task => ({
// ...task,
// title: `Sample Task ${task.id}`
// }));

// const allTasks = [...localTasks, ...apiTasks];

// const filtered = allTasks.filter(task =>
// task.title.toLowerCase().includes(searchTerm.toLowerCase())
// );

// // translate titles
// for(const task of filtered){
// task.title = await translateText(task.title);
// }

// displayTasks(filtered, taskContainer);

// }

// document.getElementById("addTaskBtn").addEventListener("click", () => {

// const title = document.getElementById("newTaskTitle").value.trim();
// const dueDate = document.getElementById("dueDate").value;
// const priority = document.getElementById("priority").value;

// if(!title){
// alert("Enter a task");
// return;
// }

// const newTask = {
// id: Date.now(),
// title,
// completed:false,
// dueDate,
// priority
// };

// localTasks.unshift(newTask);

// localStorage.setItem("tasks", JSON.stringify(localTasks));

// document.getElementById("newTaskTitle").value="";

// loadTasks();

// });

// taskContainer.addEventListener("click",(e)=>{

// const id = Number(e.target.dataset.id);

// if(!id) return;

// if(e.target.classList.contains("completeBtn")){

// localTasks = localTasks.map(task => {

// if(task.id === id){

// if(!task.completed){
// confetti({
// particleCount:100,
// spread:70
// });
// }

// return {...task, completed:!task.completed};

// }

// return task;

// });

// }

// if(e.target.classList.contains("deleteBtn")){

// localTasks = localTasks.filter(task => task.id !== id);

// }

// localStorage.setItem("tasks", JSON.stringify(localTasks));

// loadTasks();

// });

// document.getElementById("searchBtn").addEventListener("click",()=>{
// loadTasks(searchInput.value);
// });

// document.getElementById("nextPage").addEventListener("click",()=>{
// currentPage++;
// loadTasks(searchInput.value);
// });

// document.getElementById("prevPage").addEventListener("click",()=>{

// if(currentPage>1){
// currentPage--;
// loadTasks(searchInput.value);
// }

// });

// const toggle = document.getElementById("darkModeToggle");

// if(localStorage.getItem("darkMode")==="true"){
// document.body.classList.add("dark");
// }

// toggle.addEventListener("click",()=>{

// document.body.classList.toggle("dark");

// localStorage.setItem(
// "darkMode",
// document.body.classList.contains("dark")
// );

// const filtered = allTasks.filter(task =>
// task.title.toLowerCase().includes(searchTerm.toLowerCase())
// );

// // translate titles
// for(const task of filtered){
// task.title = await translateText(task.title);
// }

// const languageSelect = document.getElementById("languageSelect");

// languageSelect.addEventListener("change", ()=>{

// currentLanguage = languageSelect.value;

// const filtered = allTasks.filter(task =>
// task.title.toLowerCase().includes(searchTerm.toLowerCase())
// );

// // translate titles
// for(const task of filtered){
// task.title = await translateText(task.title);
// }

// loadTasks();

// const languageSelect = document.getElementById("languageSelect");

// languageSelect.addEventListener("change", ()=>{

// currentLanguage = languageSelect.value;

// loadTasks();

// });

// });