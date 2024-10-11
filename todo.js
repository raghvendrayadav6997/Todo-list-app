let tasks = [];


// Load tasks from local storage when the page loads
const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    updateTasksList();
    updatestats();
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
// Add a new task to the list
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
   
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTasksList();
        updatestats();
        saveTasks();
    }
};

const toggleTaskcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatestats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updatestats();
    saveTasks();
};
 
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text;

    tasks.splice(index,1)
    updateTasksList();
    updatestats();
    saveTasks();
};

const updatestats=() =>{
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks== 0 ? 0 : (completedTasks / totalTasks)*100;
    const progressBar=document.getElementById('progress');
    progressBar.style.width=`${progress}%`;

    
    document.getElementById("number").innerText=`${completedTasks} / ${totalTasks}`;
    if(tasks.length && completedTasks == totalTasks){
        blast();
    }
};


const updateTasksList = () => {
    const tasklist = document.getElementById('tasklist')
    tasklist.innerHTML = ''; // Clear the existing tasks

    tasks.forEach((task, index) => {
        // Create a new list item
        const listItem = document.createElement("li");

        // Set the inner HTML of the list item with task data
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                    <p>${task.text}</p>
                </div>
                <div class="icon">
                    <img src="./img/edit.png" alt="Edit"  class="edit-btn" data-index="${index}"/>
                    <img src="./img/bin.png" alt="Delete" class="delete-btn  data-index="${index}"/>
                </div>
            </div>
        `;
        listItem.addEventListener('change', () => toggleTaskcomplete(index))
        // Append the new list item to the tasklist
        tasklist.appendChild(listItem);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editTask(index);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteTask(index);
        });
    });

};




document.getElementById('newtask').addEventListener("click", function (e) {
    e.preventDefault();

    addTask();
});

const blast=()=>{
    const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };
    
    function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
    }
    
    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });
    
    fire(0.2, {
    spread: 60,
    });
    
    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });
    
    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });
    
    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });

}

loadTasks();





