'use client';
import React, { useState } from 'react';

import '@/styles/todo-list/todo-list-body.css';
import TaskItem from './components/TaskItem';
import AddTask from './components/AddTask';
import Layout from './components/Layout';
import CompletedTask from './components/CompletedTask';

function TodoList() {
  const [isCompletedTasksOpen, setIsCompletedTasksOpen] = useState(false);

  const [taskList, setTtaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddToList = (task) => {
    console.log('task : ', task);
    setTtaskList((prevArray) => [...prevArray, task]);
  };

  const handleUpdateTaskStatus = () => {};

  return (
    <Layout>
      <div className="todo-list-body-wrap">
        <AddTask handleAddToList={handleAddToList} />
        <div
          className={`active-tasks mx-2 ${
            isCompletedTasksOpen ? 'box' : 'box-expanded'
          }`}
        >
          {taskList.map((task, index) => (
            <TaskItem key={index} id={task.id} label={task.label} />
          ))}
        </div>

        <CompletedTask
          completedTasks={completedTasks}
          isCompletedTasksOpen={isCompletedTasksOpen}
          setIsCompletedTasksOpen={setIsCompletedTasksOpen}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
        />
      </div>
    </Layout>
  );
}

export default TodoList;
