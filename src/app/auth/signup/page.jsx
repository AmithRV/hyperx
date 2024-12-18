'use client';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useState } from 'react';

import ErrorMessage from '@/app/components/ui/form/ErrorMessage';
import { UserSignup } from '@/lib/api-collection/auth';

import '@/styles/auth/style.css';

function Signup() {
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
    if (!data.email) {
      errors.email = 'email required';
    }
    return errors;
  };

  const handleFormSubmit = () => {
    setLoading({ type: 'signup', state: true });

    const data = {
      userid: formik.values.userId,
      password: formik.values.password,
      email: formik.values.email,
    };

    UserSignup(data)
      .then(() => {
        formik.resetForm();
        router.push(`/auth/login`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.error);
        } else {
          toast.error('something went wrong');
        }
      })
      .finally(() => {
        setLoading({ type: 'signup', state: false });
      });
  };

  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
      email: '',
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
            <label htmlFor="exampleInputPassword1">email</label>
            <input
              type="email"
              className="form-control mt-2 fw-bold"
              placeholder="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <ErrorMessage
              message={formik.errors.password}
              name="password"
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
              {loading.state ? 'Loading' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default Signup;
