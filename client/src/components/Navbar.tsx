import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-teal-400">UserCRUD</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-teal-400 transition-colors duration-200">Home</Link>
            <Link to="/add-user" className="hover:text-teal-400 transition-colors duration-200">Add User</Link>
            <Link to="/users" className="hover:text-teal-400 transition-colors duration-200">User List</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
