import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// Proteccion de ruta con requerimiento de autenticacion
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;