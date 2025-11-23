import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Menu, X, MessageSquare, Calculator } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Calculator', path: '/calculator' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-600 p-2 rounded-full group-hover:bg-primary-500 transition-colors">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-800 tracking-tight">
              Aswin<span className="text-primary-600">Solar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive(link.path) ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
             <Link to="/consultant">
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/consultant') 
                  ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <MessageSquare className="w-4 h-4" />
                <span>AI Consultant</span>
              </button>
            </Link>
            <Link to="/quote">
              <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                <Calculator className="w-4 h-4" />
                <span>Get Quote</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/consultant"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 bg-primary-50 mt-2"
              >
                AI Consultant
              </Link>
            <Link
              to="/quote"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-5 py-3 rounded-lg font-bold text-white bg-primary-600 hover:bg-primary-700"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;