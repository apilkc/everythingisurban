import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Circle: Black in Light Mode, White in Dark Mode */}
      <motion.circle 
        cx="100" cy="100" r="100" 
        className="fill-urban-black dark:fill-urban-white transition-colors duration-500"
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
        }}
      />
      
      {/* 'everything is': White in Light Mode, Black in Dark Mode */}
      <motion.text 
        x="100" y="92" 
        className="fill-urban-white dark:fill-urban-black transition-colors duration-500"
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="500" 
        fontSize="20" 
        textAnchor="middle" 
        letterSpacing="4"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }
        }}
      >
        everything is
      </motion.text>
      
      {/* 'URBAN': White in Light Mode, Black in Dark Mode */}
      <motion.text 
        x="72" y="115" 
        className="fill-urban-white dark:fill-urban-black transition-colors duration-500"
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="900" 
        fontSize="22" 
        textAnchor="start" 
        letterSpacing="6"
        variants={{
           hidden: { opacity: 0, scale: 1.2, filter: "blur(10px)" },
           visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: 0.6, duration: 0.4 } }
        }}
      >
        URBAN
      </motion.text>
    </motion.svg>
  );
};

export default Logo;