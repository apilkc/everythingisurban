import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashlightCard, { QuickNoteModal, FullNoteView } from './FlashlightCard';
import { Terminal, Github, ArrowDown, Search } from 'lucide-react';
import { experiments } from '../data/experiments/index';
import type { UpdateCardProps } from '../types';

const CodeExperiments: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedExp, setSelectedExp] = useState<UpdateCardProps | null>(null);
  const [viewMode, setViewMode] = useState<'quick' | 'full' | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    experiments.forEach(item => {
        tags.add(item.category); // Use category as a primary tag
        item.tags?.forEach(t => tags.add(t));
    });
    return ["ALL", ...Array.from(tags).sort()];
  }, []);

  const filteredExps = useMemo(() => {
    return experiments.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "ALL" || item.category === selectedTag || item.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const displayedExps = isExpanded ? filteredExps : filteredExps.slice(0, 6);

  const handleOpenExp = (item: UpdateCardProps, mode: 'quick' | 'full') => {
    setSelectedExp(item);
    setViewMode(mode);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black border-b border-black/10 relative overflow-hidden transition-colors duration-500">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-grid-pattern opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-8">
              <div className="flex items-center gap-4">
                  <div className="p-3 border border-black/20 text-urban-red transform rotate-3"><Terminal size={24} /></div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">The Lab</h2>
              </div>

              <div className="w-full md:w-80 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-urban-black/30 dark:text-urban-white/30 group-focus-within:text-urban-red transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="SEARCH LAB..."
                  className="w-full bg-white dark:bg-urban-black border border-black/10 dark:border-white/10 p-3 pl-10 font-mono text-[10px] uppercase focus:outline-none focus:border-urban-red transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-1.5 mb-12">
              {allTags.map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setSelectedTag(tag)} 
                    className={`px-2 py-0.5 font-mono text-[9px] uppercase border transition-all ${selectedTag === tag ? 'bg-urban-red border-urban-red text-white' : 'border-black/10 text-urban-black/60 dark:text-urban-white/60 hover:border-urban-red hover:text-urban-red'}`}
                  >
                    {tag}
                  </button>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                  {displayedExps.map((item) => (
                      <motion.div 
                          key={item.id} 
                          layout 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                      >
                          <FlashlightCard item={item} onOpen={handleOpenExp} />
                      </motion.div>
                  ))}
              </AnimatePresence>
          </div>

          {!isExpanded && experiments.length > 6 && filteredExps.length > 6 && (
              <div className="mt-12 flex justify-center">
                <button 
                onClick={() => setIsExpanded(true)}
                className="px-6 py-3 border border-black/10 font-mono text-xs uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group"
                >
                Expand Lab <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
          )}

          <AnimatePresence>
              {selectedExp && viewMode === 'quick' && (
                <QuickNoteModal item={selectedExp} onClose={() => { setSelectedExp(null); setViewMode(null); }} />
              )}
              {selectedExp && viewMode === 'full' && (
                <FullNoteView item={selectedExp} onClose={() => { setSelectedExp(null); setViewMode(null); }} />
              )}
          </AnimatePresence>

          <div className="mt-12 p-6 border border-black/10 bg-black/5 dark:bg-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-urban-black dark:text-urban-white">
              <div className="flex items-center gap-4"><Github className="w-6 h-6" /><span className="font-mono text-sm uppercase">Check full repos on GitHub</span></div>
              <a href="https://github.com" target="_blank" className="font-bold text-urban-red hover:underline">github.com/everything-is-urban</a>
          </div>
        </div>
    </section>
  );
};

export default CodeExperiments;