import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { SocialCard } from './components/SocialCard';
import { Gallery } from './components/Gallery';
import { RigList } from './components/RigList';
import { SectionId, Project, Rig } from './types';
import { ArrowDown } from 'lucide-react';

// Mock Data
const PORTFOLIO_ITEMS: Project[] = [
  { id: '1', title: 'Neon Samurai', category: 'Portfolio', imageUrl: 'https://picsum.photos/600/800?random=1', tags: ['Character', 'Cyberpunk', 'Maya'] },
  { id: '2', title: 'Forest Spirit', category: 'Portfolio', imageUrl: 'https://picsum.photos/800/600?random=2', tags: ['Creature', 'Organic', 'ZBrush'] },
  { id: '3', title: 'Mecha Unit 01', category: 'Portfolio', imageUrl: 'https://picsum.photos/600/600?random=3', tags: ['Hard Surface', 'Mecha', 'Substance'] },
  { id: '4', title: 'Space Explorer', category: 'Portfolio', imageUrl: 'https://picsum.photos/600/900?random=4', tags: ['Scifi', 'Cloth Sim'] },
  { id: '5', title: 'Ancient Dragon', category: 'Portfolio', imageUrl: 'https://picsum.photos/800/400?random=5', tags: ['Creature', 'Fantasy'] },
  { id: '6', title: 'Stylized Girl', category: 'Portfolio', imageUrl: 'https://picsum.photos/500/500?random=6', tags: ['Stylized', 'Handpaint'] },
];

const OC_ITEMS: Project[] = [
  { id: 'oc1', title: 'Project: VANTAGE', category: 'OC', imageUrl: 'https://picsum.photos/500/700?random=10', description: 'Original character design for a personal graphic novel project.', tags: ['OC', 'Concept'] },
  { id: 'oc2', title: 'Kael', category: 'OC', imageUrl: 'https://picsum.photos/500/500?random=11', tags: ['OC', 'Portrait'] },
  { id: 'oc3', title: 'Unit 734', category: 'OC', imageUrl: 'https://picsum.photos/700/500?random=12', tags: ['Robot', 'Design'] },
  { id: 'oc4', title: 'Wasteland Drifter', category: 'OC', imageUrl: 'https://picsum.photos/600/800?random=13', tags: ['Post-Apoc', 'Character'] },
];

const PHOTO_ITEMS: Project[] = [
  { id: 'p1', title: 'Tokyo Nights', category: 'Personal', imageUrl: 'https://picsum.photos/600/400?random=20', tags: ['Photography', 'Travel'] },
  { id: 'p2', title: 'Studio Vibes', category: 'Personal', imageUrl: 'https://picsum.photos/400/600?random=21', tags: ['Workspace'] },
  { id: 'p3', title: 'Abstract Light', category: 'Personal', imageUrl: 'https://picsum.photos/500/500?random=22', tags: ['Abstract'] },
];

const WIP_ITEMS: Project[] = [
  { id: 'w1', title: 'Unannounced Game Asset', category: 'WIP', imageUrl: 'https://picsum.photos/800/500?random=30', tags: ['NDA', 'Environment'] },
  { id: 'w2', title: 'Anatomy Study', category: 'WIP', imageUrl: 'https://picsum.photos/500/500?random=31', tags: ['Study', 'ZBrush'] },
];

const RIGS: Rig[] = [
  {
    id: 'r1',
    name: 'Basic Biped 2.0',
    thumbnail: 'https://picsum.photos/600/400?random=40',
    description: 'A versatile bipedal rig perfect for body mechanics practice. Includes IK/FK switching and stretchy limbs.',
    software: 'Maya 2023+',
    price: '0',
    downloadUrl: '#',
    features: ['IK/FK Switching', 'Stretchy Limbs', 'Scalable', 'Picker GUI included']
  },
  {
    id: 'r2',
    name: 'Toon Cat Rig',
    thumbnail: 'https://picsum.photos/600/400?random=41',
    description: 'High flexibility quadruped rig with expressive facial features. Great for squash and stretch animation.',
    software: 'Blender 4.0',
    price: '15.00',
    downloadUrl: '#',
    features: ['Face Board', 'Squash & Stretch', 'Tail Controls', 'Auto-Breathing']
  },
  {
    id: 'r3',
    name: 'Combat Droid',
    thumbnail: 'https://picsum.photos/600/400?random=42',
    description: 'Production ready mechanical rig with complex piston systems and weapon switching.',
    software: 'Maya 2023+',
    price: '25.00',
    downloadUrl: '#',
    features: ['Weapon System', 'Piston Automation', 'Game Ready Skeleton', 'LODs included']
  }
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    const sections = ['home', 'portfolio', 'projects', 'oc', 'photos', 'rigs'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#201f35] text-stone-200 selection:bg-[#3f89fc] selection:text-white">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="container mx-auto px-4 md:px-8 pb-32">
        
        {/* HERO / HOME SECTION */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center relative py-20">
           <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
              <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
                 <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter leading-none">
                    DIGITAL <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3f89fc] to-[#81b1ff]">SCULPTOR</span>
                 </h1>
                 <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-lg mx-auto lg:mx-0">
                    Bringing characters to life through precision rigging and expressive modeling.
                 </p>
                 <button 
                   onClick={() => scrollToSection('portfolio')}
                   className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-[#3f89fc] pb-1 hover:text-[#3f89fc] transition-colors"
                 >
                   View Selected Works <ArrowDown className="animate-bounce" size={16}/>
                 </button>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center">
                 <SocialCard />
              </div>
           </div>
           
           {/* Background Deco */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-w-none md:max-w-full bg-[#3f89fc]/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
           <div className="absolute bottom-0 right-0 w-[400px] h-[400px] max-w-none md:max-w-full bg-[#402424]/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="min-h-screen">
          <Gallery items={PORTFOLIO_ITEMS} title="PORTFOLIO" subtitle="Selected commercial and personal high-end works." gridCols={3} />
        </section>

        {/* PROJECTS / WIP SECTION */}
        <section id="projects" className="py-20">
          <Gallery items={WIP_ITEMS} title="IN PROGRESS" subtitle="Current explorations and unfinished business." gridCols={2} />
        </section>

        {/* OC SECTION */}
        <section id="oc" className="py-20">
           <Gallery items={OC_ITEMS} title="ORIGINALS" subtitle="Original Characters & World building." gridCols={3} />
        </section>

        {/* PERSONAL PHOTOS */}
        <section id="photos" className="py-20">
           <Gallery items={PHOTO_ITEMS} title="CAPTURES" subtitle="Life through a lens. Photography & mood." gridCols={3} />
        </section>

        {/* RIGS DOWNLOAD */}
        <section id="rigs" className="min-h-[80vh] flex flex-col justify-center border-t border-[#38303f] mt-20">
          <RigList rigs={RIGS} />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#38303f] pt-12 pb-12 md:pb-32 text-center text-zinc-500 text-sm font-mono transition-all duration-300">
        <p>&copy; {new Date().getFullYear()} Jax Locke. All rights reserved.</p>
        <p className="mt-2">Made with React & Tailwind.</p>
      </footer>
    </div>
  );
}

export default App;