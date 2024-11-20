import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokeball from '../assets/pokeball.png'

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

    window.addEventListener('storage', checkAuthStatus);
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, [isLoggedIn]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 select-none">
      <div className="w-full px-2 md:px-16 lg:px-32">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src={pokeball}
                alt="pokeball"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <h1 className="text-black text-xl font-semibold mr-4">Poke API Challenge</h1>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
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
                <Link
                  to="/login"
                  className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Iniciar sesión
                </Link>) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Cerrar sesión
                </button>)
              }
            </div>

          </div>
          <div className="-mr-2 flex md:hidden text-black">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
              <Link
                to="/login"
                className="text-black text-center hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Iniciar sesión
              </Link>
            )}
            {isLoggedIn && (
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