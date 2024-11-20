'use client';
import { useState } from 'react';

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form_section" onSubmit={handleSubmit}>
      <div className="form-group mx-4 my-4">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control mt-2" />
      </div>
      <div className="form-group mx-4 mt-4 mb-3">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control mt-2" />
      </div>

      <div className="w-100 d-flex justify-content-center ">
        <button type="submit" className="btn btn-primary mx-4 my-4 w-100">
          Login
        </button>
      </div>
    </form>
  );
}

export default FormExample;
