'use client';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import CompletedTask from './components/CompletedTask';
import TaskItem from './components/TaskItem';
import AddTask from './components/AddTask';
import Layout from './components/Layout';

import '@/styles/todo-list/todo-list-body.css';
import TaskDetails from './components/TaskDetails';

function TodoList() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isCompletedTasksOpen, setIsCompletedTasksOpen] = useState(false);

  const [show, setShow] = useState({ isVisible: false, type: '', data: {} });

  const handleClose = () => {
    setShow({ isVisible: false, type: '', data: {} });
  };

  const handleShow = (task) => {
    setShow({ isVisible: true, type: 'task-details', data: task });
  };

  const handleAddToList = (task) => {
    if (task.trim() !== '') {
      const data = { id: uuidv4(), label: task, status: 'active' };
      setTaskList((prevArray) => [...prevArray, data]);
      setTask('');

      axios
        .post('/api/todo-list', {
          label: task,
          status: 'active',
        })
        .then(() => {})
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data.error);
          } else {
            toast.error('something went wrong');
          }
        });
    }
  };

  const handleUpdateTaskStatus = (taskId, taskStatus) => {
    if (taskStatus === 'active') {
      const taskDetails = taskList.filter((e) => e.id === taskId)[0];
      const filteredTasks = taskList.filter((e) => e.id !== taskId);
      taskDetails.status = 'completed';

      setTaskList(filteredTasks);
      setCompletedTasks((prevArray) => [...prevArray, taskDetails]);

      axios.patch('/api/todo-list', { taskId, status: 'completed' });
    }

    if (taskStatus === 'completed') {
      const taskDetails = completedTasks.filter((e) => e.id === taskId)[0];

      const filteredTasks = completedTasks.filter((e) => e.id !== taskId);
      taskDetails.status = 'active';

      setCompletedTasks(filteredTasks);
      setTaskList((prevArray) => [...prevArray, taskDetails]);

      axios.patch('/api/todo-list', { taskId, status: 'active' });
    }
  };

  useEffect(() => {
    axios.get('/api/todo-list').then((response) => {
      const tasks = response.data.tasks;
      const task_list = tasks.filter((e) => e.status === 'active');
      const completed_tasks_list = tasks.filter(
        (e) => e.status === 'completed'
      );

      setTaskList(task_list);
      setCompletedTasks(completed_tasks_list);
    });
  }, []);

  useEffect(() => {
    console.clear();
    console.log('show : ', show);
  }, [show]);
  return (
    <>
      <Layout>
        <div className="todo-list-body-wrap">
          <AddTask
            handleAddToList={handleAddToList}
            task={task}
            setTask={setTask}
          />
          <div
            className={`active-tasks mx-2 ${
              isCompletedTasksOpen ? 'box' : 'box-expanded'
            }`}
          >
            {[...taskList].reverse().map((task, index) => (
              <TaskItem
                key={index}
                id={task.id}
                label={task.label}
                checked={false}
                status={task.status}
                handleUpdateTaskStatus={handleUpdateTaskStatus}
                handleShow={() => {
                  handleShow(task);
                }}
              />
            ))}
          </div>

          <CompletedTask
            completedTasks={completedTasks}
            isCompletedTasksOpen={isCompletedTasksOpen}
            setIsCompletedTasksOpen={setIsCompletedTasksOpen}
            handleUpdateTaskStatus={handleUpdateTaskStatus}
            handleShow={handleShow}
          />
        </div>
      </Layout>

      <Toaster />

      <TaskDetails
        isVisible={show.isVisible && show.type === 'task-details'}
        title={show.data.label}
        status={show.data.status}
        handleClose={handleClose}
      />
    </>
  );
}

export default TodoList;
