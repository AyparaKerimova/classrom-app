import React from 'react';
import { useGetTasksQuery } from '../../features/api';

const StudentsTasks = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

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
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">React</h1>
      <div className="bg-white shadow-md rounded-lg">
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              {/* İkon */}
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 mr-4">
                  <i className="fas fa-clipboard"></i>
                </div>
                {/* Başlıq */}
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.topic || 'No topic'}</p>
                </div>
              </div>
              {/* Növ və Tarix */}
              <div className="text-sm text-gray-500">
                {task.type || 'Type unknown'}
              </div>
              <div className="text-sm text-gray-500">
                {task.deadline
                  ? `Deadline: ${new Date(task.deadline).toLocaleString()}`
                  : 'No deadline'}
              </div>
              {/* Üç nöqtəli menyu */}
              <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsTasks;