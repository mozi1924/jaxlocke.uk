import React, { useRef, useState } from 'react';
import { Twitter, Instagram, Mail, Youtube, Download } from 'lucide-react';

export const SocialCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto aspect-[1.58/1]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
        className="relative w-full h-full transition-transform duration-200 ease-out preserve-3d group cursor-pointer"
      >
        {/* Front of Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#201f35] to-[#1a192e] border border-[#38303f] rounded-xl overflow-hidden shadow-2xl shadow-[#3f89fc]/10">
          
          {/* Holographic/Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tighter text-white mb-1">
                  JAX<span className="text-[#3f89fc]">LOCKE</span>
                </h1>
                <p className="text-zinc-400 text-xs md:text-sm tracking-widest uppercase border-l-2 border-[#3f89fc] pl-3">
                  3D Character Artist & Rigger
                </p>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#38303f] group-hover:border-[#3f89fc] transition-colors">
                 <img src="/assets/avatar.webp" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex gap-1 flex-wrap text-xs text-zinc-500 font-mono">
                  <span className="bg-[#38303f] px-2 py-1 rounded border border-[#201f35]">MAYA</span>
                  <span className="bg-[#38303f] px-2 py-1 rounded border border-[#201f35]">BLENDER</span>
                  <span className="bg-[#38303f] px-2 py-1 rounded border border-[#201f35]">ZBRUSH</span>
                  <span className="bg-[#38303f] px-2 py-1 rounded border border-[#201f35]">UE5</span>
               </div>
            </div>

            <div className="flex justify-between items-end border-t border-[#38303f] pt-6">
               <div className="flex gap-4">
                  <a href="#" className="text-zinc-400 hover:text-white hover:scale-110 transition-transform"><Twitter size={20} /></a>
                  <a href="#" className="text-zinc-400 hover:text-white hover:scale-110 transition-transform"><Youtube size={20} /></a>
                  <a href="#" className="text-zinc-400 hover:text-white hover:scale-110 transition-transform"><Instagram size={20} /></a>
                  <a href="mailto:jax@arasaka.ltd" className="text-zinc-400 hover:text-white hover:scale-110 transition-transform"><Mail size={20} /></a>
               </div>
               <div className="text-right">
                 <p className="text-[10px] text-zinc-600 font-mono">ID: 8492-AX</p>
                 <p className="text-[10px] text-zinc-600 font-mono">LONDON, UK</p>
               </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3f89fc]/10 blur-3xl -z-10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#402424]/30 blur-3xl -z-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};