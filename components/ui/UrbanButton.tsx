import React from 'react';
import { motion } from 'framer-motion';

interface UrbanButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const UrbanButton: React.FC<UrbanButtonProps> = ({ children, onClick, className = "", icon }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-urban-black dark:bg-urban-black overflow-hidden font-mono text-sm uppercase tracking-widest text-urban-white border border-black/10 dark:border-white/10 ${className}`}
    >
      {/* Border Beam Effect */}
      <span className="absolute inset-0 rounded-full border border-white/20" />
      
      {/* Moving Beam */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute top-0 left-0 h-full w-[20px] bg-gradient-to-r from-transparent via-urban-red to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] -translate-x-1/2 -translate-y-1/2 origin-bottom-right" 
              style={{ height: '300%', width: '20px', top: '-100%', left: '50%' }}
        />
      </span>

      {/* Content z-index fix */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="text-urban-red">{icon}</span>}
      </span>
    </motion.button>
  );
};

export default UrbanButton;