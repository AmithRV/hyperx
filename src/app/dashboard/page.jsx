'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import '@/styles/dashboard/dashboard.css';
import ItemCard from './components/ItemCard';
import { Logout } from '@/lib/api-collection/todo-list/auth';

function Dashboard() {
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

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    Logout()
      .then(() => {
        router.push('/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      <button
        className="bg-black text-white d-flex justify-content-center align-items-center position-absolute"
        style={{
          width: '100px',
          height: '45px',
          borderRadius: '10px',
          bottom: '20px',
          right: '20px',
          fontSize: '18px',
          fontWeight: '800',
          cursor: 'pointer',
          border: 'none',
        }}
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? 'loading...' : 'Logout'}
      </button>
    </>
  );
}

export default Dashboard;
