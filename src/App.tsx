import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePokemon from "./pages/CreatePokemon";
import Navbar from "./components/Navbar";
// Auth
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/edicion"
          element={
            <ProtectedRoute>
              <CreatePokemon />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
