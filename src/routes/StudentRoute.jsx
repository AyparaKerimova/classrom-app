import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentsLayout from '../components/students/StudentsLayout'
import StudentDashboard from '../pages/students/StudentDashboard'
import Tasks from '../pages/students/StudentsTasks'

const StudentRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<StudentsLayout/>}>
            <Route index element={<StudentDashboard/>}/>
            <Route path='students-tasks' element={<Tasks/>}/>
        </Route>
    </Routes>
  )
}

export default StudentRoute