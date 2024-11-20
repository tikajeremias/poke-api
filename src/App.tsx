// React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import EditCreate from "./pages/EditCreate";
import Navbar from "./components/Navbar";
// Auth
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      {/* La navbar general para toda la app */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Ruta protegida para acceso exclusivo con autenticacion */}
        <Route path="/edicion" element={
          <ProtectedRoute>
            <EditCreate />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
