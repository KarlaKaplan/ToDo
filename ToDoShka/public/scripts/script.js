function completeTask(button) {
    const task = button.closest('.task');
    const completedList = document.getElementById('completed-list');
    completedList.appendChild(task);
}

function deleteTask(button) {
    const task = button.closest('.task');
    const deletedList = document.getElementById('deleted-list');
    deletedList.appendChild(task);
}

function removeTaskPermanently(button) {
    const task = button.closest('.task');
    if (task) {
        task.remove();
    }
}

document.getElementById('deleted-list').addEventListener('click', function(event) {
    const targetButton = event.target.closest('.task-actions button.delete');
    if (targetButton) {
        removeTaskPermanently(targetButton);
    }
});

function activateTask(button) {
    const task = button.closest('.task');
    const activeList = document.getElementById('active-list');
    activeList.appendChild(task);
}

function showTab(tabName) {
    const tabs = ['active', 'completed', 'deleted'];

    tabs.forEach(tab => {
        const tabList = document.getElementById(`${tab}-list`);
        const header = document.getElementById('header');

        if (tab === tabName) {
            tabList.style.display = 'block';
            header.style.backgroundColor = getTabColor(tab);
        } else {
            tabList.style.display = 'none';
        }
    });

    if (tabs === 'deleted') {
        const deleteButtons = document.querySelectorAll('.task-actions button.delete');
        deleteButtons.forEach(button => {
            button.onclick = function() {
                removeTaskPermanently(this);
            };
        });
    }
}

function getTabColor(tab) {
    switch (tab) {
        case 'active':
            return 'yellow';
        case 'completed':
            return 'green';
        case 'deleted':
            return 'red';
        default:
            return '#ddd';
    }
}

function openAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup');
    addTaskPopup.style.display = 'flex';
}

function closeAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup');
    addTaskPopup.style.display = 'none';
}

function addTaskFromPopup() {
    const newTaskInput = document.getElementById('new-task-popup');
    const taskDescriptionInput = document.getElementById('task-description-popup');
    const taskDueDateInput = document.getElementById('task-due-date-popup');
    const activeList = document.getElementById('active-list');

    if (newTaskInput.value.trim() !== '') {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.innerHTML = `
            <div class="task-name">
                <span><strong>${newTaskInput.value}</strong></span>
            </div>
            <div class="task-desc">
                <span>${taskDescriptionInput.value}</span>
            </div>
            <div class="task-time">
                <span>${taskDueDateInput.value}</span>
            </div>
            <div class="task-actions">
                <button class="complete" onclick="completeTask(this)">
                    <img src="images/Checkmark.png" alt="В завершенные">
                </button>
                <button class="delete" onclick="deleteTask(this)">
                    <img src="images/Trash.png" alt="В удаленные">
                </button>
                <button class="active" onclick="activateTask(this)">
                <img src="images/Clock.png" alt="В активные">
            </button>
            </div>
        `;
        activeList.appendChild(newTask);

        newTaskInput.value = '';
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';

        closeAddTaskPopup();
    }
}

function sortByName() {
    const tasks = Array.from(document.querySelectorAll('.task'));
    tasks.sort((a, b) => {
        const aName = a.querySelector('.task-name').innerText;
        const bName = b.querySelector('.task-name').innerText;
        return aName.localeCompare(bName);
    });

    const activeList = document.getElementById('active-list');
    activeList.innerHTML = '';
    tasks.forEach(task => {
        activeList.appendChild(task);
    });
}

document.getElementById('sort-by-name').addEventListener('click', sortByName);

function sortByDueDate() {
    const tasks = Array.from(document.querySelectorAll('.task'));
    tasks.sort((a, b) => {
        const aDate = new Date(a.querySelector('.task-time').innerText);
        const bDate = new Date(b.querySelector('.task-time').innerText);
        return aDate - bDate;
    });

    const activeList = document.getElementById('active-list');
    activeList.innerHTML = '';
    tasks.forEach(task => {
        activeList.appendChild(task);
    });
}

document.getElementById('sort-by-due-date').addEventListener('click', sortByDueDate);

function searchByName() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();
    const tasks = Array.from(document.querySelectorAll('.task'));

    tasks.forEach(task => {
        const taskName = task.querySelector('.task-name').innerText.toLowerCase();
        if (taskName.includes(searchText)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

document.getElementById('search-button').addEventListener('click', searchByName);


showTab('active');