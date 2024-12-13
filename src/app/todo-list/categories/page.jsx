'use client';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { ListCategoriesWithTasks } from '@/lib/api-collection/todo-list/categories/categories-with-tasks';
import { DeleteCategory } from '@/lib/api-collection/todo-list/categories';
import Layout from '../components/Layout';

import '@/styles/todo-list/categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);

  const [totalPendingTasks, setTotalPendingTasks] = useState(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);

  const handleDeleteCategory = (categoryId) => {
    console.log('categoryId : ', categoryId);
    DeleteCategory(categoryId).then((response) =>
      console.log('response : ', response)
    );
  };

  useEffect(() => {
    ListCategoriesWithTasks().then((response) => {
      setCategories(response.categories);

      const categories = response.categories;
      categories.map((category) => {
        const associatedTasks = category.associated_tasks;
        associatedTasks.map((task) => {
          if (task.status === 'active') {
            setTotalPendingTasks((prev) => prev + 1);
          } else {
            setTotalCompletedTasks((prev) => prev + 1);
          }
        });
      });
    });
  }, []);

  return (
    <Layout
      navigationVisible={false}
      activeTaskCount={totalPendingTasks}
      completedTaskCount={totalCompletedTasks}
    >
      <div className="categories-wrap">
        <Accordion>
          {categories.map((e, index) => (
            <Accordion.Item key={e.id} eventKey={index}>
              <Accordion.Header>
                <div className="w-100 d-flex align-items-center justify-content-between">
                  <div>
                    <Image
                      src="/svg/folder.svg"
                      alt=""
                      width={25}
                      height={25}
                      className="opacity-50"
                    />
                    <span className="mx-2 opacity-75">{e.label}</span>
                  </div>
                  <div>
                    <Image
                      src="/svg/trash.svg"
                      alt=""
                      width={25}
                      height={25}
                      className="opacity-50"
                      onClick={() => {
                        handleDeleteCategory(e.id);
                      }}
                    />
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup key={e.id}>
                  {e.associated_tasks.map((task) => (
                    <ListGroup.Item key={task.id}>{task.label}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}

export default Categories;
