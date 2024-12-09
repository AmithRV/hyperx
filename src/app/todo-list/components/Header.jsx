import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import React from 'react';

import '@/styles/todo-list/header.css';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="section-details">
        <div className="w-100 d-flex justify-content-around align-items-center">
          <Button variant="dark">
            Pending{' '}
            <Badge bg="light" className="text-dark mx-2">
              {activeTaskCount}
            </Badge>
          </Button>

          <Button variant="dark">
            Completed{' '}
            <Badge bg="light" className="text-dark mx-2">
              {completedTaskCount}
            </Badge>
          </Button>

          <Image src="/svg/category.svg" width={40} height={40} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Header;
