import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ArrowDown, ExternalLink, ChevronLeft, ChevronRight, Camera, Search } from 'lucide-react';
import { galleryItems } from '../data/gallery/index';
import type { GalleryItem } from '../types';
import L from 'leaflet';

const UrbanMap: React.FC<{ lat: number; lng: number; title: string }> = ({ lat, lng, title }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([lat, lng], 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #FF2A00; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(255, 42, 0, 0.5);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView([lat, lng], 13, { animate: true });
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    return () => {};
  }, [lat, lng]);

  return (
    <div className="relative w-full h-full overflow-hidden urban-map-monochrome">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-2 right-2 z-[400] bg-urban-black text-white px-2 py-1 font-mono text-[8px] uppercase tracking-tighter opacity-50">
        Leaflet // CartoDB
      </div>
    </div>
  );
};

const MapModal: React.FC<{ 
  items: GalleryItem[]; 
  initialIndex: number; 
  onClose: () => void 
}> = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const item = items[currentIndex];

  const paginate = useCallback((newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < items.length) {
      setDirection(newDirection);
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, onClose]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-urban-white/95 dark:bg-urban-black/95 backdrop-blur-md"
    >
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[70]">
        <div className="font-mono text-xs text-urban-black/40 dark:text-urban-white/40">
          LOG ENTRY {currentIndex + 1} OF {items.length}
        </div>
        <button onClick={onClose} className="p-3 bg-urban-black text-urban-white hover:bg-urban-red transition-colors">
          <X size={24} />
        </button>
      </div>
      
      <div className="w-full max-w-7xl h-full flex flex-col md:flex-row gap-8 mt-12 md:mt-0">
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative group overflow-hidden bg-urban-black border border-black/10">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <motion.img 
                initial={{ filter: 'grayscale(100%)' }}
                animate={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 1, delay: 0.2 }}
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center z-20">
             {currentIndex > 0 && (
               <button 
                 onClick={() => paginate(-1)}
                 className="p-4 bg-urban-black/20 text-white hover:bg-urban-red transition-all backdrop-blur-sm"
               >
                 <ChevronLeft size={32} />
               </button>
             )}
          </div>
          <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center z-20">
             {currentIndex < items.length - 1 && (
               <button 
                 onClick={() => paginate(1)}
                 className="p-4 bg-urban-black/20 text-white hover:bg-urban-red transition-all backdrop-blur-sm"
               >
                 <ChevronRight size={32} />
               </button>
             )}
          </div>

          <div className="absolute bottom-4 left-4 bg-urban-black text-urban-white px-3 py-1 font-mono text-[10px] z-10 tracking-widest">
            GEOLOC // {item.coordinates.lat.toFixed(4)}, {item.coordinates.lng.toFixed(4)}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-8 h-1/2 md:h-full overflow-y-auto pr-2">
          <motion.div
            key={`meta-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-xs text-urban-red uppercase">{item.location} // {item.date}</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-urban-black dark:text-urban-white">{item.title}</h2>
            <p className="font-mono text-sm opacity-60 mt-4 leading-relaxed text-urban-black dark:text-urban-white">{item.description}</p>
          </motion.div>

          <motion.div 
            key={`map-container-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 min-h-[300px] bg-urban-light-gray dark:bg-urban-gray border border-black/10 relative overflow-hidden"
          >
              <UrbanMap lat={item.coordinates.lat} lng={item.coordinates.lng} title={item.title} />
              
              <div className="absolute top-4 left-4 z-[500] pointer-events-none">
                 <div className="bg-urban-red text-white font-mono text-[10px] px-2 py-1 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={10} /> Active Tracking: {item.location}
                 </div>
              </div>

              <div className="absolute bottom-4 left-4 z-[500]">
                 <a 
                   href={`https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 font-mono text-[10px] bg-urban-white/80 dark:bg-urban-black/80 backdrop-blur-md px-3 py-1.5 border border-black/10 hover:text-urban-red hover:border-urban-red transition-all text-urban-black dark:text-urban-white uppercase"
                 >
                    Launch Satellite View <ExternalLink size={10} />
                 </a>
              </div>
          </motion.div>

          <div className="flex gap-2 pb-4">
             {items.map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => {
                   setDirection(idx > currentIndex ? 1 : -1);
                   setCurrentIndex(idx);
                 }}
                 className={`h-1 flex-1 transition-all ${idx === currentIndex ? 'bg-urban-red' : 'bg-black/10 dark:bg-white/10 hover:bg-black/30'}`}
               />
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("ALL");
    
    const allLocations = useMemo(() => {
        const locs = new Set<string>();
        galleryItems.forEach(item => locs.add(item.location));
        return ["ALL", ...Array.from(locs).sort()];
    }, []);

    const filteredItems = useMemo(() => {
        return galleryItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLoc = selectedLocation === "ALL" || item.location === selectedLocation;
            return matchesSearch && matchesLoc;
        });
    }, [searchTerm, selectedLocation]);

    const displayCount = 4;
    const displayedItems = isExpanded ? filteredItems : filteredItems.slice(0, displayCount);

    return (
        <section className="py-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black transition-colors duration-500 border-b border-black/10">
             <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-4 mb-2">
                      <Camera className="text-urban-red" size={32} />
                      <h2 className="text-3xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">From <span className="text-urban-red">My Lens</span></h2>
                    </div>
                    <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest text-urban-black dark:text-urban-white">// Photographic research into urban textures and structural entropy.</p>
                  </div>

                  <div className="w-full md:w-80 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-urban-black/30 dark:text-urban-white/30 group-focus-within:text-urban-red transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder="SEARCH GALLERY..."
                      className="w-full bg-urban-light-gray dark:bg-urban-gray border border-black/10 dark:border-white/10 p-3 pl-10 font-mono text-[10px] uppercase focus:outline-none focus:border-urban-red transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Locations Filter Row */}
                <div className="flex flex-wrap gap-1.5 mb-12">
                    {allLocations.map(loc => (
                        <button 
                          key={loc} 
                          onClick={() => setSelectedLocation(loc)} 
                          className={`px-2 py-0.5 font-mono text-[9px] uppercase border transition-all ${selectedLocation === loc ? 'bg-urban-red border-urban-red text-white' : 'border-black/10 text-urban-black/60 dark:text-urban-white/60 hover:border-urban-red hover:text-urban-red'}`}
                        >
                          {loc}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                      {displayedItems.map((item, i) => (
                          <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.4, delay: i * 0.05 }}
                              className="relative group overflow-hidden cursor-pointer aspect-square bg-urban-light-gray dark:bg-urban-gray border border-black/5"
                              onClick={() => setSelectedIndex(galleryItems.indexOf(item))}
                          >
                              <img 
                                  src={item.src} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-urban-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                              
                              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                  <span className="font-mono text-[10px] text-urban-red uppercase mb-1">{item.location}</span>
                                  <h3 className="font-black text-sm md:text-lg text-white uppercase leading-none">{item.title}</h3>
                                  <div className="mt-2 flex items-center gap-2 text-white/60 font-mono text-[8px] md:text-[10px]">
                                    <MapPin size={10} /> {item.coordinates.lat.toFixed(2)}, {item.coordinates.lng.toFixed(2)}
                                  </div>
                              </div>

                              <div className="absolute top-4 left-4 bg-urban-black text-urban-white text-[10px] font-mono px-2 py-1 z-10">
                                  {item.id.toUpperCase()}
                              </div>
                          </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                
                {!isExpanded && galleryItems.length > displayCount && filteredItems.length > displayCount && (
                  <div className="mt-12 flex justify-center">
                    <button 
                      onClick={() => setIsExpanded(true)}
                      className="px-6 py-3 border border-black/10 font-mono text-xs uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group text-urban-black dark:text-urban-white"
                    >
                      Show Full Gallery <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                  </div>
                )}
             </div>

             <AnimatePresence>
                {selectedIndex !== null && (
                   <MapModal 
                     items={galleryItems} 
                     initialIndex={selectedIndex} 
                     onClose={() => setSelectedIndex(null)} 
                   />
                )}
             </AnimatePresence>
        </section>
    )
}

export default Gallery;