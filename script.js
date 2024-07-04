const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(task) {
  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

function renderTasks(category) {
  const tasksHTML = taskList.filter((task) => {
    if (category === 'all' || task.category === category) {
      return task;
    }
  }).map((task, index) => {
    const completed = task.completed ? 'checked' : '';
    return `
      <tr>
        <td> ${task.name} </td>
        <td> ${task.date} </td>
        <td> ${task.time} </td>
        <td> ${getPriorityIcon(task.priority)} </td>
        <td> ${getCategoryIcon(task.category)} </td>
        <td><input type='checkbox' id='complete-${index}' ${completed}></td>
        <td><b><button class='delete-task' data-index='${index}'>Remove</button></b></td>
      </tr>
    `;
  }).join('');
  document.getElementById('tasks').innerHTML = `
    <table style="margin-left:2rem;font-size:18px;">
      <thead>
        <tr>
          <th>|| Task Name ||</th>
          <th> Task Date ||</th>
          <th> Task Time ||</th>
          <th> Task Priority ||</th>
          <th> Task Category ||</th>
          <th> Completed ||</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${tasksHTML}
      </tbody>
    </table>
  `;
}

function getTaskStyle(task) {
  if (new Date(task.date + ' ' + task.time) <= new Date()) {
    return 'font-weight: bold;';
  }
}

function getPriorityIcon(priority) {
  switch (priority) {
    case 'low':
      return '&#10060;';
    case 'medium':
      return '&#10061;';
    case 'high':
      return '&#10062;';
    default:
      return '';
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case 'school':
      return '<img src="school.png" alt="Profile Image" /><span style="color:red"> School</span>';
    case 'work':
      return '<img src="work.png" alt="Profile Image" /><span style="color:orange"> Work</span>';
    case 'personal':
      return '<img src="personal.png" alt="Profile Image" /><span style="color:blue"> Personal</span>';
    default:
      return '';
  }
}

function updateTaskCompletion(index) {
  taskList[index].completed = !taskList[index].completed;
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTasks('all');
}

function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTasks('all');
}

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    const index = e.target.id.split('-')[1];
    updateTaskCompletion(index);
  } else if (e.target.className === 'delete-task') {
    const index = e.target.dataset.index;
    deleteTask(index);
  }
});

// Render initial tasks from local storage
if (taskList.length > 0) {
  renderTasks('all');
}

document.getElementById('add-task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = document.getElementById('task-name').value;
  const taskDate = document.getElementById('task-date').value;
  const taskTime = document.getElementById('task-time').value;
  const taskPriority = document.getElementById('task-priority').value;
  const taskCategory = document.getElementById('school').checked ? 'school' : document.getElementById('work').checked ? 'work' : 'personal';
  addTask({
    name: taskName,
    date: taskDate,
    time: taskTime,
    priority: taskPriority,
    category: taskCategory,
    completed: false
  });
  renderTasks('all');
});