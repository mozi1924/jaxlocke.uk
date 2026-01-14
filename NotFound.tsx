import React from 'react';
import { Navigation } from './components/Navigation';
import { SectionId } from './types';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const scrollToSection = (id: SectionId) => {
    window.location.href = `/#${id}`;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#201f35] text-stone-200 selection:bg-[#3f89fc] selection:text-white flex flex-col">
      <Navigation 
        activeSection={null as unknown as SectionId} 
        scrollToSection={scrollToSection} 
      />

      <main className="container mx-auto px-4 md:px-8 flex-grow flex flex-col items-center justify-center text-center space-y-6">
         <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-[#3f89fc]">404</h1>
         <h2 className="text-2xl md:text-4xl font-light">Page Not Found</h2>
         <p className="text-zinc-400 max-w-md">
            The coordinate you are looking for does not exist in this sector.
         </p>
         <a 
           href="/"
           className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-[#3f89fc] pb-1 hover:text-[#3f89fc] transition-colors"
         >
           <ArrowLeft size={16}/> Return to Base
         </a>
      </main>

      <footer className="border-t border-[#38303f] pt-12 pb-12 md:pb-32 text-center text-zinc-500 text-sm font-mono transition-all duration-300">
        <p>&copy; {new Date().getFullYear()} Jax Locke. All rights reserved.</p>
        <p className="mt-2">Made with React & Tailwind.</p>
      </footer>
    </div>
  );
}
