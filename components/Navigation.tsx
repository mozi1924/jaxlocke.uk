import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Home, Image, Layers, User, Camera, Box, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

const navItems: { id: SectionId; label: string; icon: any }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: Image },
  { id: 'projects', label: 'WIP', icon: Layers },
  { id: 'oc', label: 'OCs', icon: User },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'rigs', label: 'Rigs', icon: Box },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Floating Dock */}
      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex gap-2 p-2 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-zinc-900/80 backdrop-blur-md border border-zinc-800 shadow-2xl' : 'bg-transparent'}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
              ${activeSection === item.id 
                ? 'bg-fuchsia-600 text-white scale-110 shadow-lg shadow-fuchsia-900/50' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }
            `}
          >
            <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 2} />
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black text-xs px-2 py-1 rounded border border-zinc-800 text-zinc-300 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:hidden bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <span className="font-display font-bold text-xl tracking-tighter">JAX<span className="text-fuchsia-500">LOCKE</span></span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-zinc-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950 md:hidden flex flex-col items-center justify-center space-y-8 pt-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-2xl font-display font-bold uppercase tracking-widest ${activeSection === item.id ? 'text-fuchsia-500' : 'text-zinc-500'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};