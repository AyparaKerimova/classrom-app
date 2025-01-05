import React, { useState, useEffect } from 'react';
import { useGetTasksQuery } from '../../features/api';
import { Link } from 'react-router-dom';

const StudentsTasks = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [classId, setClassId] = useState([]);

  useEffect(() => {
    const userClasses = JSON.parse(localStorage.getItem('classes')) || [];
    const classIds = userClasses.map((userClass) => userClass.id);
    console.log("Class IDs :", classIds);
    setClassId(classIds);
  }, []);

  const toggleAccordion = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const filteredTasks = tasks.filter((task) => {
    console.log(`Checking task classId: ${task.classId}, against user classId: ${classId}`);
    return classId.includes(task.classId);
  });

  if (isLoading) {
    return <div className="p-4 bg-gray-100 min-h-screen">Loading tasks...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen">
        Error loading tasks. Please try again later.
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return <div>No tasks available for your class.</div>;
  }

  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <div key={task.id}>
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleAccordion(task.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 mr-4">
                  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={30}>
                    <defs>
                      <style>
                        {`
          .cls-1 { fill: #40bdff; }
          .cls-2 { fill: #2197f7; }
          .cls-3 { fill: #effafe; }
          .cls-4 { fill: #e4ebed; }
          .cls-5 { fill: #263238; }
          .cls-6 { fill: #fd0; }
        `}
                      </style>
                    </defs>
                    <title>checklist job seeker employee unemployee work</title>
                    <path className="cls-1" d="M98.26,39.12V52.4A6.69,6.69,0,0,0,105,59.08h52.1a6.69,6.69,0,0,0,6.69-6.68V39.12a6.7,6.7,0,0,0-6.69-6.69,10.67,10.67,0,0,1-10.68-10.68V18.68A6.69,6.69,0,0,0,139.68,12H122.32a6.69,6.69,0,0,0-6.69,6.68v3.07A10.69,10.69,0,0,1,105,32.43,6.69,6.69,0,0,0,98.26,39.12Z"></path>
                    <path className="cls-2" d="M157.05,32.43a10.67,10.67,0,0,1-10.68-10.68V18.68A6.69,6.69,0,0,0,139.68,12h-8a6.69,6.69,0,0,1,6.69,6.68v3.07a10.67,10.67,0,0,0,10.68,10.68,6.7,6.7,0,0,1,6.69,6.69V52.4a6.69,6.69,0,0,1-6.69,6.68h8a6.69,6.69,0,0,0,6.69-6.68V39.12A6.7,6.7,0,0,0,157.05,32.43Z"></path>
                    <path className="cls-3" d="M63.31,244H197.69a8,8,0,0,0,8-8V55.76a8,8,0,0,0-8-8H164.74V52.4a10.7,10.7,0,0,1-10.69,10.68H102A10.7,10.7,0,0,1,91.26,52.4V47.76h-28a8,8,0,0,0-8,8V236A8,8,0,0,0,63.31,244ZM94.72,74.51a2,2,0,0,1,0,2.83l-20,20a2,2,0,0,1-2.83,0l-10-10a2,2,0,0,1,2.83-2.83l8.59,8.59L91.9,74.51A2,2,0,0,1,94.72,74.51Zm-30,40,8.59,8.59L91.9,104.51a2,2,0,0,1,2.83,2.83l-20,20a2,2,0,0,1-2.83,0l-10-10a2,2,0,0,1,2.83-2.83Zm0,30,8.59,8.59L91.9,134.51a2,2,0,0,1,2.83,2.83l-20,20a2,2,0,0,1-2.83,0l-10-10a2,2,0,0,1,2.83-2.83Zm0,30,8.59,8.59L91.9,164.51a2,2,0,0,1,2.83,2.83l-20,20a2,2,0,0,1-2.83,0l-10-10a2,2,0,0,1,2.83-2.83Zm0,29.92L73.31,213,91.9,194.43a2,2,0,0,1,2.83,2.83l-20,20a2,2,0,0,1-2.83,0l-10-10a2,2,0,0,1,2.83-2.83Zm128-116.51H108.26a2,2,0,0,1,0-4h84.43a2,2,0,0,1,0,4Zm-84.43,26h84.43a2,2,0,0,1,0,4H108.26a2,2,0,0,1,0-4Zm0,30h84.43a2,2,0,0,1,0,4H108.26a2,2,0,1,1,0-4Zm0,30h84.43a2,2,0,0,1,0,4H108.26a2,2,0,1,1,0-4Zm0,29.92h84.43a2,2,0,0,1,0,4H108.26a2,2,0,1,1,0-4Z"></path>
                    <path className="cls-4" d="M197.69,47.76h-5a8,8,0,0,1,8,8V236a8,8,0,0,1-8,8h5a8,8,0,0,0,8-8V55.76A8,8,0,0,0,197.69,47.76Z"></path>
                    <path className="cls-5" d="M136.68,7.5H119.32a11.2,11.2,0,0,0-11.19,11.18v3.07A6.19,6.19,0,0,1,102,27.93,11.18,11.18,0,0,0,90.76,39.12v4.14H58.31a12.51,12.51,0,0,0-12.5,12.5V236a12.51,12.51,0,0,0,12.5,12.5H197.69a12.51,12.51,0,0,0,12.5-12.5V55.76a12.51,12.51,0,0,0-12.5-12.5H165.24V39.12a11.2,11.2,0,0,0-11.19-11.19,6.17,6.17,0,0,1-6.18-6.18V18.68A11.2,11.2,0,0,0,136.68,7.5Zm28.56,44.9V48.26h32.45a7.51,7.51,0,0,1,7.5,7.5V236a7.51,7.51,0,0,1-7.5,7.5H58.31a7.51,7.51,0,0,1-7.5-7.5V55.76a7.51,7.51,0,0,1,7.5-7.5H90.76V52.4A11.2,11.2,0,0,0,102,63.58h52.1A11.2,11.2,0,0,0,165.24,52.4ZM154.05,32.93a6.2,6.2,0,0,1,6.19,6.19V52.4a6.19,6.19,0,0,1-6.19,6.18H102a6.19,6.19,0,0,1-6.19-6.18V39.12A6.19,6.19,0,0,1,102,32.93a11.19,11.19,0,0,0,11.18-11.18V18.68a6.19,6.19,0,0,1,6.19-6.18h17.36a6.19,6.19,0,0,1,6.19,6.18v3.07a11.17,11.17,0,0,0,11.18,11.18Z"></path>
                    <path className="cls-5" d="M91.54,74.15,73.31,92.38l-8.23-8.23a2.5,2.5,0,0,0-3.54,3.54l10,10a2.5,2.5,0,0,0,3.54,0l20-20a2.5,2.5,0,0,0-3.54-3.54Z"></path>
                    <path className="cls-5" d="M105.76,85.92a2.5,2.5,0,0,0,2.5,2.5h84.43a2.5,2.5,0,0,0,0-5H108.26A2.5,2.5,0,0,0,105.76,85.92Z"></path>
                    <path className="cls-5" d="M91.54,104.15,73.31,122.38l-8.23-8.23a2.5,2.5,0,1,0-3.54,3.54l10,10a2.5,2.5,0,0,0,3.54,0l20-20a2.5,2.5,0,1,0-3.54-3.54Z"></path>
                    <path className="cls-5" d="M192.69,113.42H108.26a2.5,2.5,0,0,0,0,5h84.43a2.5,2.5,0,0,0,0-5Z"></path>
                    <path className="cls-5" d="M91.54,134.15,73.31,152.38l-8.23-8.23a2.5,2.5,0,0,0-3.54,3.54l10,10a2.5,2.5,0,0,0,3.54,0l20-20a2.5,2.5,0,0,0-3.54-3.54Z"></path>
                    <path className="cls-5" d="M192.69,143.42H108.26a2.5,2.5,0,1,0,0,5h84.43a2.5,2.5,0,0,0,0-5Z"></path>
                    <path className="cls-5" d="M91.54,164.15,73.31,182.38l-8.23-8.23a2.5,2.5,0,0,0-3.54,3.54l10,10a2.5,2.5,0,0,0,3.54,0l20-20a2.5,2.5,0,0,0-3.54-3.54Z"></path>
                    <path className="cls-5" d="M192.69,173.42H108.26a2.5,2.5,0,1,0,0,5h84.43a2.5,2.5,0,0,0,0-5Z"></path>
                    <path className="cls-5" d="M91.54,194.07,73.31,212.3l-8.23-8.23a2.5,2.5,0,0,0-3.54,3.54l10,10a2.5,2.5,0,0,0,3.54,0l20-20a2.5,2.5,0,1,0-3.54-3.54Z"></path>
                    <path className="cls-5" d="M192.69,203.34H108.26a2.5,2.5,0,1,0,0,5h84.43a2.5,2.5,0,0,0,0-5Z"></path>
                    <path className="cls-1" d="M235,200.84h-4v-4a1,1,0,0,0-2,0v4h-4a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0v-4h4a1,1,0,0,0,0-2Z"></path>
                    <path className="cls-1" d="M182.75,34.68a6,6,0,1,1,6-6A6,6,0,0,1,182.75,34.68Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,182.75,24.68Z"></path>
                    <path className="cls-6" d="M230,89.42a6,6,0,1,1,6-6A6,6,0,0,1,230,89.42Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,230,79.42Z"></path>
                    <path className="cls-1" d="M39,154.35H36.41l1.83-1.83a1,1,0,0,0-1.41-1.41L35,152.94v-2.59a1,1,0,0,0-2,0v2.59l-1.83-1.83a1,1,0,0,0-1.41,1.41l1.83,1.83H23a1,1,0,0,0,0,2h4.74l-1.83,1.83a1,1,0,1,0,1.41,1.41l1.83-1.83V158a1,1,0,0,0,2,0v-4.74l1.83,1.83a1,1,0,0,0,1.41-1.41Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    {task.topic || 'No topic'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-8 items-center">
                <span className="text-sm text-gray-500">{task.createdAt}</span>
                <span className="text-sm text-gray-500">
                  {task.deadline
                    ? `Deadline: ${new Date(task.deadline).toLocaleString()}`
                    : 'No deadline'}
                </span>
                <i
                  className={`fas fa-chevron-down text-gray-500 transition-transform duration-300 ${expandedTaskId === task.id ? 'rotate-180' : ''
                    }`}
                ></i>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${expandedTaskId === task.id ? 'max-h-40' : 'max-h-0'
                }`}
            >
              <div className="p-4 bg-gray-50">
                <Link
                  to={`${task.id}`}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Details about task
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsTasks;
