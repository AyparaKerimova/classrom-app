import React from "react";
import { Link } from "react-router-dom";

const StudentListModal = ({ children }) => {
  return (
    <>
      <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-full justify-center items-center">
        <div className="relative container m-auto px-6" style={{ width: "800px" }}>
          <div className="m-auto md:w-7/12">
            <div className="rounded-xl bg-white dark:bg-gray-800 shadow-xl">
              <div className="p-8">
                <div className="space-y-4 flex justify-between">
                  <h2 className="mb-8 text-2xl text-cyan-900 dark:text-white font-bold">
                    Invite new student
                  </h2>
                  <Link to={"/teachers"}><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path fill="#c4c0ce" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg></Link>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentListModal;
