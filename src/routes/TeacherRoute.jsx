import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeachersLayout from '../components/teachers/TeachersLayout';
import TeacherProfile from '../pages/teachers/TeacherProfile';
import TeachersTasks from '../pages/teachers/TeachersTasks';
import AllStudents from '../pages/teachers/AllStudents';
import TeacherDashboard from '../pages/teachers/TeacherDashboard';
import TeacherEditPage from '../pages/teachers/TeacherEditPage';
import AddTask from '../pages/teachers/AddTask';
import EditTask from '../pages/teachers/EditTask';
import TeacherMeet from '../pages/teachers/TeacherMeet';
import TeacherMaterials from '../pages/teachers/TeacherMaterials';
import AddMaterials from '../pages/teachers/AddMaterials';
import Assignments from '../pages/teachers/Assignments';
import AddGrade from '../pages/teachers/AddGrade';

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
        <Route path="edit-task/:id" element={<EditTask/>}/>
        <Route path="teachers-meet" element={<TeacherMeet/>}/>
        <Route path="teachers-materials/:teacherId/:classId" element={<TeacherMaterials/>} />
        <Route path="add-material/:teacherId/:classId" element={<AddMaterials/>}/>
        <Route path="assignments/:taskId/:studentId" element={<Assignments/>}/>
        <Route path="add-grade/:id" element={<AddGrade/>}/>
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
