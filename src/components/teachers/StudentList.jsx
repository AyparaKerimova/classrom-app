import React from "react";

const StudentList = ({ students, onInvite }) => {
  return (
    <>
      <div
        className="mt-10 grid space-y-4 overflow-y-auto"
        style={{ height: "200px" }}
      >
        {students.map((student) => (
          <div
            key={student.id}
            className="group h-12 px-6 border-2 border-gray-300 rounded-full"
          >
            <div className="relative flex items-center space-x-4 justify-between">
              <img
                src={student.profileImage}
                className="w-8 h-8 rounded-full"
                alt={student.fullName}
              />
              <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm sm:text-base">
                {student.fullName}
              </span>
              <button
                onClick={() => onInvite(student.id)}
                className="h-10 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Invite
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentList;
