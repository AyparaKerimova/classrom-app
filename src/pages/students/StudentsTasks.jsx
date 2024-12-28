import React from 'react';
import { useGetTasksQuery } from '../../features/api'; 

const StudentsTasks = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery(); 

  if (isLoading) {
    return <div className="p-4 bg-gray-100 min-h-screen">Loading tasks...</div>;
  }

  if (isError) {
    return <div className="p-4 bg-gray-100 min-h-screen">Error loading tasks. Please try again later.</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-gray-600 mt-2">
              <strong>Topic:</strong> {task.topic}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Completion Rate:</strong> {task.completionRate}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsTasks;

