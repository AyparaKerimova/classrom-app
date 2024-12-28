import React, { useEffect, useState } from 'react';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
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
      <h1>{teacher.fullName}'s Profile</h1>
      <img src={teacher.profileImage} alt={teacher.fullName} />
      <p>{teacher.bio}</p>
      <p>Email: {teacher.email}</p>
    </div>
  );
};

export default TeacherProfile;
