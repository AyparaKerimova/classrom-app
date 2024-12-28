import { Route, Routes, Navigate } from "react-router-dom";
import TeacherRoute from "./routes/TeacherRoute";
import StudentRoute from "./routes/StudentRoute";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/students" /> : <Navigate to="/login" />} />
        
        <Route path="/teachers/*" element={<TeacherRoute />} />
        <Route path="/students/*" element={<StudentRoute />} />
        
        <Route path="/login" element={isAuthenticated ? <Navigate to="/students" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/students" /> : <Register />} />
      </Routes>

    </>
  );
}

export default App;
