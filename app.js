// define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector('#task');


//load all event listeners
loadEventListeners();

//loading all Events Listeners Function
function loadEventListeners() {
    //DOM Load Event
    form.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear Task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}

// //Get Tasks from LS
// function getTasks() {
//     let tasks;
//     if (localStorage.getItem('tasks') === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }

//     tasks.forEach(function(task) {
//         // Create li Element 
//         const li = document.createElement('li');
//         //Add class
//         li.className = "collection-item";
//         //Create a text node ad append to li
//         li.appendChild(document.createTextNode(task));
//         //Create a Link Element
//         const link = document.createElement('a');
//         //Add class
//         link.className = "delete-item secondary-content";
//         //Add icon html
//         link.innerHTML = '<i class="fa fa-remove"></i>';
//         //Append the link to li
//         li.appendChild(link);
//         //Append li to ul
//         taskList.appendChild(li);
//     });

// }

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
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
    if (taskInput.value === '') {
        alert("Add a Task");
    }

    // Create li Element 
    const li = document.createElement('li');
    //Add class
    li.className = "collection-item";
    //Create a text node ad append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create a Link Element
    const link = document.createElement('a');
    //Add class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear tasks
    taskInput.value = "";


    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are You Sure? Do you really want to delete task?")) {
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }


}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            task.splice(index);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    //  taskList.innerHTML = " ";
    //if (confirm("You will be deleting all the tasks. Are you sure?")) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //}
    //or use a faster more optimised way to clear tasks
    //Clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (
            function (task) {
                const item = task.firstChild.textContent;
                if (item.toLowerCase().indexOf(text) != -1) {
                    task.style.display = "block";
                }
                else {
                    task.style.display = "none";
                }
            }
        );
}