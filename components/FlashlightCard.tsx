import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Printer, Share2, ZoomIn, Maximize2, ExternalLink, ArrowDown, Newspaper, PenTool } from 'lucide-react';
import type { UpdateCardProps } from '../types';
import { writings } from '../data/notes/index';

interface CardProps {
  item: UpdateCardProps;
  onOpen: (item: UpdateCardProps, mode: 'quick' | 'full') => void;
}

export const FullNoteView: React.FC<{ item: UpdateCardProps; onClose: () => void }> = ({ item, onClose }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-urban-white dark:bg-urban-black flex flex-col"
    >
      <div className="fixed top-0 left-0 h-1 bg-urban-red z-[110] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      
      <header className="p-6 md:px-12 flex justify-between items-center border-b border-black/10 dark:border-white/10 relative z-10 bg-urban-white dark:bg-urban-black">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] bg-urban-black text-white dark:bg-white dark:text-black px-2 py-0.5 uppercase">Archive Ref: {item.id.toUpperCase()}</span>
          <h2 className="font-black uppercase text-sm md:text-lg tracking-tight hidden md:block">{item.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"><Printer size={18} /></button>
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"><Share2 size={18} /></button>
          <button 
            onClick={onClose}
            className="ml-4 flex items-center gap-2 px-4 py-2 bg-urban-red text-white font-mono text-xs uppercase hover:brightness-110 transition-all"
          >
            Close Document <X size={16} />
          </button>
        </div>
      </header>

      <div onScroll={handleScroll} className="flex-1 overflow-y-auto flex flex-col items-center py-16 px-6">
        <article className="max-w-[70ch] w-full space-y-12">
          <div className="space-y-4">
            <div className="flex gap-2">
              <span className="font-mono text-[10px] text-urban-red border border-urban-red/20 px-2 py-0.5">{item.category}</span>
              {item.tags?.map(t => <span key={t} className="font-mono text-[10px] opacity-40 px-2 py-0.5">#{t}</span>)}
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
              {item.title}
            </h1>
            <div className="font-mono text-sm opacity-50 border-y border-black/10 dark:border-white/10 py-4">
              DATE FILED: {item.date}
            </div>
          </div>

          <div className="font-serif text-lg md:text-2xl leading-[1.7] text-urban-black/90 dark:text-urban-white/90 space-y-8">
            {(item.content || item.description).split('\n\n').map((para, i) => (
              <p key={i} className={i === 0 ? "first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:uppercase" : ""}>
                {para}
              </p>
            ))}
          </div>

          <div className="pt-16 pb-24 border-t border-dashed border-black/20 text-center">
             <span className="font-mono text-xs opacity-30">// END OF TRANSMISSION</span>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export const QuickNoteModal: React.FC<{ item: UpdateCardProps; onClose: () => void }> = ({ item, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-urban-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-urban-white dark:bg-urban-black w-full max-w-2xl border border-white/10 overflow-hidden shadow-2xl p-8 md:p-12"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <span className="px-2 py-1 text-[10px] font-mono font-bold text-white bg-urban-red uppercase">{item.category}</span>
          <span className="font-mono text-xs opacity-40">{item.date}</span>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">{item.title}</h2>
        <p className="font-mono text-sm leading-relaxed mb-8 opacity-70">
          {item.description}
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onClose}
            className="w-full py-4 border border-black/10 dark:border-white/10 font-mono text-xs uppercase hover:bg-urban-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            Back to feed
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FlashlightCard: React.FC<CardProps> = ({ item, onOpen }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full min-h-[280px] w-full overflow-hidden bg-urban-light-gray dark:bg-urban-gray border border-black/10 dark:border-white/10 group flex flex-col justify-between transition-colors duration-500"
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ opacity, background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255, 42, 0, 0.1), transparent 40%)` }}
      />
      
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono font-bold text-urban-white bg-urban-black dark:text-urban-black dark:bg-urban-white uppercase tracking-tighter">{item.category}</span>
            <span className="font-mono text-[9px] text-urban-black/30 dark:text-urban-white/30">{item.date}</span>
          </div>
          <h3 className="text-lg font-black uppercase mb-3 text-urban-black dark:text-urban-white group-hover:text-urban-red leading-tight transition-colors tracking-tight">
            {item.title}
          </h3>
          <p className="text-urban-black/50 dark:text-urban-white/50 text-[10px] font-mono line-clamp-3 leading-snug tracking-tighter">
            {item.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 pt-4">
            <div className="flex gap-2">
                <button 
                  onClick={() => onOpen(item, 'quick')}
                  className="flex-1 py-1.5 bg-urban-black text-white dark:bg-urban-white dark:text-urban-black font-mono text-[8px] uppercase font-bold hover:bg-urban-red hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <ZoomIn size={10} /> Quick
                </button>
                <button 
                  onClick={() => onOpen(item, 'full')}
                  className="flex-1 py-1.5 border border-black/10 dark:border-white/10 font-mono text-[8px] uppercase font-bold hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center justify-center gap-1.5"
                >
                  <Maximize2 size={10} /> Full
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export const LatestNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNote, setSelectedNote] = useState<UpdateCardProps | null>(null);
  const [viewMode, setViewMode] = useState<'quick' | 'full' | null>(null);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    writings.forEach(w => w.tags?.forEach(t => tags.add(t)));
    return ["ALL", ...Array.from(tags).sort()];
  }, []);

  const filteredWritings = useMemo(() => {
    const list = writings.filter(w => {
      const matchesSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        w.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag === "ALL" || w.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
    return isExpanded ? list : list.slice(0, 6);
  }, [searchTerm, selectedTag, isExpanded]);

  const handleOpenNote = (item: UpdateCardProps, mode: 'quick' | 'full') => {
    setSelectedNote(item);
    setViewMode(mode);
  };

  return (
    <section className="pt-12 pb-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black border-b border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-1">
              <PenTool className="text-urban-red" size={24} />
              <h2 className="text-3xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">My <span className="text-urban-red">Writings</span></h2>
            </div>
            <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">// Original research & critical dispatches.</p>
          </div>
          
          <div className="w-full md:w-80 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-urban-black/30 dark:text-urban-white/30 group-focus-within:text-urban-red transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH WRITINGS..."
              className="w-full bg-white dark:bg-urban-black border border-black/10 dark:border-white/10 p-3 pl-10 font-mono text-[10px] uppercase focus:outline-none focus:border-urban-red transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5 mb-12">
            {allTags.map(tag => (
                <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-2 py-0.5 font-mono text-[9px] uppercase border transition-all ${selectedTag === tag ? 'bg-urban-red border-urban-red text-white' : 'border-black/10 text-urban-black/60 dark:text-urban-white/60 hover:border-urban-red hover:text-urban-red'}`}>{tag}</button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
              {filteredWritings.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FlashlightCard item={item} onOpen={handleOpenNote} />
                  </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {!isExpanded && writings.length > 6 && filteredWritings.length >= 6 && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="px-6 py-3 border border-black/10 dark:border-white/10 font-mono text-[10px] uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group text-urban-black dark:text-urban-white"
            >
              Full Archive <ArrowDown size={12} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedNote && viewMode === 'quick' && (
          <QuickNoteModal item={selectedNote} onClose={() => { setSelectedNote(null); setViewMode(null); }} />
        )}
        {selectedNote && viewMode === 'full' && (
          <FullNoteView item={selectedNote} onClose={() => { setSelectedNote(null); setViewMode(null); }} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default FlashlightCard;