import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTaskQuery } from "../../features/api";

const StudentTaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: task, isLoading, isError } = useGetTaskQuery(id);

    if (isLoading) {
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
        <>
            <div className="flex w-full flex-col bg-gray-50 h-screen p-4">
                <div className="flex items-center justify-between bg-gradient-to-b from-gray-700 to-blue-300 text-white px-4 py-2 rounded-t-lg">
                    <h1 className="text-lg font-bold">TASKS</h1>
                    <div className="flex items-center space-x-2">
                        <button
                            className="flex items-center text-sm hover:underline"
                            onClick={() => navigate(-1)}
                        >
                            <svg
                                width={20}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="fill-current mr-1"
                            >
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                            </svg>
                            Exit
                        </button>
                    </div>
                </div>


                <div className="flex-grow bg-white p-6 shadow rounded-b-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h2>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Description:</span>{" "}
                        {task.description || "No description available"}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Topic:</span> {task.topic || "No topic"}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Status:</span>{" "}
                        {task.status || "No status"}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Deadline:</span>{" "}
                        {task.deadline
                            ? new Date(task.deadline).toLocaleString()
                            : "No deadline"}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <span className="font-medium">Assigned Users:</span>{" "}
                        {task.assignedUsers && task.assignedUsers.length > 0
                            ? task.assignedUsers.join(", ")
                            : "No users assigned"}
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="border border-dashed border-gray-300 p-4 text-center">
                            + Prototype
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-gray-800 font-semibold">Comment</h3>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                            placeholder="Add a comment..."
                        />
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentTaskDetails;
