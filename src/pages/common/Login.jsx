import React from 'react';
import { useFormik } from 'formik';
import { userLoginSchema } from '../../validations/user.login.validation';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      isTeacher: false,
    },
    validationSchema: userLoginSchema,
    onSubmit: async (values) => {
      const { email, password, isTeacher } = values;
      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          if (user.role === 'teacher' && !isTeacher) {
            alert('Please confirm you are a teacher by checking the box.');
            return;
          }

          if (user.role === 'student' && isTeacher) {
            alert('Students cannot check the "I\'m teacher" box.');
            return;
          }

          if (user.role === 'teacher') {
            const classResponse = await fetch('http://localhost:3000/classes');
            const classes = await classResponse.json();
            const userClasses = classes.filter(
              (classItem) => classItem.teacherId === user.id
            );

            localStorage.setItem(
              'user',
              JSON.stringify({ email, role: user.role, id: user.id, classes: userClasses })
            );
          } else {
            localStorage.setItem(
              'user',
              JSON.stringify({ email, role: user.role, id: user.id })
            );
          }

          localStorage.setItem('isAuthenticated', 'true');
          alert(`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in`);
          navigate(user.role === 'teacher' ? '/teachers' : '/students');
          window.location.reload();
        } else {
          alert('Email or password is incorrect. Please try again.');
        }
      } catch (error) {
        alert('error');
        console.error(error);
      }
    },
  });
  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="mx-auto w-40 fill-[#bbecfc]"
          >
          </svg>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="isTeacher"
                    name="isTeacher"
                    type="checkbox"
                    checked={formik.values.isTeacher}
                    onChange={formik.handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="isTeacher"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I'm teacher
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#bbecfc] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#a2e1f7] focus:outline-none focus:ring-2 focus:ring-[#bbecfc] focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
