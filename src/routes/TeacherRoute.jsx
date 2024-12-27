import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TeachersLayout from '../components/teachers/TeachersLayout'
import TeacherDashboard from '../pages/teachers/TeacherDashboard'
import TeachersTasks from '../pages/teachers/TeachersTasks'

const TeacherRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<TeachersLayout/>}>
            <Route index element={<TeacherDashboard/>}/>
            <Route path='teachers-tasks' element={<TeachersTasks/>}/>
        </Route>
    </Routes>
  )
}

export default TeacherRoute