import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const TeachersSidebar = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const teacherId = user.id;
  const classId = user.classes && user.classes.length > 0 ? user.classes[0].id : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fish-distinct-divan.glitch.me/tasks")
      .then(response => response.json())
      .then(data => {
        const teacherTasks = data.filter(task => task.teacherId === teacherId);
        setTasks(teacherTasks);
      });

    fetch("https://fish-distinct-divan.glitch.me/users")
      .then(response => response.json())
      .then(data => {
        const filteredStudents = data.filter(user => user.role === "student");
        setStudents(filteredStudents);
      });
  }, [teacherId]);

  function handleLogOut() {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
    window.location.reload();
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-800`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav
            className={`flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-300 px-2 py-4 ${
              isCollapsed ? "items-center" : ""
            }`}
          >
            <div>
              <button
                onClick={toggleSidebar}
                className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {!isCollapsed && <span className="ml-2"></span>}
              </button>
            </div>
            <div>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Dashboard
              </Link>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <Link
                to={`teachers-profile/${teacherId}`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Profile
              </Link>
              <Link
                to={`teachers-tasks/${teacherId}/${classId}`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Tasks
              </Link>
              <Link
                to={`all-students/${teacherId}/${classId}`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Students
              </Link>
              {tasks.length > 0 && students.length > 0 && (
                <Link
                  to={`assignments/${tasks[0].id}/${students[0].id}`}
                  className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  Assignments
                </Link>
              )}
              <Link
                to={`teachers-meet`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Meet
              </Link>
              <Link
                to={`teachers-materials`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Materials
              </Link>
              <Link
                to={`memories`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                Memories
              </Link>
            </div>
          </nav>
        </div>
        <button
          onClick={handleLogOut}
          className={`text-gray-200 px-4 py-2 ${isCollapsed ? "justify-center" : ""}`}
        >
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default TeachersSidebar;
