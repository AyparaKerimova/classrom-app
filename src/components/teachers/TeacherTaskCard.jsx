import React from "react";
import { Link } from "react-router-dom";

const TeacherTaskCard = ({title,description,deadline,deleteTask,id}) => {
  return (
    <>
      <div className="px-4 py-4 mx-5 font-normal bg-gray-300 rounded-lg">
        <div className="flex flex-col justify-between md:flex-row">
            <h1 className="mb-2 text-semibold">
                {title}
            </h1>
          <div className="flex items-center mb-2 space-x-2 ms-2">
            <button onClick={deleteTask} className="px-2 text-gray-200 bg-red-600 rounded">Delete</button>
            <Link to={`/teachers/edit-task/${id}`} className="px-2 text-gray-800 bg-blue-400 rounded">
              edit
            </Link>
          </div>
        </div>
        <h3 className="mb-2 ">
            {description}
          </h3>
        <p className="text-gray-700">
          Deadline: {deadline}
        </p>
      </div>
    </>
  );
};

export default TeacherTaskCard;
