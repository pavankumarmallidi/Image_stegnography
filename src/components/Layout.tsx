import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <Lock className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  SteganoHide
                </span>
                <span className="text-sm text-gray-400 group-hover:text-primary/80 transition-colors">
                  SteganoTool
                </span>
              </div>
            </Link>

            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-colors hover:text-white relative ${
                    location.pathname === item.path 
                      ? 'text-white font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {children}
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-white" />
              <span className="text-white font-bold">SteganoHide</span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} SteganoHide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;