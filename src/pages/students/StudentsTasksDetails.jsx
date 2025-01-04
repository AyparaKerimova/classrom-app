import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetTaskQuery,
  useGetUserByIdQuery,
  useGetAssignmentsByTaskIdQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useUpdateTaskAssignmentsMutation,
} from "../../features/api";

const StudentTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading, isError } = useGetTaskQuery(id);
  const { data: teacher, isLoading: teacherLoading } = useGetUserByIdQuery(task?.teacherId, {
    skip: !task?.teacherId,
  });
  const { data: assignments, isLoading: assignmentsLoading } = useGetAssignmentsByTaskIdQuery(task?.id, {
    skip: !task?.id,
  });

  const [assignmentsLink, setAssignmentsLink] = useState("");
  const [showAssignmentsForm, setShowAssignmentsForm] = useState(false);
  const [addAssignment, { isLoading: addAssignmentLoading }] = useAddAssignmentMutation();
  const [updateAssignment, { isLoading: updateAssignmentLoading }] = useUpdateAssignmentMutation();
  const [updateTaskAssignments] = useUpdateTaskAssignmentsMutation();
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setStudentId(user.id);
    }
  }, []);

  const handleAssignmentsClick = () => {
    setShowAssignmentsForm(true);
  };

  const handleSaveAssignments = async () => {
    if (!studentId || !task?.id) {
      console.error("Student ID or Task ID is missing");
      return;
    }

    try {
      const assignmentData = {
        taskId: task.id,
        studentId: studentId,
        url: assignmentsLink,
        assignDate: new Date().toISOString(),
        status: "unsubmitted",
        feedback: "",
      };

      await addAssignment(assignmentData).unwrap();
      Swal.fire("Success!", "Assignment added successfully.", "success");

      setShowAssignmentsForm(false);
      setAssignmentsLink("");
    } catch (error) {
      console.error("Error adding assignment:", error);
      Swal.fire("Error", "Could not add assignment.", "error");
    }
  };

  const handleUpdateStatus = async () => {
    if (!task?.id || !studentId) {
      console.error("Task ID or Student ID is missing");
      return;
    }

    const assignment = assignments?.find((a) => a.taskId === task.id && a.studentId === studentId);

    if (!assignment) {
      Swal.fire({
        title: "No assignment found",
        text: "Would you like to create a new assignment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const newAssignment = {
              taskId: task.id,
              studentId: studentId,
              url: "",
              assignDate: new Date().toISOString(),
              status: "unsubmitted",
              feedback: "",
            };
            await addAssignment(newAssignment).unwrap();

            const updatedAssignments = [...task.assignments, studentId];
            await updateTaskAssignments({ taskId: task.id, assignments: updatedAssignments }).unwrap();

            Swal.fire("Success!", "Assignment created successfully.", "success");
          } catch (error) {
            console.error("Error creating new assignment:", error);
            Swal.fire("Error", "Could not create assignment.", "error");
          }
        }
      });
      return;
    }

    const newStatus = assignment.status === "unsubmitted" ? "submit" : "unsubmitted";

    Swal.fire({
      title: `Are you sure you want to ${newStatus === "submit" ? "submit" : "unsubmit"} this task?`,
      text: `This action will ${newStatus === "submit" ? "mark the task as submitted" : "revert it to unsubmitted"}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateAssignment({ id: assignment.id, status: newStatus }).unwrap();

          if (newStatus === "submit") {
            const updatedAssignments = [...task.assignments, studentId];
            await updateTaskAssignments({ taskId: task.id, assignments: updatedAssignments }).unwrap();
          }
          else if (newStatus === "unsubmitted") {
            const updatedAssignments = task.assignments.filter(id => id !== studentId);
            await updateTaskAssignments({ taskId: task.id, assignments: updatedAssignments }).unwrap();
          }

          Swal.fire("Success!", `Assignment status updated to "${newStatus}".`, "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error", "Could not update assignment status.", "error");
        }
      }
    });
  };




  const isSubmitDisabled = () => {
    const assignment = assignments?.find((a) => a.taskId === task?.id && a.studentId === studentId);
    return assignment?.status === "submit";
  };

  const handleCancelAssignments = () => {
    setShowAssignmentsForm(false);
    setAssignmentsLink("");
  };

  const getButtonLabel = () => {
    const assignment = assignments?.find((a) => a.taskId === task?.id && a.studentId === studentId);
    return assignment?.status === "submit" ? "Unsubmit" : "Submit";
  };

  if (isLoading || teacherLoading || assignmentsLoading || addAssignmentLoading || updateAssignmentLoading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (isError) {
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
          Exit
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Description:</span> {task.description || "No description available"}
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
          <span className="font-medium">Assigned Teacher:</span> {teacher ? teacher.fullName : "No teacher assigned"}
        </p>
        <button
          onClick={handleUpdateStatus}
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 mt-4"
        >
          {getButtonLabel()}
        </button>
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
            disabled={isSubmitDisabled()}
            className={`bg-blue-400 text-white px-4 py-2 rounded ${isSubmitDisabled() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
              }`}
          >
            + Add Assignments
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentTaskDetails;
