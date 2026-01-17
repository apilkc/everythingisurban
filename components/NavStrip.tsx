import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'READS', id: 'reads' },
  { label: 'WRITINGS', id: 'writings' },
  { label: 'SHELF', id: 'shelf' },
  { label: 'GALLERY', id: 'gallery' },
  { label: 'LAB', id: 'lab' },
  { label: 'VLOG', id: 'vlog' },
  { label: 'CONTACT', id: 'contact' },
];

const NavStrip: React.FC = () => {
  const [activeTab, setActiveTab] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentId = '';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentId = item.id;
          }
        }
      }
      if (currentId) setActiveTab(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  return (
    <div className="sticky top-6 z-50 w-full flex justify-center pointer-events-none px-4">
      <motion.div 
        className="pointer-events-auto relative flex items-center gap-1 md:gap-3 p-1.5 md:p-2.5 bg-urban-white/90 dark:bg-urban-black/90 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-2xl rounded-full max-w-full overflow-x-auto no-scrollbar"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setOpacity(0)}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Flashlight Effect */}
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-200 hidden md:block"
          style={{
            opacity,
            background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 42, 0, 0.15), transparent 100%)`
          }}
        />

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative px-4 py-2 md:px-8 md:py-3 rounded-full outline-none transition-colors z-10 whitespace-nowrap flex-shrink-0"
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-urban-black dark:bg-urban-white rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <span 
              className={`relative z-20 font-mono text-[10px] md:text-xs font-bold tracking-wider transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'text-urban-white dark:text-urban-black' 
                  : 'text-urban-black/60 dark:text-urban-white/60 hover:text-urban-black dark:hover:text-urban-white'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default NavStrip;