'use client';
import React, { useState } from 'react';
import '@/styles/todo-list/add-task.css';

function AddTask({ handleAddToList, task = '', setTtask }) {
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
          onChange={(e) => {
            setTtask(e.target.value);
          }}
          value={task}
          autoFocus
        />
      </form>
    </div>
  );
}

export default AddTask;
