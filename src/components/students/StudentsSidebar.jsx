import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const StudentsSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div
          className={`${isCollapsed ? 'w-20' : 'w-64'
            } bg-gray-800 flex flex-col transition-all duration-300 rounded-2xl`}
        >
          <nav
            className={`flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-300 px-2 py-4 gap-10 rounded-2xl`}
          >
            <div>
              <button
                onClick={toggleSidebar}
                className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
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
                {!isCollapsed && 'Sidebar'}
              </button>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <Link
                to=""
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? 'justify-center' : ''
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
                {!isCollapsed && 'Home'}
              </Link>
              <Link
                to="student-profile"
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? 'justify-center' : ''
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
                {!isCollapsed && 'Profile'}
              </Link>
              <Link
                to="students-tasks"
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? 'justify-center' : ''
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
                {!isCollapsed && 'Tasks'}
              </Link>
              <Link
                to="students-materials"
                className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl ${isCollapsed ? 'justify-center' : ''
                  }`}
              >
                <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ marginRight: isCollapsed ? 0 : '8px' }}><path fill="#ffffff" d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg>
                {!isCollapsed && 'Materials'}
              </Link>
            </div>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default StudentsSidebar;
