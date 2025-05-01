
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Helper to determine if link is active
  const isActive = (path: string) => location.pathname === path;

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!currentUser) return "/";
    
    switch(currentUser.role) {
      case "student": return "/student-dashboard";
      case "admin": return "/admin-dashboard";
      case "ngo": return "/ngo-dashboard";
      default: return "/";
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-campus-orange to-campus-light-orange flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="font-bold text-xl hidden sm:block">Campus Cravings</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`font-medium ${isActive('/') ? 'text-campus-orange' : 'text-gray-600 hover:text-campus-orange'}`}
          >
            Home
          </Link>
          
          {currentUser ? (
            <>
              <Link 
                to={getDashboardPath()} 
                className={`font-medium ${isActive(getDashboardPath()) ? 'text-campus-orange' : 'text-gray-600 hover:text-campus-orange'}`}
              >
                Dashboard
              </Link>
              <Button 
                onClick={() => logout()} 
                variant="outline" 
                className="border-campus-orange text-campus-orange hover:bg-campus-orange hover:text-white"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`font-medium ${isActive('/login') ? 'text-campus-orange' : 'text-gray-600 hover:text-campus-orange'}`}
              >
                Log In
              </Link>
              <Link to="/register">
                <Button className="bg-campus-orange hover:bg-campus-light-orange">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className={`font-medium p-2 ${isActive('/') ? 'text-campus-orange' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to={getDashboardPath()} 
                  className={`font-medium p-2 ${isActive(getDashboardPath()) ? 'text-campus-orange' : 'text-gray-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  variant="outline" 
                  className="border-campus-orange text-campus-orange hover:bg-campus-orange hover:text-white"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`font-medium p-2 ${isActive('/login') ? 'text-campus-orange' : 'text-gray-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="bg-campus-orange hover:bg-campus-light-orange w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
