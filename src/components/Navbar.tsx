import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 w-full p-4">
      <ul className="flex justify-center space-x-4 text-white">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/edicion">Edición</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;