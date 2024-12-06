import Accordion from 'react-bootstrap/Accordion';
import React from 'react';

import TaskItem from './TaskItem';

import '@/styles/todo-list/completed-tasks.css';

function CompletedTask({
  completedTasks = [],
  isCompletedTasksOpen,
  setIsCompletedTasksOpen,
  handleUpdateTaskStatus,
}) {
  return (
    <div className="completed-tasks-wrap mx-2 my-4">
      <Accordion
        defaultActiveKey="1"
        className={isCompletedTasksOpen ? 'h-100' : ''}
      >
        <Accordion.Item eventKey="0" className="h-100">
          <Accordion.Header
            onClick={() => {
              setIsCompletedTasksOpen(!isCompletedTasksOpen);
            }}
          >
            Completed Tasks
          </Accordion.Header>
          <Accordion.Body className="h-100">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} id={task.id} label={task.label} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CompletedTask;
