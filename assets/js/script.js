// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = JSON.parse(localStorage.getItem("nextId"))
    if (id != null) {
        id += 1;
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
    <h2>Title: ${task.Title}</h2>
    <p>Description: ${task.Description}</p>
    <h6>Due Date: ${task.Date}</h6>
    <button onclick="handleDeleteTask(event)" style ="background-color: black; color: red;">Delete</button>
    </section>`;
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    if (taskList != null) {
        for (let i = 0; i < taskList.length; i++) {
            $('.row').find(`${taskList[i].id}`).remove();
        };

        for (let i = 0; i < taskList.length; i++) {
            var taskCard = createTaskCard(taskList[i]);
            var taskLane = taskList[i].status;
            $(`#${taskLane}`).append(taskCard);
            $(`#${taskLane}`).sortable({ containment: "document" });
            $(`#${taskLane}`).find('section').draggable({ revert: "invalid", containment: "document", stack: ".draggable", connectToSortable: `#${taskLane}` });
        };
    } else {
        return;
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const date = $('#Date').val()
    const newTask = {
        id: generateTaskId(),
        title: $('#Title').val(),
        description: $('#Description').val(),
        date: dayjs(date).format("MM/DD/YYYY"),
        status: 'To-Do'

    };

    if (taskList != null) {
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
        taskList = [];
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));

    }
    return newTask;


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    var target = $(event.target);
    var taskId = target[0].offsetParent.attributes.id.nodeValue;
    $(`#${taskId}`).remove();
    taskList = taskList.filter((pass) => pass.taskId != taskId);
    if (taskList.length != 0) {
        for (let i = taskId - 1; i < taskList.length; i++) {
            taskList[i].id = taskList[i].id - 1;
        }
        nextId = nextId - 1;
        localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('nextId', JSON.stringify(nextId));
    } else {
        localStorage.removeItem('tasks');
        localStorage.removeItem('nextId');
    }
    location.reload();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || []; // Handle empty or invalid data
    let card = $(ui.draggable);
    let lane = $(event.target).attr('id');
    let id = card.attr('id');
    
    let taskIndex = taskList.findIndex(task => task.id === Number(id));
    if (taskIndex !== -1) {
        let status = taskList[taskIndex].Status;
        $(`#${status}`).find(`#${id}`).remove(); 
        taskList[taskIndex].Status = lane;
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTaskList();
    } else {
        console.error("Task not found in taskList.");
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $.fn.bootstrapBtn = $.fn.button.noConflict();
    
    renderTaskList();

    $('#to-do').droppable({
        accept: `.draggable`,
        drop: handleDrop
    });

    $('#in-progress').droppable({
        accept: `.draggable`,
        drop: handleDrop
    });

    $('#done').droppable({
        accept: `.draggable`,
        drop: handleDrop
    });
        
    $(".btn").on('click', function () {
        $('#taskDate').datepicker(); // Initialize datepicker
        $("#modal1").dialog({ height: 300, resizable: true }); // Configure dialog
    
        
        $("#form").on('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            var newTaskData = {
                Title: $("#Title").val(),
                Description: $("#Description").val(),
                Date: $("#Date").val()
            };
            createTaskCard(newTaskData);
            $("#modal1").dialog('close');
            renderTaskList();
        });
    });
    });



