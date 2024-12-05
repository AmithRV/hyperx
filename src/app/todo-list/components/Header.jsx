import React from 'react';
import '@/styles/todo-list/header.css';

function Header() {
  return (
    <div className="todo-list-header">
      <div className="loader">
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Header;
