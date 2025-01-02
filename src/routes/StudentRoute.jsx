import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentsLayout from '../components/students/StudentsLayout'
import StudentDashboard from '../pages/students/StudentDashboard'
import StudentsTasks from '../pages/students/StudentsTasks'
import StudentProfile from '../pages/students/StudentProfile'
import StudentTaskDetails from '../pages/students/StudentsTasksDetails'
import StudentMaterials from '../pages/students/StudentMaterials'

const StudentRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<StudentsLayout/>}>
            <Route index element={<StudentDashboard/>}/>
            <Route path='student-profile' element={<StudentProfile/>}/>
            <Route path='students-tasks' element={<StudentsTasks/>}/>
            <Route path='students-tasks/:id' element={<StudentTaskDetails/>}/>
            <Route path='students-materials' element={<StudentMaterials/>}/>
        </Route>
    </Routes>
  )
}

export default StudentRoute