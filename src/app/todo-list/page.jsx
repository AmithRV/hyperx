'use client';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CompletedTask from './components/CompletedTask';
import TaskItem from './components/TaskItem';
import AddTask from './components/AddTask';
import Layout from './components/Layout';

import '@/styles/todo-list/todo-list-body.css';

function TodoList() {
  const [task, setTtask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isCompletedTasksOpen, setIsCompletedTasksOpen] = useState(false);

  const handleAddToList = (task) => {
    if (task.trim() !== '') {
      const data = { id: uuidv4(), label: task, status: 'active' };
      setTaskList((prevArray) => [...prevArray, data]);
      setTtask('');
    }
  };

  const handleUpdateTaskStatus = (taskId, taskStatus) => {
    if (taskStatus === 'active') {
      const taskDetails = taskList.filter((e) => e.id === taskId)[0];

      const filteredTasks = taskList.filter((e) => e.id !== taskId);
      taskDetails.status = 'completed';

      setTaskList(filteredTasks);
      setCompletedTasks((prevArray) => [...prevArray, taskDetails]);
    }

    if (taskStatus === 'completed') {
      const taskDetails = completedTasks.filter((e) => e.id === taskId)[0];

      const filteredTasks = completedTasks.filter((e) => e.id !== taskId);
      taskDetails.status = 'active';

      setCompletedTasks(filteredTasks);
      setTaskList((prevArray) => [...prevArray, taskDetails]);
    }
  };

  useEffect(() => {
    console.clear();
    console.table(taskList);
  }, [taskList]);

  return (
    <Layout>
      <div className="todo-list-body-wrap">
        <AddTask
          handleAddToList={handleAddToList}
          task={task}
          setTtask={setTtask}
        />
        <div
          className={`active-tasks mx-2 ${
            isCompletedTasksOpen ? 'box' : 'box-expanded'
          }`}
        >
          {[...taskList].reverse().map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              label={task.label}
              checked={false}
              status={task.status}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
            />
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
