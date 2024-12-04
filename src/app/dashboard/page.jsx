import React from 'react';

import '@/styles/dashboard/dashboard.css';
import ItemCard from './components/ItemCard';

function page() {
  return (
    <div className="section-1 bg-dark">
      <ItemCard />
    </div>
  );
}

export default page;
