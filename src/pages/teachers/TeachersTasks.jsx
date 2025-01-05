import DOMPurify from "dompurify";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeacherTaskCard from "../../components/teachers/TeacherTaskCard";
import Swal from "sweetalert2";

const TeachersTasks = () => {
  const { teacherId, classId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const classId = user?.classes ? user.classes[0]?.id : c1;

    if (classId) {
      fetch(`https://fish-distinct-divan.glitch.me/tasks`)
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

  function handleDeleteTask(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://fish-distinct-divan.glitch.me/tasks/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
            } else {
              throw new Error("Failed to delete task");
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "There was an error deleting the task.", "error");
            console.error("Error deleting task:", error);
          });
      }
    });
  }

  return (
    <div className="all-tasks">
      <h1 className="text-center text-3xl font-light">
        Tasks for {classId} class
      </h1>
      <div className="relative inline-flex group">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Link
          to={`/teachers/add-task/${teacherId}/${classId}`}
          className="relative mt-3 px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ms-12"
          role="button"
        >
          Add new task
        </Link>
      </div>
      <div className="h-full flex flex-col w-full items-center p-2">
        <div className="grid gap-8 p-4 md:p-2 xl:p-5">
          {tasks.map((task) => {
            const cleanDescription = DOMPurify.sanitize(task.description);
            return (
              <TeacherTaskCard
                key={task.id}
                title={task.title}
                description={
                  <div
                    dangerouslySetInnerHTML={{ __html: cleanDescription }}
                  ></div>
                }
                deadline={moment(task.deadline).format("MMM Do YY")}
                deleteTask={() => handleDeleteTask(task.id)}
                id={task.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeachersTasks;
