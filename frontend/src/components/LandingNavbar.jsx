import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Award } from 'lucide-react';

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] border-b border-white/10' : 'bg-transparent py-7'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-accent-blue to-accent-purple p-2.5 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Award className="text-white" size={26} />
            </div>
            <span className="text-3xl font-[900] tracking-tighter text-white">
              Cert<span className="text-gradient">Tracker</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">How it Works</a>
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95">
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <a href="#features" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-white">Features</a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-white">How it Works</a>
          <div className="h-px w-full bg-white/10"></div>
          <Link to="/login" className="block text-lg font-medium text-white">Login</Link>
          <Link to="/register" className="block w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white py-4 rounded-2xl text-center font-bold">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
