import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  const items = ["CODING", "ARCHITECTURE", "RESEARCH", "URBANIZATION", "ENTROPY", "DESIGN"];

  return (
    <div className="relative flex overflow-hidden border-y border-black/20 dark:border-white/20 bg-urban-white dark:bg-urban-black text-urban-black dark:text-urban-white py-6 select-none transition-colors duration-500">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-urban-white dark:from-urban-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-urban-white dark:from-urban-black to-transparent" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }} 
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex">
            {items.map((text, idx) => (
              <span key={idx} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mx-8 flex items-center">
                {text}
                <span className="w-3 h-3 bg-urban-red mx-8 rotate-45" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;