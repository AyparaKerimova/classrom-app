import { Route, Routes, Navigate } from "react-router-dom";
import TeacherRoute from "./routes/TeacherRoute";
import StudentRoute from "./routes/StudentRoute";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated") || "false");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (role && user.role !== role) {
      return <Navigate to={`/${user.role === 'teacher' ? '/teachers' : '/students'}`} />;
    }
    return children;
  };

  return (
    <HelmetProvider>
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            user.role === "teacher" ? <Navigate to="/teachers" /> : <Navigate to="/students" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/teachers/*"
        element={
          <ProtectedRoute role="teacher">
            <TeacherRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/*"
        element={
          <ProtectedRoute role="student">
            <StudentRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login />
          ) : user.role === "teacher" ? (
            <Navigate to="/teachers" />
          ) : (
            <Navigate to="/students" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <Register />
          ) : user.role === "teacher" ? (
            <Navigate to="/teachers" />
          ) : (
            <Navigate to="/students" />
          )
        }
      />
    </Routes>
    </HelmetProvider>
  );
}

export default App;