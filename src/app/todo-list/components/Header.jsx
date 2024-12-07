import { useRouter } from 'next/navigation';
import React from 'react';

import '@/styles/todo-list/header.css';

function Header() {
  const router = useRouter();

  return (
    <div className="todo-list-header">
      <div className="loader">
        <div
          className="circle"
          onClick={() => {
            router.push('/dashboard');
          }}
        ></div>
      </div>
    </div>
  );
}

export default Header;
