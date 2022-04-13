import React from 'react';
import TaskItem from "./TaskItem";
function TaskList({tasks, changeStatus, removeTasks, status}) {
    return (
        <ul>
            {tasks
                .filter((task) => status === 'all' ? task : task.status === status)
                .map((task) =><TaskItem key={task.id} task={task} changeStatus={changeStatus} removeTask={removeTasks}/>
                    )}
        </ul>
    );
}

export default TaskList;