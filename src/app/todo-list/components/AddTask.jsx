'use client';
import React from 'react';

import '@/styles/todo-list/add-task.css';

function AddTask({ handleAddToList, task = '', setTask }) {
  return (
    <div className="add-task-wrap mx-2 my-4">
      <form
        className="w-100 h-100"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToList(task);
        }}
      >
        <input
          className="add-task-inpt w-100 h-100"
          placeholder="Add a task"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
          autoFocus
          maxLength={200}
        />
      </form>
    </div>
  );
}

export default AddTask;
