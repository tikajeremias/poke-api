import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Component() {
    // Navegacion
    const navigate = useNavigate();
    // Estados locales
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({ email: false, password: false });

    // Manejo del inicio de sesion
    const handleLogin = () => {
        // Obtener los usuarios almacenados en localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user: any) => user.email === email);

        // Error si no se encuentra el usuario o si la contraseña no coincide
        if (!user) {
            setError("El usuario no está registrado.");
            return;
        }
        if (user.password !== password) {
            setError("Contraseña incorrecta.");
            return;
        }

        // Marcar al usuario como autenticado
        localStorage.setItem("isAuthenticated", "true");
        window.dispatchEvent(new Event('storage'));

        // Navegacion al home
        navigate("/");
    };

    // Manejo del registro de usuario
    const handleRegister = () => {
        // Obtener los usuarios existentes
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        // Verificar si el email ya esta registrado
        const userExists = users.some((user: any) => user.email === email);

        // Error si el usuario ya existe
        if (userExists) {
            setError("El usuario ya está registrado.");
            return;
        }

        // Crea un nuevo usuario
        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Cambiar a modo de inicio de sesión
        setIsRegister(false);
        alert("Usuario registrado exitosamente.");
    };

    // Manejo del envio del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (isRegister) {
            // Llamar al manejo de registro si esta en modo de registro
            handleRegister();
        } else {
            // Llamar al manejo de inicio de sesion si esta en modo de inicio de sesion
            handleLogin();
        }
    };

    // Validaciones de los campos
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Valida el formato del email
    const isPasswordValid = password.length >= 3; // Valida que la contraseña tenga al menos 3 caracteres

    return (
        <div className="h-full flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">

            {/* Contenedor principal */}
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isRegister ? "Crea tu cuenta" : "Inicia sesión"}
                    </h2>
                </div>

                {/* Formulario */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">

                        {/* Campo de email */}
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="text-black appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm rounded-b-md"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched({ ...touched, email: true })}
                            />
                        </div>

                        {/* Campo de contraseña */}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="text-black appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm rounded-b-md"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                            />
                        </div>

                    </div>

                    {/* Mensaje de error */}
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Boton de accion */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            {isRegister ? "Registrar" : "Iniciar sesión"}
                        </button>
                    </div>

                </form>

                {/* Boton para alternar entre signup y signin*/}
                <div className="text-sm text-center">
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                    </button>
                </div>

            </div>
        </div>
    );
}
