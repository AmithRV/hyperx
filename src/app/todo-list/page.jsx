'use client';
import React, { useState } from 'react';

import '@/styles/todo-list/todo-list-body.css';
import TaskItem from './components/TaskItem';
import AddTask from './components/AddTask';
import Layout from './components/Layout';
import CompletedTask from './components/CompletedTask';

function TodoList() {
  const [isCompletedTasksOpen, setIsCompletedTasksOpen] = useState(false);

  const [taskList, setTtaskList] = useState([
    { id: 1, label: 'Task-1' },
    // { id: 2, label: 'Task-2' },
    // { id: 3, label: 'Task-3' },
    // { id: 4, label: 'Task-4' },
    // { id: 5, label: 'Task-5' },
    // { id: 6, label: 'Task-6' },
    // { id: 7, label: 'Task-7' },
    // { id: 8, label: 'Task-8' },
    // { id: 9, label: 'Task-9' },
    // { id: 10, label: 'Task-10' },
    // { id: 11, label: 'Task-11' },
    // { id: 12, label: 'Task-12' },
    // { id: 13, label: 'Task-13' },
    // { id: 14, label: 'Task-14' },
    // { id: 15, label: 'Task-15' },
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: 1, label: 'Completed Task-1' },
    { id: 2, label: 'Completed Task-2' },
    { id: 3, label: 'Completed Task-3' },
    { id: 4, label: 'Completed Task-4' },
    { id: 5, label: 'Completed Task-5' },
    { id: 6, label: 'Completed Task-6' },
    { id: 7, label: 'Completed Task-7' },
    { id: 8, label: 'Completed Task-8' },
    { id: 9, label: 'Completed Task-9' },
    { id: 10, label: 'Completed Task-10' },
    { id: 11, label: 'Completed Task-11' },
    { id: 12, label: 'Completed Task-12' },
    { id: 13, label: 'Completed Task-13' },
    { id: 14, label: 'Completed Task-14' },
    { id: 15, label: 'Completed Task-15' },
  ]);

  const handleAddToList = (task) => {
    console.log('task : ', task);
  };

  return (
    <Layout>
      <div className="todo-list-body-wrap">
        <AddTask handleAddToList={handleAddToList} />
        <div
          className={`active-tasks mx-2 ${
            isCompletedTasksOpen ? 'box' : 'box-expanded'
          }`}
        >
          {taskList.map((task) => (
            <TaskItem key={task.id} id={task.id} label={task.label} />
          ))}
        </div>

        <CompletedTask
          completedTasks={completedTasks}
          isCompletedTasksOpen={isCompletedTasksOpen}
          setIsCompletedTasksOpen={setIsCompletedTasksOpen}
        />
      </div>
    </Layout>
  );
}

export default TodoList;
