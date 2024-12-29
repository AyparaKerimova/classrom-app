import React from "react";

const StudentProfileCard = ({
  profileImage,
  fullName,
  email,
  major,
  overallGrade
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ml-10">
      <div className="font-std w-full max-w-4xl rounded-2xl bg-white p-10 md:p-14 font-normal leading-relaxed text-gray-900 shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src={profileImage}
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
            />
            <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
              Edit Profile
            </button>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-2xl font-bold text-indigo-800 mb-2">{fullName}</h1>
            <p className="text-gray-600 mb-6">{major}</p>

            <h2 className="text-xl font-semibold text-indigo-800 mb-4">
              Contact Information
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {email}
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-800 mt-6 mb-4">
              Overall Grade
            </h2>
            <p className="text-gray-700">{overallGrade}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
