import { Link } from "react-router-dom";
import { useState } from "react";
import pokeball from '../assets/pokeball.png'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 w-full h-16 p-4 fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Logo placeholder */}
          <img src={pokeball} className="w-8 h-8" />
          <h1 className="text-gray-100 text-xl font-semibold select-none">Poke Api Challenge</h1>
        </div>
        <ul className="hidden md:flex space-x-4 text-gray-300">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><Link to="/edicion" className="hover:text-white transition-colors">Edición</Link></li>
          <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
        </ul>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="mt-2 space-y-2 text-gray-300">
          <li><Link to="/" className="block hover:text-white transition-colors">Home</Link></li>
          <li><Link to="/login" className="block hover:text-white transition-colors">Login</Link></li>
          <li><Link to="/edicion" className="block hover:text-white transition-colors">Edición</Link></li>
        </ul>
      </div>
    </nav>
  );
}