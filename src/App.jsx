import { Route, Routes } from "react-router-dom"
import TeacherRoute from "./routes/TeacherRoute"
import StudentRoute from "./routes/StudentRoute"
import Login from "./pages/common/Login"
import Register from "./pages/common/Register"

function App() {

  return (
    <>
      <Routes> 
        <Route path="/teachers/*" element={<TeacherRoute/>}/>
        <Route path="/students/*" element={<StudentRoute/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
