import React, { useState, useEffect } from 'react';
import { Home, Image, Layers, User, Camera, Box, Menu, X } from 'lucide-react';

// Map IDs to paths
const pathMap: Record<string, string> = {
  'home': '/',
  'portfolio': '/portfolio',
  'projects': '/projects',
  'oc': '/ocs',
  'photos': '/photos',
  'rigs': '/rigs',
};

interface NavigationProps {
  activeSection: string; // Now this will be passed from the page or determined by URL
  scrollToSection: (id: string) => void; // Deprecated but kept for compatibility types if needed, or we remove it
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'portfolio', label: 'Portfolio', icon: Image, path: '/portfolio' },
  { id: 'projects', label: 'WIP', icon: Layers, path: '/projects' },
  { id: 'oc', label: 'OCs', icon: User, path: '/ocs' },
  { id: 'photos', label: 'Photos', icon: Camera, path: '/photos' },
  { id: 'rigs', label: 'Rigs', icon: Box, path: '/rigs' },
];

export const Navigation: React.FC<any> = ({ activeSection: initialActive, pathname = '/' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const normalize = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p;

  const isActive = (path: string) => {
    const curr = normalize(currentPath);
    const target = normalize(path);

    if (target === '/' && curr === '/') return true;
    if (target !== '/' && curr.startsWith(target)) return true;
    return false;
  };

  const isHome = normalize(currentPath) === '/';
  const showBackground = !isHome || scrolled;

  return (
    <>
      {/* Desktop Floating Dock */}
      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex gap-2 p-2 rounded-2xl transition-all duration-300 ${showBackground ? 'bg-[#201f35]/80 backdrop-blur-md border border-[#38303f] shadow-2xl' : 'bg-transparent'}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className={`
              relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
              ${isActive(item.path)
                ? 'bg-[#3f89fc] text-white scale-110 shadow-lg shadow-[#3f89fc]/50'
                : 'text-zinc-400 hover:text-white hover:bg-[#38303f]/50'
              }
            `}
            aria-label={item.label}
          >
            <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-[#201f35] text-xs px-2 py-1 rounded border border-[#38303f] text-zinc-300 whitespace-nowrap">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:hidden bg-[#201f35]/90 backdrop-blur-md border-b border-[#38303f]">
        <a href="/" className="font-display font-bold text-xl tracking-tighter">JAX<span className="text-[#3f89fc]">LOCKE</span></a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-zinc-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#201f35] md:hidden flex flex-col items-center justify-center space-y-8 pt-16">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-display font-bold uppercase tracking-widest ${isActive(item.path) ? 'text-[#3f89fc]' : 'text-zinc-500'}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};