import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const TeachersSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const teacherId = user.id;
  const classId = user.classes && user.classes.length > 0 ? user.classes[0].id : null;
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.setItem("isAuthenticated","false");
    navigate("/login");
    window.location.reload()
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-300 px-2 py-4 gap-10">
            <div>
              <Link to="/" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Dashboard
              </Link>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <Link
                to={`teachers-profile/${teacherId}`}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
              >
                Profile
              </Link>
              <Link
                to={`teachers-tasks/${teacherId}/${classId}`}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
              >
                Tasks
              </Link>
              <Link
                to={`all-students/${teacherId}/${classId}`}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
              >
                Students
              </Link>
            </div>
          </nav>
        </div>
        <button onClick={handleLogOut} className='text-gray-200'>Logout</button>

      </div>
      <Outlet />
    </div>
  );
};

export default TeachersSidebar;
