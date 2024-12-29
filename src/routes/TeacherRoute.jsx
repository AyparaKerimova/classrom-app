import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeachersLayout from '../components/teachers/TeachersLayout';
import TeacherProfile from '../pages/teachers/TeacherProfile';
import TeachersTasks from '../pages/teachers/TeachersTasks';
import AllStudents from '../pages/teachers/AllStudents';
import TeacherDashboard from '../pages/teachers/TeacherDashboard';

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<TeachersLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="teachers-profile/:teacherId" element={<TeacherProfile />} />
        <Route path="teachers-tasks/:teacherId/:classId" element={<TeachersTasks />} />
        <Route path="all-students/:teacherId/:classId" element={<AllStudents />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
