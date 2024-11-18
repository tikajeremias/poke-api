import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false); // Alternar entre login y registro
    const [error, setError] = useState("");

    // Manejar el login
    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user: any) => user.email === email);

        if (!user) {
            setError("El usuario no está registrado.");
            return;
        }

        if (user.password !== password) {
            setError("Contraseña incorrecta.");
            return;
        }

        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
    };

    // Manejar el registro
    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.some((user: any) => user.email === email);

        if (userExists) {
            setError("El usuario ya está registrado.");
            return;
        }

        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setIsRegister(false); // Volver al login después de registrarse
        alert("Usuario registrado exitosamente.");
    };

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (isRegister) {
            handleRegister();
        } else {
            handleLogin();
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{isRegister ? "Registro" : "Login"}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border"
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="p-2 bg-blue-500 text-white">
                    {isRegister ? "Registrar" : "Iniciar sesión"}
                </button>
                <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-blue-500"
                >
                    {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </button>
            </form>
        </div>
    );
};

export default Login;