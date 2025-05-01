
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Logo and about */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-campus-orange to-campus-light-orange flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-xl">Campus Cravings</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting college canteens with students and NGOs to minimize food waste and maximize impact.
            </p>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-campus-orange">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-campus-orange">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-campus-orange">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-campus-orange">
                  About Food Waste
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-campus-orange">
                  NGO Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-campus-orange">
                  Campus Programs
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> info@campuscravings.ai
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Phone:</span> (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Campus Cravings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
