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
  );
}

export default page;
