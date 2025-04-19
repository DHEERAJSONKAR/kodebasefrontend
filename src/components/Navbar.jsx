import React, { useState, useEffect } from 'react'
import logo from "../images/logos/logo.png"
import { Link, useLocation } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // Update monaco editor theme if it exists
      const monacoEditor = document.querySelector('.monaco-editor');
      if (monacoEditor) {
        monacoEditor.setAttribute('data-theme', 'vs-dark');
      }
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      // Update monaco editor theme if it exists
      const monacoEditor = document.querySelector('.monaco-editor');
      if (monacoEditor) {
        monacoEditor.setAttribute('data-theme', 'light');
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src={logo} 
              className="w-[200px] md:w-[250px] object-contain py-2 transform hover:scale-110 transition-all duration-300 hover:brightness-110 hover:drop-shadow-[0_0_35px_rgba(59,_130,_246,_0.6)]" 
              alt="Logo" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`relative text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>

            <Link 
              to="/about" 
              className={`relative text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/about' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>

            <Link 
              to="/services" 
              className={`relative text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/services' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>

            <Link 
              to="/contact" 
              className={`relative text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/contact' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 relative group"
            >
              {isDarkMode ? 
                <FaSun className="w-5 h-5 relative z-10" /> : 
                <FaMoon className="w-5 h-5 relative z-10" />
              }
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full filter blur-md transform scale-125 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_5px_15px_rgba(239,_68,_68,_0.5)]"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-300 hover:text-yellow-400 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <FaSun className="w-5 h-5" /> : 
                <FaMoon className="w-5 h-5" />
              }
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0d1117] border-t border-gray-800/50">
            <Link 
              to="/" 
              className={`relative block text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>
            <Link 
              to="/about" 
              className={`relative block text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/about' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>
            <Link 
              to="/services" 
              className={`relative block text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/services' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>
            <Link 
              to="/contact" 
              className={`relative block text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 ${
                location.pathname === '/contact' ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
              <div className="absolute inset-0 h-full w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(59,_130,_246,_0.5)]"></div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-white bg-red-500 hover:bg-red-600 py-2 px-3 rounded-md text-base font-medium transition-all duration-300 hover:shadow-[0_5px_15px_rgba(239,_68,_68,_0.5)] transform hover:translate-x-1"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar