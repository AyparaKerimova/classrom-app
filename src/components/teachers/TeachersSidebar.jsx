import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const TeachersSidebar = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const { t } = useTranslation();
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
        className={`flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
          } bg-gray-800  rounded-2xl`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav
            className={`flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-400 to-blue-300 px-2 py-4 
              `}
          >
            <div>
              <button
                onClick={toggleSidebar}
                className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${isCollapsed ? "justify-center" : ""
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
                className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ marginRight: isCollapsed ? 0 : '8px' }}
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6l2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('dashboard')}
              </Link>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <Link
                to={`teachers-profile/${teacherId}`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  style={{ marginRight: isCollapsed ? 0 : '8px' }}
                >
                  <path
                    fill="currentColor"
                    d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"
                  />
                </svg>
                {t('profile')}
              </Link>
              <Link
                to={`teachers-tasks/${teacherId}/${classId}`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ marginRight: isCollapsed ? 0 : '8px' }}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M16 7h3v4h-3zm-7 8h11M9 11h4M9 7h4M6 18.5a2.5 2.5 0 1 1-5 0V7h5.025M6 18.5V3h17v15.5a2.5 2.5 0 0 1-2.5 2.5h-17"
                  />
                </svg>
                {t('tasks')}
              </Link>
              <Link
                to={`all-students/${teacherId}/${classId}`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg style={{ marginRight: isCollapsed ? 0 : '8px' }} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>
                {t('students')}
              </Link>
              {tasks.length > 0 && students.length > 0 && (
                <Link
                  to={`assignments/${tasks[0].id}/${students[0].id}`}
                  className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                    }`}
                >
                  <svg style={{ marginRight: isCollapsed ? 0 : '8px' }} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" /></svg>
                  {t('assignments')}
                </Link>
              )}
              <Link
                to={`teachers-meet`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg style={{ marginRight: isCollapsed ? 0 : '8px' }} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" /></svg>
                {t('meet')}
              </Link>
              <Link
                to={`teachers-materials`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ marginRight: isCollapsed ? 0 : '8px' }}><path fill="#ffffff" d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg>

                Materials
              </Link>
              <Link
                to={`memories`}
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <svg style={{ marginRight: isCollapsed ? 0 : '8px' }} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>
                {t('memories')}
              </Link>
            </div>
          </nav>
        </div>
        <button
          onClick={handleLogOut}
          className={`px-6 py-3 bg-gradient-to-r from-blue-200 to-purple-300 text-white font-semibold shadow-md hover:from-purple-300 hover:to-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 text-gray-200 px-4 py-2 ${isCollapsed ? "justify-center" : ""}`}
        >
          {t('logout')}
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default TeachersSidebar;
