import React from 'react';

import '@/styles/todo-list/loading.css';

function Loading() {
  return (
    <div className="" data-test-id="loading-page">
      <div className="Charts_loading-page_loader-wrapper---C7bYe">
        <div
          className="Charts_loading-page_loader-image---mKFFA"
          data-test-id="loader-image"
        ></div>
        <div
          className="Charts_typography_body--regular---BRC0b Charts_loading-page_loader-text---RUCxa leafygreen-ui-1yli3c0"
          data-test-id="loader-text"
        >
          Loading
        </div>
      </div>
    </div>
  );
}

export default Loading;
