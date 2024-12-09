import React from 'react';

import Header from './Header';

function Layout({ activeTaskCount = '', completedTaskCount = '', children }) {
  return (
    <>
      <Header
        activeTaskCount={activeTaskCount}
        completedTaskCount={completedTaskCount}
      />
      {children}
    </>
  );
}

export default Layout;
