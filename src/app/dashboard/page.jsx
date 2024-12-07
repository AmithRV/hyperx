import React from 'react';

import '@/styles/dashboard/dashboard.css';
import ItemCard from './components/ItemCard';

function page() {
  const items = [
    {
      id: 1,
      label: 'Stock Filter',
      image: './images/filter.jpg',
      link: '/stock-filter',
    },
    {
      id: 2,
      label: 'Todo List',
      image: './images/todo-list.png',
      link: '/todo-list',
    },
  ];

  return (
    <>
      <div className="section-1 bg-dark">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            label={item.label}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
      <div
        className="bg-black text-white d-flex justify-content-center align-items-center position-absolute"
        style={{
          width: '85px',
          height: '60px',
          borderRadius: '10px',
          bottom: '20px',
          right: '20px',
          fontSize: '18px',
          fontWeight: '800',
          cursor: 'pointer',
        }}
      >
        Logout
      </div>
    </>
  );
}

export default page;
