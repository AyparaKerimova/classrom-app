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
        const response = await fetch('https://fish-distinct-divan.glitch.me/users');
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
            const classResponse = await fetch('https://fish-distinct-divan.glitch.me/classes');
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
      <div
        className="absolute top-20 left-2 w-[500px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
      </div>
      <div
        className="absolute top-20 right-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
      </div>
      <div
        className="hidden xl:block absolute bottom-10 left-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
      </div>
      <div
        className="absolute bottom-10 right-52 w-[500px] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
      </div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg width={150} className='mx-auto' viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M61 7V41H3V7C3.00158 6.47005 3.2128 5.96227 3.58753 5.58753C3.96227 5.2128 4.47005 5.00158 5 5H59C59.5299 5.00158 60.0377 5.2128 60.4125 5.58753C60.7872 5.96227 60.9984 6.47005 61 7V7Z" fill="#026EAA"></path>
            <path d="M49.96 5L13.96 41H3V7C3.00158 6.47005 3.2128 5.96227 3.58753 5.58753C3.96227 5.2128 4.47005 5.00158 5 5H49.96Z" fill="#0C84C1"></path>
            <path d="M41 59H23L26 47H38L41 59Z" fill="#C4C4C4"></path>
            <path d="M19 59H45" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M3 41H61V45C61 45.5304 60.7893 46.0391 60.4142 46.4142C60.0391 46.7893 59.5304 47 59 47H5C4.46957 47 3.96086 46.7893 3.58579 46.4142C3.21071 46.0391 3 45.5304 3 45V41Z" fill="#CCCCCC"></path>
            <path d="M31 44H33" stroke="#F2F2F2" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M6 9H8" stroke="#C1272D" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M10 9H12" stroke="#F15A24" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M14 9H16" stroke="#009245" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M43 9H58" stroke="#04567A" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M41 18C41 19.78 40.4722 21.5201 39.4832 23.0001C38.4943 24.4802 37.0887 25.6337 35.4441 26.3149C33.7996 26.9961 31.99 27.1743 30.2442 26.8271C28.4984 26.4798 26.8947 25.6226 25.636 24.364C24.3774 23.1053 23.5202 21.5016 23.1729 19.7558C22.8257 18.01 23.0039 16.2004 23.6851 14.5558C24.3663 12.9113 25.5198 11.5057 26.9999 10.5168C28.4799 9.52784 30.22 9 32 9C34.3869 9 36.6761 9.94821 38.364 11.636C40.0518 13.3239 41 15.6131 41 18Z" fill="#F2F2F2"></path>
            <path d="M47 31H17V37H47V31Z" fill="#F2F2F2"></path>
            <path d="M20 34H22" stroke="#4E4F4F" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M24 34H26" stroke="#4E4F4F" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M28 34H30" stroke="#4E4F4F" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M32 34H34" stroke="#4E4F4F" stroke-width="2" stroke-linejoin="round"></path>
            <path d="M36 23V26.06C34.7572 26.6782 33.3881 27 32 27C30.6119 27 29.2428 26.6782 28 26.06V23C28 21.9391 28.4214 20.9217 29.1716 20.1716C29.9217 19.4214 30.9391 19 32 19C33.0609 19 34.0783 19.4214 34.8284 20.1716C35.5786 20.9217 36 21.9391 36 23Z" fill="#B3B3B3"></path>
            <path d="M32 19C33.6569 19 35 17.6569 35 16C35 14.3431 33.6569 13 32 13C30.3431 13 29 14.3431 29 16C29 17.6569 30.3431 19 32 19Z" fill="#B3B3B3"></path>
            <path d="M39 51H25L26 47H38L39 51Z" fill="#B2B2B2"></path>
            <path d="M62 31H60V33.032H62V31Z" fill="black"></path>
            <path d="M59 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V45C2 45.7956 2.31607 46.5587 2.87868 47.1213C3.44129 47.6839 4.20435 48 5 48H24.719L22.219 58H19C18.7348 58 18.4804 58.1054 18.2929 58.2929C18.1054 58.4804 18 58.7348 18 59C18 59.2652 18.1054 59.5196 18.2929 59.7071C18.4804 59.8946 18.7348 60 19 60H45C45.2652 60 45.5196 59.8946 45.7071 59.7071C45.8946 59.5196 46 59.2652 46 59C46 58.7348 45.8946 58.4804 45.7071 58.2929C45.5196 58.1054 45.2652 58 45 58H41.781L39.281 48H59C59.7956 48 60.5587 47.6839 61.1213 47.1213C61.6839 46.5587 62 45.7956 62 45V35.032H60V40H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H59C59.2652 6 59.5196 6.10536 59.7071 6.29289C59.8946 6.48043 60 6.73478 60 7V29H62V7C62 6.20435 61.6839 5.44129 61.1213 4.87868C60.5587 4.31607 59.7956 4 59 4V4ZM39.719 58H24.281L26.781 48H37.219L39.719 58ZM60 42V45C60 45.2652 59.8946 45.5196 59.7071 45.7071C59.5196 45.8946 59.2652 46 59 46H5C4.73478 46 4.48043 45.8946 4.29289 45.7071C4.10536 45.5196 4 45.2652 4 45V42H60Z" fill="black"></path>
            <path d="M33 43H31V45H33V43Z" fill="black"></path>
            <path d="M8 8H6V10H8V8Z" fill="black"></path>
            <path d="M12 8H10V10H12V8Z" fill="black"></path>
            <path d="M16 8H14V10H16V8Z" fill="black"></path>
            <path d="M58 8H43V10H58V8Z" fill="black"></path>
            <path d="M17 38H47C47.2652 38 47.5196 37.8946 47.7071 37.7071C47.8946 37.5196 48 37.2652 48 37V31C48 30.7348 47.8946 30.4804 47.7071 30.2929C47.5196 30.1054 47.2652 30 47 30H17C16.7348 30 16.4804 30.1054 16.2929 30.2929C16.1054 30.4804 16 30.7348 16 31V37C16 37.2652 16.1054 37.5196 16.2929 37.7071C16.4804 37.8946 16.7348 38 17 38ZM18 32H46V36H18V32Z" fill="black"></path>
            <path d="M22 33H20V35H22V33Z" fill="black"></path>
            <path d="M26 33H24V35H26V33Z" fill="black"></path>
            <path d="M30 33H28V35H30V33Z" fill="black"></path>
            <path d="M34 33H32V35H34V33Z" fill="black"></path>
            <path d="M32 28C33.1551 27.9885 34.3005 27.7881 35.391 27.407C35.7516 27.2773 36.1042 27.1263 36.447 26.955V26.955C38.639 25.8645 40.3538 24.0063 41.2652 21.734C42.1766 19.4616 42.2211 16.9336 41.3903 14.6306C40.5594 12.3275 38.9111 10.4102 36.7589 9.24311C34.6066 8.07604 32.1005 7.74065 29.7171 8.30072C27.3338 8.86079 25.2393 10.2773 23.8321 12.2808C22.4249 14.2843 21.8031 16.7351 22.085 19.1671C22.3668 21.5991 23.5326 23.8428 25.3607 25.4714C27.1888 27.0999 29.5517 27.9999 32 28V28ZM32 20C32.3942 19.9992 32.7847 20.0763 33.149 20.2268C33.5133 20.3773 33.8444 20.5982 34.1231 20.8769C34.4018 21.1557 34.6228 21.4867 34.7733 21.851C34.9237 22.2154 35.0008 22.6058 35 23V25.4C34.935 25.426 34.872 25.458 34.806 25.482C34.74 25.506 34.657 25.534 34.583 25.56C34.364 25.633 34.143 25.699 33.918 25.753C33.868 25.765 33.818 25.778 33.768 25.789C32.6025 26.044 31.3955 26.044 30.23 25.789L30.086 25.754C29.859 25.699 29.635 25.633 29.414 25.554C29.341 25.529 29.267 25.504 29.195 25.477C29.123 25.45 29.066 25.421 28.995 25.395V23C28.995 22.6056 29.0728 22.2151 29.2238 21.8508C29.3749 21.4865 29.5963 21.1556 29.8754 20.8769C30.1546 20.5983 30.4859 20.3774 30.8504 20.227C31.215 20.0765 31.6056 19.9994 32 20V20ZM30 16C30 15.6045 30.1173 15.2178 30.3371 14.8889C30.5568 14.56 30.8692 14.3036 31.2346 14.1523C31.6001 14.0009 32.0022 13.9613 32.3902 14.0385C32.7781 14.1156 33.1345 14.3061 33.4142 14.5858C33.6939 14.8655 33.8844 15.2219 33.9616 15.6098C34.0387 15.9978 33.9991 16.3999 33.8478 16.7654C33.6964 17.1308 33.44 17.4432 33.1111 17.663C32.7822 17.8827 32.3956 18 32 18C31.4696 18 30.9609 17.7893 30.5858 17.4142C30.2107 17.0392 30 16.5305 30 16V16ZM24 18C24 15.8783 24.8429 13.8435 26.3431 12.3432C27.8434 10.8429 29.8783 10 32 10C34.1217 10 36.1566 10.8429 37.6569 12.3432C39.1571 13.8435 40 15.8783 40 18C40.0018 19.1961 39.7328 20.3771 39.2132 21.4545C38.6937 22.5318 37.937 23.4777 37 24.221V23C36.9992 21.6715 36.4713 20.3976 35.532 19.458C35.3044 19.2356 35.0567 19.0347 34.792 18.858C35.3615 18.3027 35.7525 17.5902 35.9151 16.8116C36.0776 16.033 36.0044 15.2235 35.7046 14.4867C35.4049 13.75 34.8922 13.1193 34.2323 12.6753C33.5723 12.2313 32.7949 11.9941 31.9995 11.9941C31.2041 11.9941 30.4267 12.2313 29.7667 12.6753C29.1068 13.1193 28.5941 13.75 28.2944 14.4867C27.9946 15.2235 27.9214 16.033 28.0839 16.8116C28.2465 17.5902 28.6375 18.3027 29.207 18.858C28.5283 19.3151 27.9721 19.9318 27.5873 20.654C27.2025 21.3762 27.0008 22.1817 27 23V24.222C26.0631 23.4783 25.3066 22.5323 24.787 21.4548C24.2675 20.3773 23.9985 19.1962 24 18V18Z" fill="black"></path>
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
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?
                  <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#78c8fa] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#a2e1f7] focus:outline-none focus:ring-2 focus:ring-[#bbecfc] focus:ring-offset-2"
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
