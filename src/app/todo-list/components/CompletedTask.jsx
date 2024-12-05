import Accordion from 'react-bootstrap/Accordion';
import React from 'react';

import '@/styles/todo-list/completed-tasks.css';
import TaskItem from './TaskItem';

function CompletedTask() {
  return (
    <div className="completed-tasks-wrap mx-2 my-4">
      <Accordion defaultActiveKey="1">
        <Accordion.Item>
          <Accordion.Header>Completed Tasks</Accordion.Header>
          <Accordion.Body>
            <TaskItem />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CompletedTask;
