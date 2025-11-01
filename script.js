const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';

        renderTaskList();
        saveTasks();
    }
});

function toggleComplete(idToToggle) {
    tasks = tasks.map(task => {
        if (task.id === idToToggle) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    renderTaskList();
    saveTasks();
}

function deleteTask(idToDelete) {
    tasks = tasks.filter(task => task.id !== idToDelete);

    renderTaskList();
    saveTasks();
}

function renderTaskList() {

    taskList.innerHTML = '';

    for (const task of tasks) {

        const li = document.createElement('li');

        if (task.completed === true) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', () => {
            toggleComplete(task.id);
        });

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        li.append(checkbox);
        li.append(taskTextSpan);
        li.append(deleteButton);

        taskList.append(li);
    }
}

function saveTasks() {

    const tasksString = JSON.stringify(tasks);

    localStorage.setItem('myTasks', tasksString);
}


function loadTasks() {

    const tasksString = localStorage.getItem('myTasks');

    if (tasksString !== null) {
        tasks = JSON.parse(tasksString);
    }

}


loadTasks();

renderTaskList();

