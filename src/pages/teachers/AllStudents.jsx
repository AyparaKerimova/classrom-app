import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../../components/teachers/StudentCard";
import StudentListModal from "../../components/teachers/StudentListModal";
import StudentList from "../../components/teachers/StudentList";
import { BASE_API_URL } from "../../constants/api";
import { Helmet } from "react-helmet-async";


const AllStudents = () => {
  const { classId: routeClassId } = useParams();
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [classId, setClassId] = useState(routeClassId || null);

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    async function fetchAllStudents() {
      try {
        const response = await fetch(`${BASE_API_URL}/users`);
        const result = await response.json();
        const filteredStudents = result.filter((user) => user.role === "student");
        setAllStudents(filteredStudents);
      } catch (error) {
        console.error("Error fetching all students:", error);
      }
    }
    fetchAllStudents();
  }, []);

  useEffect(() => {
    async function fetchClassStudents() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const storedClassId = user?.classes ? user.classes[0]?.id : null;

        const activeClassId = routeClassId || storedClassId;
        setClassId(activeClassId);

        if (activeClassId) {
          const classResponse = await fetch(`${BASE_API_URL}/classes/${activeClassId}`);
          if (!classResponse.ok) throw new Error("Class not found");
          const classData = await classResponse.json();

          const studentIds = classData.studentIds || [];
          const studentPromises = studentIds.map((id) =>
            fetch(`${BASE_API_URL}/users/${id}`).then((res) => {
              if (!res.ok) throw new Error(`Student with ID ${id} not found`);
              return res.json();
            })
          );
          const studentsData = await Promise.all(studentPromises);
          setStudents(studentsData);
        }
      } catch (error) {
        console.error("Error fetching class students:", error);
      }
    }
    fetchClassStudents();
  }, [routeClassId]);

  const handleInvite = async (studentId) => {
    const invitation = {
      id: `inv_${Date.now()}`,
      classId,
      studentId,
      status: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    try {
      const response = await fetch(`${BASE_API_URL}/invitations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitation),
      });

      if (response.ok) {
        alert(`Invitation sent to student ID: ${studentId}`);
      } else {
        console.error("Failed to send invitation.");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <>
      <Helmet>
          <title>All Students</title>
      </Helmet>
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
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
        </StudentListModal>
      )}
      <div className="h-full flex w-full justify-center p-2">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              username={student.username || student.userName}
              img={student.profileImage}
              fullName={student.fullName}
              overallGrade={student.overallGrade}
              percentage={student.overallGrade}
              email={student.email}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default AllStudents;
