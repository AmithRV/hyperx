'use client';

import { useFormik } from 'formik';

import ErrorMessage from '@/app/components/ui/form/ErrorMessage';

import '@/styles/auth/style.css';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [loading, setLoading] = useState({ type: '', state: false });
  const validate = (data) => {
    const errors = {};

    if (!data.userId) {
      errors.userId = 'userId required';
    }
    if (!data.password) {
      errors.password = 'password required';
    }
    return errors;
  };

  const handleFormSubmit = () => {
    setLoading({ type: 'login', state: true });
    axios
      .post('/api/auth/login', {
        userid: formik.values.userId,
        password: formik.values.password,
      })
      .then(() => {})
      .catch(() => {});
  };

  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
    },
    validate,
    onSubmit: () => {
      handleFormSubmit();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // useEffect(() => {
  //   console.clear();
  //   console.log('errors : ', formik.errors);
  // }, [formik.errors]);
  return (
    <div className="auth_section_1">
      <form className="form_section" onSubmit={handleSubmit}>
        <div className="form-group mx-4 my-4">
          <label htmlFor="exampleInputEmail1">UserId</label>
          <input
            type="text"
            className="form-control mt-2 fw-bold"
            name="userId"
            onChange={formik.handleChange}
          />
          <ErrorMessage
            message={formik.errors.userId}
            name="userId"
            formik={formik}
          />
        </div>
        <div className="form-group mx-4 mt-4 mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control mt-2 fw-bold"
            name="password"
            onChange={formik.handleChange}
          />
          <ErrorMessage
            message={formik.errors.password}
            name="password"
            formik={formik}
          />
        </div>

        <div className="w-100 d-flex justify-content-center ">
          <button type="submit" className="btn btn-primary mx-4 my-4 w-100">
            Login
          </button>
        </div>
      </form>{' '}
    </div>
  );
}

export default Login;
