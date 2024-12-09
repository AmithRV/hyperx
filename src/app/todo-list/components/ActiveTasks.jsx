import React from 'react';

import TaskItem from './TaskItem';

function ActiveTasks({
  isCompletedTasksOpen = false,
  taskList = [],
  handleShow,
  handleUpdateTaskStatus,
}) {
  return (
    <div
      className={`active-tasks mx-2 ${
        isCompletedTasksOpen ? 'box' : 'box-expanded'
      }`}
    >
      {[...taskList].reverse().map((task, index) => (
        <TaskItem
          key={index}
          id={task.id}
          label={task.label}
          checked={false}
          status={task.status}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleShow={() => {
            handleShow(task);
          }}
        />
      ))}
    </div>
  );
}

export default ActiveTasks;
