import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@urban.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-32 px-6 md:px-12 bg-urban-white dark:bg-urban-black text-urban-black dark:text-urban-white transition-colors duration-500 border-t border-black/10 dark:border-white/10 overflow-hidden">
      
      {/* Decorative Background Text - Animated */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <motion.div
           animate={{ 
             opacity: [0.03, 0.08, 0.03],
             scale: [1, 1.1, 1],
             x: ["-50%", "-50%", "-50%"],
             y: ["-50%", "-50%", "-50%"]
           }}
           transition={{
             duration: 8,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute top-1/2 left-1/2 w-full"
        >
          <span className="text-[20vw] font-black uppercase leading-none whitespace-nowrap">Connect</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div className="flex flex-col gap-8 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter"
          >
            Have an <br />
            <span className="text-urban-red">Idea?</span>
          </motion.h2>

          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="font-mono text-lg opacity-60 max-w-md"
          >
            Always open to discussing new projects, design systems, or just geeking out over urban design.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto">
          
          {/* Email Button */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="group relative"
          >
            <div 
                onClick={handleCopy}
                className="cursor-pointer flex items-center justify-between gap-8 p-6 bg-urban-black/5 dark:bg-urban-white/5 border border-black/10 dark:border-white/10 hover:border-urban-red dark:hover:border-urban-red transition-all duration-300 w-full md:min-w-[400px]"
            >
               <div className="flex flex-col">
                  <span className="font-mono text-xs text-urban-red uppercase mb-1">Drop a line</span>
                  <span className="text-2xl font-bold tracking-tight">{email}</span>
               </div>
               <div className="p-3 bg-urban-white dark:bg-urban-black rounded-full border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform">
                 {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
               </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="flex gap-4"
          >
             {['GitHub', 'Twitter', 'LinkedIn'].map((social, i) => (
                <a 
                  key={social}
                  href="#" 
                  className="flex-1 p-6 bg-urban-black/5 dark:bg-urban-white/5 border border-black/10 dark:border-white/10 hover:bg-urban-red hover:text-white hover:border-urban-red transition-all duration-300 flex justify-between items-center group"
                >
                   <span className="font-bold uppercase tracking-wider">{social}</span>
                   <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
             ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;