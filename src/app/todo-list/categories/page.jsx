'use client';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { ListCategoriesWithTasks } from '@/lib/api-collection/todo-list/categories/categories-with-tasks';
import { DeleteCategory } from '@/lib/api-collection/todo-list/categories';
import Layout from '../components/Layout';

import '@/styles/todo-list/categories.css';
import DeleteCategoryConfirmModal from '../components/DeleteCategoryConfirmModal';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [totalPendingTasks, setTotalPendingTasks] = useState(0);
  const [show, setShow] = useState({ type: '', isVisible: false, data: {} });
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);

  const handleDeleteCategory = () => {
    const categoryId = show.data.category.id;

    DeleteCategory(categoryId)
      .then((response) => console.log('response : ', response))
      .finally(() => {
        setShow({ type: '', isVisible: false, data: {} });
      });
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

  useEffect(() => {
    console.log('show : ', show);
  }, [show]);
  return (
    <>
      <Layout
        navigationVisible={false}
        activeTaskCount={totalPendingTasks}
        completedTaskCount={totalCompletedTasks}
      >
        <div className="categories-wrap">
          <Accordion>
            {categories.map((category) => (
              <Accordion.Item key={category.id} eventKey={category.id}>
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
                      <span className="mx-2 opacity-75">{category.label}</span>
                    </div>
                    <div>
                      {console.log(
                        'GENERAL_TASKS_ID : ',
                        process.env.NEXT_PUBLIC_GENERAL_TASKS_ID
                      )}
                      {category.id !==
                        process.env.NEXT_PUBLIC_GENERAL_TASKS_ID && (
                        <Image
                          src="/svg/trash.svg"
                          alt=""
                          width={25}
                          height={25}
                          className="opacity-50"
                          onClick={() => {
                            setShow({
                              type: 'delete-category',
                              isVisible: true,
                              data: { category },
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup key={category.id}>
                    {category.associated_tasks.map((task, index) => (
                      <ListGroup.Item key={index}>{task.label}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Layout>

      <DeleteCategoryConfirmModal
        isVisible={show.type === 'delete-category' && show.isVisible}
        label={show?.data?.category?.label}
        handleClose={() => {
          setShow({ type: '', isVisible: false });
        }}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  );
}

export default Categories;
