import Accordion from 'react-bootstrap/Accordion';
import React from 'react';

import TaskItem from './TaskItem';

import '@/styles/todo-list/completed-tasks.css';

function CompletedTask({
  completedTasks = [],
  isCompletedTasksOpen,
  setIsCompletedTasksOpen,
  handleUpdateTaskStatus,
  handleShow,
}) {
  return (
    <div
      className="completed-tasks-wrap mx-2 my-4 "
      style={isCompletedTasksOpen ? { height: '70%' } : { height: '' }}
    >
      <Accordion
        defaultActiveKey="1"
        className={isCompletedTasksOpen ? 'h-100' : ''}
      >
        <Accordion.Item eventKey="0" className="h-100 bg-dark m-0 ">
          <Accordion.Header
            onClick={() => {
              setIsCompletedTasksOpen(!isCompletedTasksOpen);
            }}
            style={{ height: '52px' }}
          >
            Completed Tasks
          </Accordion.Header>
          <Accordion.Body className="h-100 overflow-scroll ">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                label={task.label}
                checked={true}
                status={task.status}
                handleUpdateTaskStatus={handleUpdateTaskStatus}
                handleShow={() => {
                  handleShow(task);
                }}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CompletedTask;
