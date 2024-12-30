import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TeachersTasks = () => {
  const { teacherId, classId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const classId = user?.classes ? user.classes[0]?.id : c1;

    if (classId) {
      fetch(`http://localhost:3000/tasks`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Tasks not found");
        })
        .then((tasksData) => {
          console.log("Tasks data:", tasksData);
          setTasks(tasksData);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    } else {
      console.error("No valid classId found");
    }
  }, []);

  return (
    <div className="all-tasks">
      <h1 className="text-center text-3xl font-thin">
        Tasks for {classId} cass
      </h1>
      <div className="relative inline-flex  group">
        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Link
          to={`/teachers/add-task/${teacherId}/${classId}`}
          className="relative mt-3 px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          role="button"
        >
          {" "}
          Add new task
        </Link>
      </div>
      <div className="h-full flex w-full justify-center items-center dark:bg-gray-800 p-2">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                className="task-card p-4 bg-gray-700 text-white rounded-lg"
              >
                <p className="mt-2">{task.title}</p>
                <p className="mt-2">Due Date:{ moment(task.deadline).format("MMM Do YY")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeachersTasks;
