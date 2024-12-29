import React, { useState } from 'react';
import { useGetTasksQuery } from '../../features/api';

const StudentsTasks = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

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

  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id}>
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleAccordion(task.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 mr-4">
                  <i className="fas fa-clipboard"></i>
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
                  className={`fas fa-chevron-down text-gray-500 transition-transform duration-300 ${
                    expandedTaskId === task.id ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedTaskId === task.id ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="p-4 bg-gray-50">
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Details about task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsTasks;
