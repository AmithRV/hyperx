import Form from 'react-bootstrap/Form';
import React from 'react';

import '@/styles/todo-list/task-item.css';

function TaskItem() {
  return (
    <div className="task-item-wrap mx-2 my-4">
      <Form.Check aria-label="option 1" />
      <label className="mx-2">TaskItem</label>
    </div>
  );
}

export default TaskItem;
