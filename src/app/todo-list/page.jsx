'use client';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import CompletedTask from './components/CompletedTask';
import TaskDetails from './components/TaskDetails';
import ActiveTasks from './components/ActiveTasks';
import AddTask from './components/AddTask';
import Loading from './components/Loading';
import Layout from './components/Layout';

import '@/styles/todo-list/todo-list-body.css';
import AddCategory from './components/AddCategory';
import {
  CreateCategory,
  ListCategories,
} from '@/lib/api-collection/todo-list/categories';
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateTask,
} from '@/lib/api-collection/todo-list';

function TodoList() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
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

      CreateTask(data)
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

      const data = { taskId, status: 'completed' };
      UpdateTask(data);
    }

    if (taskStatus === 'completed') {
      const taskDetails = completedTasks.filter((e) => e.id === taskId)[0];

      const filteredTasks = completedTasks.filter((e) => e.id !== taskId);
      taskDetails.status = 'active';

      setCompletedTasks(filteredTasks);
      setTaskList((prevArray) => [...prevArray, taskDetails]);

      const data = { taskId, status: 'active' };
      UpdateTask(data);
    }
  };

  const handleDeleteTask = () => {
    const taskStatus = show.data.status;
    const taskId = show.data.id;

    if (taskStatus === 'active') {
      const filteredData = taskList.filter((e) => e.id !== taskId);
      setTaskList(filteredData);
    } else if (taskStatus === 'completed') {
      const filteredData = completedTasks.filter((e) => e.id !== taskId);
      setCompletedTasks(filteredData);
    }

    handleClose();

    DeleteTask(taskId);
  };

  const handleCategoryChange = (categoryId, taskId, status) => {
    const data = {
      taskId,
      status,
      categoryId,
    };
    UpdateTask(data);
  };

  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      setLoading(true);
      const data = {
        label: categoryName,
      };

      CreateCategory(data)
        .then((response) => {
          setCategoryName('');
          const newCategory = response.data.category;
          setCategories((prevArray) => [
            ...prevArray,
            { id: newCategory._id, label: newCategory.label },
          ]);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data.error);
          } else {
            toast.error('something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
          setShow((prevState) => ({
            isVisible: true,
            type: 'task-details',
            data: {
              id: prevState.data.categoryDetails.id,
              label: prevState.data.categoryDetails.title,
              status: prevState.data.categoryDetails.status,
              createdAt: prevState.data.categoryDetails.createdAt,
            },
          }));
        });
    }
  };

  useEffect(() => {
    // Load todo-list -- start
    setLoading(true);
    GetTasks()
      .then((response) => {
        const tasks = response.data.tasks;
        const task_list = tasks.filter((e) => e.status === 'active');
        const completed_tasks_list = tasks.filter(
          (e) => e.status === 'completed'
        );

        setTaskList(task_list);
        setCompletedTasks(completed_tasks_list);
      })
      .finally(() => {
        setLoading(false);
      });
    // Load todo-list -- end

    console.log('env : ', process.env.DOMAIN);

    // Load categories -- start
    ListCategories().then((response) => {
      console.log('response : ', response.data.categories);
      setCategories(response.data.categories);
    });
    // Load categories -- end
  }, []);

  return (
    <>
      <Layout
        activeTaskCount={taskList.length}
        completedTaskCount={completedTasks.length}
      >
        <div className="todo-list-body-wrap">
          <AddTask
            handleAddToList={handleAddToList}
            task={task}
            setTask={setTask}
          />

          {loading && <Loading />}

          <ActiveTasks
            isCompletedTasksOpen={isCompletedTasksOpen}
            taskList={taskList}
            handleShow={handleShow}
            handleUpdateTaskStatus={handleUpdateTaskStatus}
          />

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
        id={show.data.id}
        title={show.data.label}
        status={show.data.status}
        createdAt={show.data.createdAt}
        completedAt={show.data.completedAt}
        categoryId={show.data.categoryId}
        categories={categories}
        setShow={setShow}
        handleClose={handleClose}
        handleDeleteTask={handleDeleteTask}
        handleCategoryChange={handleCategoryChange}
      />

      <AddCategory
        show={show.isVisible && show.type === 'add-category'}
        categoryName={categoryName}
        loading={loading}
        setCategoryName={setCategoryName}
        handleClose={handleClose}
        handleAddCategory={handleAddCategory}
      />
    </>
  );
}

export default TodoList;
