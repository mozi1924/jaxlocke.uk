import React from 'react';
import { Rig } from '../types';
import { Download, Check, DollarSign, Box } from 'lucide-react';

interface RigListProps {
  rigs: Rig[];
}

export const RigList: React.FC<RigListProps> = ({ rigs }) => {
  return (
    <div className="py-12">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">PUBLIC <span className="text-fuchsia-500">RIGS</span></h2>
        <p className="text-zinc-400">
          Professional quality rigs for animation practice, student films, and commercial projects. 
          Tested in Maya and Blender.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rigs.map((rig) => (
          <div key={rig.id} className="group relative bg-zinc-900 border border-zinc-800 hover:border-fuchsia-500/50 transition-colors rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="aspect-video bg-zinc-800 relative overflow-hidden">
               <img 
                 src={rig.thumbnail} 
                 alt={rig.name}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-zinc-700 flex items-center gap-1">
                 {rig.price === '0' ? 'FREE' : `$${rig.price}`}
               </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{rig.name}</h3>
                  <p className="text-xs text-fuchsia-400 font-mono mt-1">{rig.software}</p>
                </div>
                <Box className="text-zinc-600 group-hover:text-fuchsia-500 transition-colors" />
              </div>

              <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                {rig.description}
              </p>

              <div className="mt-auto">
                <ul className="space-y-2 mb-6">
                  {rig.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                      <Check size={12} className="text-fuchsia-500" /> {feature}
                    </li>
                  ))}
                </ul>

                <a 
                  href={rig.downloadUrl}
                  className="flex items-center justify-center gap-2 w-full bg-zinc-100 hover:bg-fuchsia-500 text-zinc-900 hover:text-white font-bold py-3 rounded-lg transition-all duration-300"
                >
                  <Download size={18} />
                  <span>DOWNLOAD</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};