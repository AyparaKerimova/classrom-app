import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AllStudents = () => {
  const { teacherId, classId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const classId = user?.classes ? user.classes[0]?.id : null; 
    
    if (classId) {
      fetch(`http://localhost:3000/classes/${classId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Class not found');
        })
        .then((classData) => {
          console.log('Class data:', classData);

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
              console.log('Students data:', studentsData);
              setStudents(studentsData);
            })
            .catch((error) => {
              console.error('Error fetching students:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching class:', error);
        });
    } else {
      console.error('No valid classId found');
    }
  }, []);

  if (!students.length) return <div>No students found.</div>;

  return (
    <div className="all-students">
      <h1>Students in Class {classId}</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h3>{student.fullName}</h3>
            <p>Email: {student.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllStudents;
