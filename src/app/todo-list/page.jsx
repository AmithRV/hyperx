'use client';
import React, { useState } from 'react';

import '@/styles/todo-list/todo-list-body.css';
import TaskItem from './components/TaskItem';
import AddTask from './components/AddTask';
import Layout from './components/Layout';
import CompletedTask from './components/CompletedTask';

function TodoList() {
  const [taskList, setTtaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddToList = (task) => {
    console.log('task : ', task);
  };

  return (
    <Layout>
      <div className="todo-list-body-wrap">
        <AddTask handleAddToList={handleAddToList} />
        <TaskItem />
        <CompletedTask />
      </div>
    </Layout>
  );
}

export default TodoList;
