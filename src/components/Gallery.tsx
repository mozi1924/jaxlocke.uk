import React, { useState } from 'react';
import { Project } from '../types';
import { Maximize2, X } from 'lucide-react';

interface GalleryProps {
  items: Project[];
  gridCols?: 2 | 3 | 4;
}

export const Gallery: React.FC<GalleryProps> = ({ items, gridCols = 3 }) => {
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);

  // Map gridCols prop to Tailwind columns classes
  const columnsClass = {
    2: 'lg:columns-2',
    3: 'lg:columns-3',
    4: 'lg:columns-4',
  }[gridCols];

  return (
    <div className="w-full py-12">


      {/* Masonry Layout using CSS Columns */}
      <div className={`columns-1 md:columns-2 ${columnsClass} gap-6`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-lg bg-[#38303f] shadow-lg hover:shadow-[#3f89fc]/20 transition-all duration-300"
            onClick={() => setSelectedItem(item)}
          >
            {/* Image Wrapper */}
            <div className="relative w-full">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
                loading="lazy"
              />

              {/* Overlay - Correctly positioned absolute to the image wrapper */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#201f35]/95 via-[#201f35]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-xl font-bold text-white font-display uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h4>
                <div className="flex gap-2 mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.tags?.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider bg-[#3f89fc]/20 text-[#3f89fc] px-2 py-1 rounded border border-[#3f89fc]/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-[#201f35]/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 text-zinc-500 hover:text-white p-2 z-50"
          >
            <X size={32} />
          </button>

          <div className="max-w-7xl max-h-[90vh] w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center bg-[#38303f]/50 rounded-lg overflow-hidden relative">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </div>
            <div className="flex flex-col justify-center text-left">
              <span className="text-[#3f89fc] font-mono text-sm mb-2">{selectedItem.category}</span>
              <h2 className="text-4xl font-display font-bold text-white mb-6 uppercase">{selectedItem.title}</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                {selectedItem.description || "No description provided for this project. This is a placeholder for where the artist would describe the technical challenges, software used, and inspiration behind this specific piece of work."}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags?.map(tag => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-[#38303f] text-zinc-300 px-3 py-1.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};