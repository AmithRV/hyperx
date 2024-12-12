'use client';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Layout from '../components/Layout';

import '@/styles/todo-list/categories.css';
import { ListCategoriesWithTasks } from '@/lib/api-collection/todo-list/categories/categories-with-tasks';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ListCategoriesWithTasks().then((response) => {
      console.log('response : ', response.data.categories);
      setCategories(response.data.categories);
    });
  }, []);

  return (
    <Layout navigationVisible={false}>
      <div className="categories-wrap">
        <Accordion>
          {categories.map((e, index) => (
            <Accordion.Item key={e.id} eventKey={index}>
              <Accordion.Header>
                <div className="w-100 d-flex align-items-center">
                  <Image src="/svg/folder.svg" alt="" width={25} height={25} />
                  <span className="mx-2">{e.label}</span>
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
