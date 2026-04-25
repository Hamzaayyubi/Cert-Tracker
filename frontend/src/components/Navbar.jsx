import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react';

/**
 * Navbar component
 * Uses dark.surface background, bottom border with dark.border,
 * and integrates the dark mode toggle.
 */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-dark-surface/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Nav Links */}
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
              <span className="bg-primary group-hover:bg-primary-hover text-white p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-text-primary">
                CertTracker
              </span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center ml-8 space-x-1">
                <Link
                  to="/dashboard"
                  className="text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Theme Toggle + User */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-text-muted hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-3 border-l border-gray-200 dark:border-dark-border pl-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-text-primary">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-500 dark:text-text-muted hover:text-red-500 dark:hover:text-red-400 p-2 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-gray-500 dark:text-text-muted hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-text-secondary hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && user && (
        <div className="md:hidden border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface px-4 py-4 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-dark-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-base">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-text-primary">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-text-muted">{user.email}</p>
            </div>
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
