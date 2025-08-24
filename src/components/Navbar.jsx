import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="./news-logo.png"
                alt="News App"
                className="h-8 lg:h-10 md:h-9 sm:h-8"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-4">
              <NavLink
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/About"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/About")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                About
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t sm:px-3">
            <NavLink
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/About"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive("/About")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
