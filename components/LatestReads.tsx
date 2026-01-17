import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, ArrowDown, ArrowUpRight, Search } from 'lucide-react';
import { latestReads } from '../data/reads/index';

const ReadCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <a 
      href={item.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full bg-urban-light-gray dark:bg-urban-gray border border-black/10 dark:border-white/10 p-5 transition-all duration-300 hover:border-urban-red"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-[8px] bg-urban-black text-white dark:bg-white dark:text-black px-1.5 py-0.5 uppercase tracking-tighter">
          {item.category}
        </span>
        <ArrowUpRight size={12} className="text-urban-black/20 dark:text-white/20 group-hover:text-urban-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      
      <h3 className="text-sm font-black uppercase leading-tight mb-3 text-urban-black dark:text-urban-white group-hover:text-urban-red transition-colors">
        {item.title}
      </h3>
      
      <p className="text-[10px] font-mono opacity-50 line-clamp-3 mb-4 leading-relaxed tracking-tight">
        {item.description}
      </p>

      <div className="mt-auto flex justify-between items-center pt-3 border-t border-black/5 dark:border-white/5">
        <span className="font-mono text-[8px] opacity-40">{item.date}</span>
        <div className="flex gap-1">
          {item.tags?.slice(0, 1).map((t: string) => (
            <span key={t} className="text-urban-red font-mono text-[8px] uppercase">#{t}</span>
          ))}
        </div>
      </div>
      
      {/* Decorative side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-urban-red scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
    </a>
  );
};

export const LatestReads: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    latestReads.forEach(item => item.tags?.forEach(t => tags.add(t)));
    return ["ALL", ...Array.from(tags).sort()];
  }, []);

  const filteredReads = useMemo(() => {
    return latestReads.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "ALL" || item.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  // Show 3 items initially
  const itemsToShow = isExpanded ? filteredReads : filteredReads.slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-12 bg-urban-light-gray dark:bg-urban-gray border-b border-black/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-1">
              <BookOpen className="text-urban-red" size={24} />
              <h2 className="text-3xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">My Latest <span className="text-urban-red">Read</span></h2>
            </div>
            <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">// Curated external intelligence & news.</p>
          </div>

          <div className="w-full md:w-80 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-urban-black/30 dark:text-urban-white/30 group-focus-within:text-urban-red transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH READS..."
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {itemsToShow.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ReadCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!isExpanded && latestReads.length > 3 && filteredReads.length > 3 && (
          <div className="mt-12 flex justify-center">
             <button 
              onClick={() => setIsExpanded(true)}
              className="px-6 py-2 border border-black/10 dark:border-white/10 font-mono text-[9px] uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group text-urban-black dark:text-urban-white"
            >
              View Feed Archive <ArrowDown size={10} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};