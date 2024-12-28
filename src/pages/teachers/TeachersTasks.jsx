import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TeachersTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const taskId = user?.taskId || 't1';  // Get taskId from localStorage or fallback
  const classId = user?.classes?.[0]?.id || 'defaultClassId';  // Get classId from localStorage or fallback

  // Debugging
  console.log('taskId:', taskId);
  console.log('classId:', classId);

  useEffect(() => {
    if (classId && taskId) {
      // Fetch tasks for the given classId and taskId
      fetch(`http://localhost:3000/classes/${classId}/tasks/${taskId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Task not found');
        })
        .then((data) => {
          setTasks(data);
          console.log('Fetched tasks:', data);
        })
        .catch((error) => {
          console.error(error);
          alert('Error: ' + error.message);
        });
    } else {
      console.error('No valid classId or taskId found');
    }
  }, [classId, taskId]);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersTasks;
