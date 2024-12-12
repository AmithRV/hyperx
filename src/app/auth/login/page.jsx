'use client';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useState } from 'react';

import ErrorMessage from '@/app/components/ui/form/ErrorMessage';
import { UserLogin } from '@/lib/api-collection/auth';

import '@/styles/auth/style.css';

function Login() {
  const router = useRouter();

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

    const data = {
      userid: formik.values.userId,
      password: formik.values.password,
    };
    UserLogin(data)
      .then(() => {
        formik.resetForm();
        router.push(`/dashboard`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.error);
        } else {
          toast.error('something went wrong');
        }
      })
      .finally(() => {
        setLoading({ type: 'login', state: false });
      });
  };

  const formik = useFormik({
    initialValues: {
      userId: 'amith@8589',
      password: 'Amith@123',
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

  return (
    <>
      <div className="auth_section_1">
        <form className="form_section" onSubmit={handleSubmit}>
          <div className="form-group mx-4 my-4">
            <label htmlFor="exampleInputEmail1">UserId</label>
            <input
              type="text"
              className="form-control mt-2 fw-bold"
              placeholder="userid"
              name="userId"
              onChange={formik.handleChange}
              value={formik.values.userId}
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
              placeholder="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <ErrorMessage
              message={formik.errors.password}
              name="password"
              formik={formik}
            />
          </div>

          <div className="w-100 d-flex justify-content-center ">
            <button
              type="submit"
              className="btn btn-primary mx-4 my-4 w-100"
              disabled={loading.state}
            >
              {loading.state ? 'Loading' : 'Login'}
            </button>
          </div>
        </form>{' '}
      </div>
      <Toaster />
    </>
  );
}

export default Login;
