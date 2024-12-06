import Form from 'react-bootstrap/Form';
import React from 'react';

import '@/styles/todo-list/task-item.css';

function TaskItem({ id = '', label = '', handleUpdateTaskStatus }) {
  return (
    <div className="task-item-wrap mx-2 my-2">
      <Form.Check
        aria-label="option 1"
        onChange={() => {
          handleUpdateTaskStatus(id);
        }}
      />
      <label className="mx-2">{label}</label>
    </div>
  );
}

export default TaskItem;
