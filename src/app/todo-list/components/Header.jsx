import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import React from 'react';

import '@/styles/todo-list/header.css';

function Header({ activeTaskCount = '', completedTaskCount = '' }) {
  const router = useRouter();

  return (
    <div className="todo-list-header d-flex align-items-center text-white">
      <div className="loader">
        <div
          className="circle"
          onClick={() => {
            router.push('/dashboard');
          }}
        ></div>
      </div>
      <div className="mx-4">
        <div className="mx-4">
          <Button variant="dark">
            Pending{' '}
            <Badge bg="light" className="text-dark mx-2">
              {activeTaskCount}
            </Badge>
          </Button>

          <Button variant="dark" className="mx-4">
            Completed{' '}
            <Badge bg="light" className="text-dark mx-2">
              {completedTaskCount}
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
