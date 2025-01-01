import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTaskQuery, useGetUserByIdQuery, useAddAssignmentMutation } from "../../features/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StudentTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading, isError } = useGetTaskQuery(id);
  const { data: teacher, isLoading: teacherLoading, isError: teacherError } =
    useGetUserByIdQuery(task?.teacherId, {
      skip: !task?.teacherId,
    });

  const [comment, setComment] = useState("");
  const [assignmentsLink, setAssignmentsLink] = useState("");
  const [showAssignmentsForm, setShowAssignmentsForm] = useState(false);
  const [addAssignment, { isLoading: addAssignmentLoading }] = useAddAssignmentMutation();

  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user) {
      setStudentId(user.id); 
    }
  }, []);

  const handleAddComment = () => {
    console.log("Comment added:", comment);
    setComment("");
  };

  const handleAssignmentsClick = () => {
    setShowAssignmentsForm(true);
  };

  const handleSaveAssignments = async () => {
    if (!studentId) {
      console.log("Student ID is missing");
      return;
    }

    try {
      const assignmentData = {
        taskId: task.id,
        studentId: studentId, 
        url: assignmentsLink,
        assignDate: new Date().toLocaleString(),
        status: "unsubmitted",
        feedback: "Great effort! Improve presentation next time.",
      };
      await addAssignment(assignmentData).unwrap();
      setShowAssignmentsForm(false);
      setAssignmentsLink("");
      console.log("Assignments Link:", assignmentsLink);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const handleCancelAssignments = () => {
    setShowAssignmentsForm(false);
    setAssignmentsLink("");
  };

  if (isLoading || teacherLoading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (isError || teacherError) {
    return <div className="p-4 text-red-500">Error loading task details</div>;
  }

  if (!task) {
    return (
      <div className="p-4 bg-gray-100">
        <p className="text-gray-700">No task details available.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-gray-50 min-h-screen p-6">
      <div className="bg-gradient-to-b from-gray-700 to-blue-300 text-white px-6 py-3 rounded-lg shadow mb-6 flex justify-between items-center">
        <h1 className="text-lg font-bold">Task Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
        >
          <svg
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-current mr-2"
          >
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
          Exit
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Description:</span>{" "}
          {task.description || "No description available"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Topic:</span> {task.topic || "No topic"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Status:</span> {task.status || "No status"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Deadline:</span>{" "}
          {task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Assigned Teacher:</span>{" "}
          {teacher ? teacher.fullName : "No teacher assigned"}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Assignments</h3>
        {showAssignmentsForm ? (
          <div>
            <label className="block mb-3">
              Link:
              <input
                type="url"
                value={assignmentsLink}
                onChange={(e) => setAssignmentsLink(e.target.value)}
                placeholder="Enter link"
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </label>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveAssignments}
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Save
              </button>
              <button
                onClick={handleCancelAssignments}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAssignmentsClick}
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            + Add Assignments
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        <ReactQuill
          value={comment}
          onChange={setComment}
          placeholder="Add your comment..."
          className="mb-4"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default StudentTaskDetails;
