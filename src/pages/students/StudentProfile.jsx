import React, { useEffect, useState } from 'react';
import StudentProfileCard from '../../components/students/StudentProfileCard';

const StudentProfile = () => {
  const [student, setStudent] = useState({});
  const studentId = JSON.parse(localStorage.getItem("user")).id;
  console.log(studentId);
  
  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:3000/users/${studentId}`)
        .then(response => response.json())
        .then(data => setStudent(data));
      console.log(studentId);
    } else {
      console.error('Student ID is not found in localStorage!');
    }
  }, [studentId]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="teacher-profile">
      <StudentProfileCard 
        profileImage={student.profileImage} 
        fullName={student.fullName} 
        email={student.email} 
        major={student.major} 
        overallGrade={student.overallGrade}
      />
    </div>
  );
};

export default StudentProfile;