import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokeball from '../assets/pokeball.png'

// Funcion para verificar si el usuario esta autenticado (basado en el localStorage)
export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Funcion para cerrar la sesion (elimina el indicador de autenticacion del localStorage)
export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};

export default function Navbar() {
  // Estados locales
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // Navegador de React Router
  const navigate = useNavigate();

  // useEffect para los cambios en el almacenamiento local y actualizar el estado de autenticacion
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

    window.addEventListener('storage', checkAuthStatus);
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, [isLoggedIn]);

  // Funcion para alternar la visibilidad del menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Funcion para manejar el cierre de sesion
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    // Contenedor principal
    <nav className="bg-white shadow-lg fixed w-full top-0 select-none">
      <div className="w-full px-2 md:px-16 lg:px-32">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src={pokeball}
                alt="Logo de Pokeball"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <h1 className="text-black text-xl font-semibold mr-4">Poke API Challenge</h1> {/* Título del sitio */}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Menu de navegación */}
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Inicio
              </Link>
              <Link
                to="/edicion"
                className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Edición
              </Link>
              {!isLoggedIn ? (
                // Si no esta autenticado, mostrar el enlace de login
                <Link
                  to="/login"
                  className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Iniciar sesión
                </Link>) : (
                // Si esta autenticado, mostrar el boton de logout
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Cerrar sesión
                </button>)
              }
            </div>

          </div>
          {/* Boton para desplegar menu */}
          <div className="-mr-2 flex md:hidden text-black">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono */}
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-black text-center hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
            >
              Inicio
            </Link>
            <Link
              to="/edicion"
              className="text-black text-center hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
            >
              Edición
            </Link>
            {!isLoggedIn && (
              // Si no esta autenticado, mostrar el enlace de login
              <Link
                to="/login"
                className="text-black text-center hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Iniciar sesión
              </Link>
            )}
            {isLoggedIn && (
              // Si esta autenticado, mostrar el boton de logout
              <button
                onClick={handleLogout}
                className="text-white text-center bg-red-500 hover:bg-red-600 hover:text-white block w-full px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
