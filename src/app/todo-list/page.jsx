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
    { id: 2, label: 'Task-2' },
    { id: 3, label: 'Task-3' },
    { id: 4, label: 'Task-4' },
    { id: 5, label: 'Task-5' },
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: 1, label: 'Completed Task-1' },
    { id: 2, label: 'Completed Task-2' },
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
