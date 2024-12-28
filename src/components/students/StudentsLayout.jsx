import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentsSidebar from './StudentsSidebar'

const StudentsLayout = () => {
  return (
    <>
    <StudentsSidebar/>     
    <Outlet/>
    </>
  )
}

export default StudentsLayout