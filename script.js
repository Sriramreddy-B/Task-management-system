let tasks = [];
let completedTasks = [];
let darkMode = false;

document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

function saveName() {
    const name = document.getElementById('username').value;
    document.getElementById('greeting').innerText = `Hello, ${name}`;
}

function addTask() {
    const task = document.getElementById('new-task').value;
    if (task) {
        tasks.push(task);
        document.getElementById('new-task').value = '';
        updateTaskList();
    }
}

function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML = `
            <span>${task}</span>
            <div class="task-buttons">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleTask(${index})">Complete</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    updateProgressBar();
}

function toggleTask(index) {
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    updateTaskList();
}

function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index]);
    if (newTask) {
        tasks[index] = newTask;
        updateTaskList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function showPending() {
    updateTaskList();
}

function showCompleted() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = task;
        li.classList.add('completed');
        taskList.appendChild(li);
    });
}

function updateProgressBar() {
    const progress = document.getElementById('progress');
    const total = tasks.length + completedTasks.length;
    const percent = total > 0 ? (completedTasks.length / total) * 100 : 0;
    progress.style.width = `${percent}%`;
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
}
