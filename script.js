document.addEventListener('DOMContentLoaded', () => {
    const randomTaskDiv = document.getElementById('random-task');
    const addRandomTaskBtn = document.getElementById('add-random-task-btn');
    const newRandomTaskBtn = document.getElementById('new-random-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const addNewTaskBtn = document.getElementById('add-new-task-btn');
    const taskList = document.getElementById('task-list');

    let randomTodo = null;

    // Function to show loading message
    const showLoading = () => {
        randomTaskDiv.innerHTML = 'Loading...';
    };

    // Function to hide loading message
    const hideLoading = () => {
        randomTaskDiv.innerHTML = '';
    };

    // Fetch and display random task
    const fetchRandomTask = async () => {
        showLoading();
        try {
            const res = await fetch('https://dummyjson.com/todos/random');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            randomTodo = data;

            // Debugging log
            console.log('Fetched random task:', randomTodo);

            hideLoading();

            // Display only non-completed tasks
            if (!randomTodo.completed) {
                randomTaskDiv.innerHTML = randomTodo.todo;
            } else {
                randomTaskDiv.innerHTML = 'No uncompleted tasks found';
            }
        } catch (error) {
            randomTaskDiv.innerHTML = 'Error fetching !!';
            console.error('Error fetching random task:', error);
        }
    };

    fetchRandomTask(); // Initial fetch of random task

    // Add random task to the list
    const addRandomTaskToList = () => {
        if (randomTodo && !randomTodo.completed) { // Add only non-completed tasks
            const listItem = document.createElement('li');
            listItem.textContent = randomTodo.todo;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                listItem.remove(); // Remove item from list
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        }
    };

    addRandomTaskBtn.addEventListener('click', addRandomTaskToList);

    // Fetch new random task
    newRandomTaskBtn.addEventListener('click', fetchRandomTask);

    // Add new task to the list
    addNewTaskBtn.addEventListener('click', () => {
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            const listItem = document.createElement('li');
            listItem.textContent = newTask;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                listItem.remove(); // Remove item from list
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            newTaskInput.value = '';
        }
    });
});
