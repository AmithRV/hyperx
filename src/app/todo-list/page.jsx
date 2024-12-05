'use client';
import React from 'react';

import '@/styles/todo-list/todo-list-body.css';
import AddTask from './components/AddTask';
import Layout from './components/Layout';

function TodoList() {
  const handleAddToList = (task) => {
    console.log('task : ', task);
  };

  return (
    <Layout>
      <div className="todo-list-body-wrap">
        <AddTask handleAddToList={handleAddToList} />
      </div>
    </Layout>
  );
}

export default TodoList;
