import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);
  const teacherId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!teacherId) return;

    fetch("https://fish-distinct-divan.glitch.me/assignments")
      .then((response) => response.json())
      .then((data) => {
        fetch("https://fish-distinct-divan.glitch.me/users")
          .then((response) => response.json())
          .then((usersData) => {
            setUsers(usersData);

            const teacherStudents = usersData.filter(
              (user) => user.role === "student"
            );

            const studentIds = teacherStudents.map((student) => student.id);
            console.log("Student IDs:", studentIds);

            const filteredAssignments = data.filter((assignment) =>
              studentIds.includes(assignment.studentId)
            );

            setAssignments(filteredAssignments);
          })
          .catch((error) => console.error("Error fetching users:", error));
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [teacherId]);

  const getStudentFullName = (studentId) => {
    const student = users.find((user) => user.id === studentId);
    return student ? student.fullName : "Unknown Student";
  };

  return (
    <>
    <Helmet>
          <title>Assignments</title>
      </Helmet>
    <div className="bg-gray-100 min-h-screen py-8">
      <ul className="overflow-hidden rounded-md w-full">
        {assignments.map((assignment) => (
          <li key={assignment.id} style={{ width: "80vw" }} className="mx-5 shadow font-normal mt-2 rounded-lg border">
            <div className="px-6 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Assignment #{assignment.id}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Added by: {getStudentFullName(assignment.studentId)}
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
                <Link to={`/teachers/add-grade/${assignment.id}`} className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-500">
                  Add Grade
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Assignments;
