import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentsLayout from '../components/students/StudentsLayout'
import StudentDashboard from '../pages/students/StudentDashboard'
import StudentsTasks from '../pages/students/StudentsTasks'
import StudentProfile from '../pages/students/StudentProfile'

const StudentRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<StudentsLayout/>}>
            <Route index element={<StudentDashboard/>}/>
            <Route path='students-tasks' element={<StudentsTasks/>}/>
            <Route path='student-profile' element={<StudentProfile/>}/>
        </Route>
    </Routes>
  )
}

export default StudentRoute