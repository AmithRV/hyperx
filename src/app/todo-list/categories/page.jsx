'use client';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';

import Layout from '../components/Layout';

import '@/styles/todo-list/categories.css';

function Categories() {
  const data = [
    {
      id: 1,
      label: 'Category-1',
      tasks: [
        { id: 1, label: 'task-1.1' },
        { id: 2, label: 'task-1.2' },
        { id: 3, label: 'task-1.3' },
        { id: 4, label: 'task-1.4' },
      ],
    },
    {
      id: 2,
      label: 'Category-2',
      tasks: [
        { id: 1, label: 'task-2.1' },
        { id: 2, label: 'task-2.2' },
        { id: 3, label: 'task-2.3' },
        { id: 4, label: 'task-2.4' },
      ],
    },
    {
      id: 3,
      label: 'Category-3',
      tasks: [
        { id: 1, label: 'task-3.1' },
        { id: 2, label: 'task-3.2' },
        { id: 3, label: 'task-3.3' },
        { id: 4, label: 'task-3.4' },
      ],
    },
  ];
  return (
    <Layout navigationVisible={false}>
      <div className="categories-wrap">
        <Accordion>
          {data.map((e, index) => (
            <Accordion.Item key={e.id} eventKey={index}>
              <Accordion.Header>{e.label}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {e.tasks.map((task) => (
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
