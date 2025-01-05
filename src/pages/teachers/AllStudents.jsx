import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../../components/teachers/StudentCard";
import StudentListModal from "../../components/teachers/StudentListModal";
import StudentList from "../../components/teachers/StudentList";
import { BASE_API_URL } from "../../constants/api.js";

const AllStudents = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allStudents, setAllStudents] = useState([]);

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    async function fetchStudents() {
      const resp = await fetch(BASE_API_URL + "/users");
      const result = await resp.json();
      const filteredStudents = result.filter((user) => user.role === "student");
      setAllStudents(filteredStudents);
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const classId = user?.classes ? user.classes[0]?.id : null;

    if (classId) {
      fetch(`http://localhost:3000/classes/${classId}`)
        .then((response) => response.json())
        .then((classData) => {
          const studentIds = classData.studentIds || [];
          Promise.all(
            studentIds.map((id) =>
              fetch(`http://localhost:3000/users/${id}`).then((res) => res.json())
            )
          ).then((studentsData) => setStudents(studentsData));
        })
        .catch((error) => console.error("Error fetching className:", error));
    }
  }, []);

  const handleInvite = async (studentId) => {
    const invitation = {
      id: `inv_${Date.now()}`,
      classId,
      studentId,
      status: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
    };

    await fetch("http://localhost:3000/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invitation),
    });

    alert(`Invitation sent to student ID: ${studentId}`);
  };

  return (
    <div className="all-students">
      <h1 className="text-center text-3xl font-light">Students in {classId} class</h1>
      <div className="relative inline-flex group">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <button
          onClick={openModal}
          className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ms-8"
        >
          Invite
        </button>
      </div>
      {isModalOpen && (
        <StudentListModal>
          <StudentList students={allStudents} onInvite={handleInvite} />
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
          </button>
        </StudentListModal>
      )}
      <div className="h-full flex w-full justify-center dark:bg-gray-800 p-2">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              username={student.username || student.userName}
              img={student.profileImage}
              fullName={student.fullName}
              overallGrade={student.overallGrade}
              percentage={student.overallGrade}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
