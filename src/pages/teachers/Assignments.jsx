import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const teacherId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (!teacherId) return;
  
    fetch("http://localhost:3000/assignments")
      .then(response => response.json())
      .then(data => {
        fetch("http://localhost:3000/users")
          .then(response => response.json())
          .then(users => {
            const teacherStudents = users.filter(user => user.role === "student");
  
            const studentIds = teacherStudents.map(student => student.id);
            console.log("Student IDs:", studentIds);
  
            const filteredAssignments = data.filter(assignment =>
              studentIds.includes(assignment.studentId)
            );
  
            setAssignments(filteredAssignments);
          })
          .catch(error => console.error("Error fetching users:", error));
      })
      .catch(error => console.error("Error fetching assignments:", error));
  }, [teacherId]);
  

  return (
    <div className="bg-gray-100 min-h-screen py-8">
  <ul className="bg-white shadow overflow-hidden rounded-md w-full">
    {assignments.map((assignment) => (
      <li key={assignment.id} className="border-t border-gray-200 w-full">
        <div className="px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Assignment #{assignment.id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Added by: {assignment.studentId}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Status:{" "}
              <span
                className={
                  assignment.status === "submitted"
                    ? "text-green-600"
                    : assignment.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {assignment.status}
              </span>
            </p>
            <a
              href={assignment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500 ms-4"
            >
              View
            </a>
            <button className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-500">
              Add Grade
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Assignments;
