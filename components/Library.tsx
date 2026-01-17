import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Maximize2, ExternalLink, Printer, Share2, ZoomIn, ArrowDown, Library as LibraryIcon } from 'lucide-react';
import type { Book } from '../types';
import { books } from '../data/books/index';

const FullBookView: React.FC<{ book: Book; onClose: () => void }> = ({ book, onClose }) => {
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
          <span className="font-mono text-[10px] bg-urban-black text-white dark:bg-white dark:text-black px-2 py-0.5 uppercase">Archive Ref: {book.id.toUpperCase()}</span>
          <h2 className="font-black uppercase text-sm md:text-lg tracking-tight hidden md:block">{book.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/10"><Printer size={18} /></button>
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/10"><Share2 size={18} /></button>
          <button 
            onClick={onClose}
            className="ml-4 flex items-center gap-2 px-4 py-2 bg-urban-red text-white font-mono text-xs uppercase hover:brightness-110 transition-all"
          >
            Close Document <X size={16} />
          </button>
        </div>
      </header>

      <div 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scroll-smooth flex flex-col items-center py-16 px-6"
      >
        <article className="max-w-[70ch] w-full space-y-12">
          <div className="space-y-4">
            <div className="flex gap-2">
              {book.tags.map(t => <span key={t} className="font-mono text-[10px] text-urban-red border border-urban-red/20 px-2 py-0.5">{t}</span>)}
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
              {book.title}
            </h1>
            <div className="font-mono text-sm opacity-50 flex justify-between border-y border-black/10 dark:border-white/10 py-4">
              <span>AUTHOR: {book.author.toUpperCase()}</span>
              <span>PUBLISHED: {book.year}</span>
            </div>
          </div>

          {book.cover && (
            <div className="w-full aspect-video grayscale dark:invert-[0.1] border border-black/10 overflow-hidden">
               <img src={book.cover} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
          )}

          <div className="font-serif text-lg md:text-2xl leading-[1.7] text-urban-black/90 dark:text-urban-white/90 space-y-8 drop-cap-section">
            {book.reflection.split('\n\n').map((para, i) => (
              <p key={i} className={i === 0 ? "first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:uppercase" : ""}>
                {para}
              </p>
            ))}
          </div>

          <div className="pt-16 pb-24 border-t border-dashed border-black/20 text-center">
             <span className="font-mono text-xs opacity-30">// END OF REFLECTION</span>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

const QuickViewModal: React.FC<{ book: Book; onClose: () => void }> = ({ book, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-urban-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-urban-white dark:bg-urban-black w-full max-w-4xl h-full max-h-[80vh] flex flex-col md:flex-row border border-white/10 overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-2/5 relative bg-urban-gray overflow-hidden">
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover grayscale contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-t from-urban-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-black uppercase text-white tracking-tighter mb-2">{book.title}</h2>
            <p className="font-mono text-xs text-white/60 uppercase">{book.author} // {book.year}</p>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
           <div>
              <div className="flex gap-2 mb-8">
                 {book.tags.map(t => <span key={t} className="font-mono text-[10px] bg-urban-red text-white px-2 py-0.5">{t}</span>)}
              </div>
              <h3 className="font-mono text-xs uppercase mb-4 text-urban-red">// Quick Insight</h3>
              <p className="font-serif text-xl leading-relaxed text-urban-black dark:text-urban-white/80 line-clamp-[10]">
                {book.reflection}
              </p>
           </div>
           
           <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={onClose}
                className="w-full py-4 border border-black/10 dark:border-white/10 font-mono text-xs uppercase hover:bg-urban-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Return to shelf
              </button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'quick' | 'full' | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    books.forEach(b => b.tags.forEach(t => tags.add(t)));
    return ["ALL", ...Array.from(tags).sort()];
  }, []);

  const filteredBooks = useMemo(() => {
    const list = sortedBooks.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag === "ALL" || b.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
    return isExpanded ? list : list.slice(0, 6);
  }, [sortedBooks, searchTerm, selectedTag, isExpanded]);

  const handleOpenBook = (book: Book, mode: 'quick' | 'full') => {
    setSelectedBook(book);
    setViewMode(mode);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-urban-light-gray dark:bg-urban-gray border-b border-black/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <LibraryIcon className="text-urban-red" size={24} />
              <h2 className="text-3xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">My <span className="text-urban-red">Book Shelf</span></h2>
            </div>
            <p className="font-mono text-[10px] opacity-50 uppercase text-urban-black dark:text-urban-white tracking-widest">// Curated theoretical infrastructure.</p>
          </div>
          
          <div className="w-full md:w-80 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-urban-black/30 dark:text-urban-white/30 group-focus-within:text-urban-red transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH TITLES..."
              className="w-full bg-white dark:bg-urban-black border border-black/10 dark:border-white/10 p-3 pl-10 font-mono text-[10px] uppercase focus:outline-none focus:border-urban-red transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

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
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col"
              >
                <div className="aspect-[2/3] w-full bg-urban-black overflow-hidden border border-black/10 shadow-sm group-hover:shadow-xl transition-all duration-500 relative">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  
                  <div className="absolute inset-0 bg-urban-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 gap-3 z-20">
                    <button 
                      onClick={() => handleOpenBook(book, 'quick')}
                      className="w-full py-2 bg-urban-white text-urban-black font-mono text-[9px] uppercase font-bold hover:bg-urban-red hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <ZoomIn size={12} /> Quick View
                    </button>
                    <button 
                      onClick={() => handleOpenBook(book, 'full')}
                      className="w-full py-2 border border-white/20 text-white font-mono text-[9px] uppercase font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      <Maximize2 size={12} /> Full Text
                    </button>
                  </div>

                  <div className="absolute top-2 right-2 flex flex-col gap-1 z-10 pointer-events-none group-hover:opacity-0 transition-opacity">
                    <span className="bg-urban-red text-white text-[7px] font-mono px-1.5 py-0.5 uppercase">{book.tags[0]}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-xs uppercase truncate text-urban-black dark:text-urban-white group-hover:text-urban-red transition-colors">{book.title}</h3>
                  <p className="font-mono text-[9px] opacity-40 uppercase tracking-tighter">{book.author} // {book.year}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!isExpanded && books.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="px-6 py-3 border border-black/10 dark:border-white/10 font-mono text-[10px] uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group text-urban-black dark:text-urban-white"
            >
              Expand Library <ArrowDown size={12} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedBook && viewMode === 'quick' && (
          <QuickViewModal book={selectedBook} onClose={() => { setSelectedBook(null); setViewMode(null); }} />
        )}
        {selectedBook && viewMode === 'full' && (
          <FullBookView book={selectedBook} onClose={() => { setSelectedBook(null); setViewMode(null); }} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Library;