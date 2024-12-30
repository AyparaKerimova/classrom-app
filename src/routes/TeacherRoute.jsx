import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeachersLayout from '../components/teachers/TeachersLayout';
import TeacherProfile from '../pages/teachers/TeacherProfile';
import TeachersTasks from '../pages/teachers/TeachersTasks';
import AllStudents from '../pages/teachers/AllStudents';
import TeacherDashboard from '../pages/teachers/TeacherDashboard';
import TeacherEditPage from '../pages/teachers/TeacherEditPage';
import AddTask from '../pages/teachers/AddTask';

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<TeachersLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="teachers-profile/:teacherId" element={<TeacherProfile />} />
        <Route path="teachers-tasks/:teacherId/:classId" element={<TeachersTasks />} />
        <Route path="all-students/:teacherId/:classId" element={<AllStudents />} />
        <Route path="teachers-edit/:teacherId" element={<TeacherEditPage/>}/>
        <Route path="add-task/:teacherId/:classId" element={<AddTask/>}/>
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
