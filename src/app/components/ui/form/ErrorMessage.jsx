import React from 'react';
import '@/styles/components/form-validation.css';
function ErrorMessage({ message = '', name = '', formik }) {
  if (message && formik.touched[name]) {
    return <span className="error_message">* {message}</span>;
  }
  return null;
}

export default ErrorMessage;
