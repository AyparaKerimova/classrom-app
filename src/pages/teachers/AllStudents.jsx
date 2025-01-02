import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../../components/teachers/StudentCard";

const AllStudents = () => {
  const { teacherId, classId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const classId = user?.classes ? user.classes[0]?.id : null;

    if (classId) {
      fetch(`http://localhost:3000/classes/${classId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("className not found");
        })
        .then((classData) => {
          console.log("className data:", classData);

          const studentIds = classData.studentIds;

          Promise.all(
            studentIds.map((id) =>
              fetch(`http://localhost:3000/users/${id}`).then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(`User with id ${id} not found`);
              })
            )
          )
            .then((studentsData) => {
              console.log("Students data:", studentsData);
              setStudents(studentsData);
            })
            .catch((error) => {
              console.error("Error fetching students:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching className:", error);
        });
    } else {
      console.error("No valid classId found");
    }
  }, []);

  return (
    <div className="all-students">
      <h1 className="text-center text-3xl font-light">
        Students in {classId} class
      </h1>
      <div class="relative inline-flex  group">
        <div
            class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <a href="#" title="Get quote now"
            class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ms-8"
            role="button">Invite
        </a>
    </div>
      <div className="h-full flex w-full justify-center dark:bg-gray-800 p-2">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
          {students.map((student) => {
            return (
              <StudentCard
                username={student.username || student.userName}
                img={student.profileImage}
                fullName={student.fullName}
                overallGrade={student.overallGrade}
                percentage={student.overallGrade}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
