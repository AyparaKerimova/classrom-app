import { Route, Routes, Navigate } from "react-router-dom";
import TeacherRoute from "./routes/TeacherRoute";
import StudentRoute from "./routes/StudentRoute";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import { useState } from "react";
import { createContext } from "react";

export const ContentContext = createContext();

function App() {
  const [content,setContent]=useState(null)
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const data = {
    content,setContent
  }
  return (
    <>
    <ContentContext.Provider value={data}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/students" /> : <Navigate to="/login" />} />
        
        <Route path="/teachers/*" element={<TeacherRoute />} />
        <Route path="/students/*" element={<StudentRoute />} />
        
        <Route path="/login" element={isAuthenticated ? <Navigate to="/students" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/students" /> : <Register />} />
      </Routes>
      </ContentContext.Provider>
    </>
  );
}

export default App;
