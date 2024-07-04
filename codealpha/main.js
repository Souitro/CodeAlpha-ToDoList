function renderTasks(category) {
    const tasksHTML = taskList.filter((task) => {
        if (category === 'all' || task.category === category) {
            return task;
        }
    }).map((task, index) => `
        <li style="${getTaskStyle(task)}">
            ${task.name} (${task.date} ${task.time}) - ${getPriorityIcon(task.priority)} ${getCategoryIcon(task.category)}
            <input type='checkbox' id='complete-${index}' ${task.completed ? 'checked' : ''}>
        </li>`).join('');
    document.getElementById('tasks').innerHTML = tasksHTML;
}