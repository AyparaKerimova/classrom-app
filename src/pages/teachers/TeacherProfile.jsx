import React, { useEffect, useState } from 'react';
import TeacherProfileCard from '../../components/teachers/TeacherProfileCard';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState({});
  const teacherId = JSON.parse(localStorage.getItem("user")).id;
  console.log(teacherId);
  
  useEffect(() => {
    if (teacherId) {
      fetch(`http://localhost:3000/users/${teacherId}`)
        .then(response => response.json())
        .then(data => setTeacher(data));
        console.log(teacherId);
        
    } else {
      console.error('Teacher ID is not found in localStorage!');
    }
  }, [teacherId]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="teacher-profile">
      <TeacherProfileCard fullName={teacher.fullName} img={teacher.profileImage} email={teacher.email} major={teacher.major} bio={teacher.bio} socialLinks={teacher.socialLinks?.linkedIn} socialLinks2={teacher.socialLinks?.socialLinks2}/>
    </div>
  );
};

export default TeacherProfile;
