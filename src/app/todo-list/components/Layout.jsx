import React from 'react';

import Header from './Header';

function Layout({
  activeTaskCount = '',
  completedTaskCount = '',
  navigationVisible,
  children,
}) {
  return (
    <>
      <Header
        activeTaskCount={activeTaskCount}
        completedTaskCount={completedTaskCount}
        navigationVisible={navigationVisible}
      />
      {children}
    </>
  );
}

export default Layout;
