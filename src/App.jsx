import { Route, Routes } from "react-router-dom"
import TeacherRoute from "./routes/TeacherRoute"
import StudentRoute from "./routes/StudentRoute"

function App() {

  return (
    <>
      <Routes> 
        <Route path="/teachers/*" element={<TeacherRoute/>}/>
        <Route path="/students/*" element={<StudentRoute/>}/>
      </Routes>
    </>
  )
}

export default App
