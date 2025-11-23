import React from 'react';
import { Sun, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center space-x-2">
                <div className="bg-primary-600 p-1.5 rounded-full">
                  <Sun className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">
                  Aswin<span className="text-primary-400">Solar</span>
                </span>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               Empowering homes and businesses with sustainable energy solutions through advanced technology and expert consultancy.
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">Products</Link></li>
              <li><Link to="/projects" className="hover:text-primary-400 transition-colors">Projects</Link></li>
              <li><Link to="/quote" className="hover:text-primary-400 transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Residential Solar</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Commercial Solutions</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Battery Storage</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">EV Charging</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                <span>1234 Sunbeam Blvd,<br/>Austin, TX 78701</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <span>(555) 987-6543</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <span>hello@aswinsolar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aswin Solar Consultants. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
          <Link to="/admin" className="text-gray-700 text-xs hover:text-gray-500 mt-4 md:mt-0">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;