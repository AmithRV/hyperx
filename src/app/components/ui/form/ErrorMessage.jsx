import React from 'react';
import '@/styles/components/form-validation.css';
function ErrorMessage({ message }) {
  if (message) {
    return <span className="error_message">* {message}</span>;
  }
  return null;
}

export default ErrorMessage;
