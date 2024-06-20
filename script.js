document.addEventListener('DOMContentLoaded', () => {
    const randomTaskDiv = document.getElementById('random-task');
    const addRandomTaskBtn = document.getElementById('add-random-task-btn');
    const newRandomTaskBtn = document.getElementById('new-random-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const addNewTaskBtn = document.getElementById('add-new-task-btn');
    const taskList = document.getElementById('task-list');

    let randomTodo = null;

    // دریافت و نمایش تسک تصادفی
    const fetchRandomTask = () => {
        fetch('https://dummyjson.com/todos/random')
            .then(res => res.json())
            .then(data => {
                randomTodo = data;
                randomTaskDiv.innerHTML = '';
                
                // فقط تسک‌های غیرکامپلیت را نمایش دهید
                if (!randomTodo.completed) {
                    const taskItem = document.createElement('div');
                    taskItem.textContent = randomTodo.todo;
                    randomTaskDiv.appendChild(taskItem);
                }
            })
            .catch(error => {
                randomTaskDiv.innerHTML = ' loading failed!!';
                console.error('Error fetching random task:', error);
            });
    };

    fetchRandomTask(); // دریافت اولیه تسک تصادفی

    // اضافه کردن تسک تصادفی به لیست
    const addRandomTaskToList = () => {
        if (randomTodo && !randomTodo.completed) { // اضافه کردن تنها تسک‌های غیرکامپلیت
            const listItem = document.createElement('li');
            listItem.textContent = randomTodo.todo;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                listItem.remove(); // حذف آیتم از لیست
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        }
    };

    addRandomTaskBtn.addEventListener('click', () => {
        addRandomTaskToList();
    });

    // اضافه کردن تسک جدید تصادفی
    newRandomTaskBtn.addEventListener('click', () => {
        fetchRandomTask();
    });

    // اضافه کردن تسک جدید به لیست
    addNewTaskBtn.addEventListener('click', () => {
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            const listItem = document.createElement('li');
            listItem.textContent = newTask;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                listItem.remove(); // حذف آیتم از لیست
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            newTaskInput.value = '';
        }
    });
});
