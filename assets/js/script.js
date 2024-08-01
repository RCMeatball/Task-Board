// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = JSON.parse(localStorage.getItem("nextId"))
    if (id != null) {
        id +=1;
        localStorage.setItem("nextId", JSON.stringify(id));
    } else {
        id = 1;
        localStorage.setItem("nextId", JSON.stringify(id));
    }
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    var taskCard =
    `<section id="${task.id}" class="draggable" style ="border-style: solid; border-color: black;">
    <h2>Title: ${task.title}</h2>
    <p>Description: ${task.description}</p>
    <h6>Due Date: ${task.Date}</h6>
    <button onclick="handleDeleteTask(event)" style ="background-color: black; color: red;">Delete</button>
    </section>`;
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks != null) {
        for (let i = 0; i< tasks.length; i++) {
            
        }
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


