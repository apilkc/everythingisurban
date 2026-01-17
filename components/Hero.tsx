import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Logo from './Logo';

const quotes = [
  "\"The city is not a problem to be solved, but a mystery to be lived.\" — Jane Jacobs",
  "\"We shape our buildings; thereafter they shape us.\" — Winston Churchill",
  "\"A house is a machine for living in.\" — Le Corbusier",
  "\"Architecture is the petrification of a cultural moment.\" — Jean Nouvel",
  "\"Design is intelligence made visible.\" — Alina Wheeler",
  "\"Order and complexity are twin sisters.\" — Rem Koolhaas",
  "\"Cities have the capability of providing something for everybody, only because, and only when, they are created by everybody.\" – Jane Jacobs",
  "\"The city is a projection of society on the ground.\" – Lewis Mumford",
  "\"Urbanization is not just a demographic shift, but a transformation of ways of life.\" – Louis Wirth",
  "\"The right to the city is far more than the individual liberty to access urban resources.\" – Henri Lefebvre",
  "\"Cities are the engines of economic growth and the arenas of social conflict.\" – David Harvey",
  "\"A great city is not to be confounded with a populous one.\" – Aristotle",
  "\"Urban space is never neutral; it reflects power, ideology, and struggle.\" – Edward Soja",
  "\"Cities concentrate not only people, but also inequality.\" – Saskia Sassen",
  "\"The city is where difference collides and new possibilities emerge.\" – Ash Amin",
  "\"Cities are not problems to be solved, but potentials to be realized.\" – Jaime Lerner",
  "\"Urban life is not merely a matter of buildings and streets, but of social relations.\" – Manuel Castells",
  "\"The form of a city always tells the story of its people.\" – Kevin Lynch",
  "\"Urbanization without justice produces cities without citizenship.\" – Ananya Roy",
  "\"The future of humanity will be decided in cities.\" – UN-Habitat",
  "\"The city is a living organism, constantly transforming itself.\" – Henri Lefebvre",
  "\"Disasters are not natural; hazards are natural.\" — Kenneth Hewitt",
  "\"A disaster is a social phenomenon, not simply an environmental event.\" — Enrico Quarantelli",
  "\"Vulnerability is not a given; it is produced.\" — Ben Wisner",
  "\"What we call disasters are often the outcomes of development choices.\" — UNDRR",
  "\"Resilience for whom, to what, and at what cost?\" — David Chandler",
  "\"Resilience should not mean coping with injustice.\" — Mark Pelling",
  "\"A resilient city is not one that simply bounces back, but one that learns and transforms.\" — Lawrence Vale",
  "\"Too often, resilience becomes a way to adapt people to unacceptable conditions.\" — Sara Cote & Andrea Nightingale",
  "\"Climate change is the biggest global health threat of the 21st century.\" — WHO",
  "\"The climate crisis is not just an environmental crisis; it is a human rights crisis.\" — Mary Robinson",
  "\"Those who did the least to cause climate change suffer its worst consequences.\" — António Guterres",
  "\"There is no such thing as a natural disaster without a social context.\" — Neil Smith",
  "\"Inequality is the hidden driver of disaster risk.\" — UNDP",
  "\"Social justice is climate justice.\" — Naomi Klein",
  "\"Disasters reveal the fractures that already exist in society.\" — Kathleen Tierney",
  "\"Climate adaptation that ignores inequality will reinforce it.\" — IPCC",
  "\"Building resilience without addressing power is an illusion.\" — Andrea Nightingale",
  "\"Risk reduction is fundamentally about development choices and governance.\" — UNDRR",
  "\"The question is not whether disasters will occur, but who will be protected when they do.\" — Amartya Sen"
];

const Hero: React.FC = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const reveal: Variants = {
    hidden: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 50 },
    visible: (i: number) => ({
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: i * 0.15,
      },
    }),
  };

  const typeContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 1.2,
      }
    }
  };

  const typeChar = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } }
  };

  return (
    <section 
        className="relative min-h-[75vh] w-full flex flex-col p-6 md:p-12 overflow-hidden border-b border-black/10 dark:border-white/10 bg-urban-white dark:bg-urban-black transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[size:40px_40px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <header className="relative z-10 flex justify-start items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 -ml-4 -mt-4">
             <Logo className="w-full h-full" />
          </div>
        </header>

        <div className="relative z-10 mt-6 md:mt-12 flex flex-col items-start gap-2 flex-1">
          <div className="inline-flex flex-col w-full max-w-fit">
            <motion.div custom={0} initial="hidden" animate="visible" variants={reveal}>
              <h1 className="p-2 -ml-2 text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-urban-black dark:text-urban-white">
                Everything
              </h1>
            </motion.div>
            
            <div className="flex items-center justify-between w-full mt-2">
               <motion.div custom={1} initial="hidden" animate="visible" variants={reveal}>
                 <h1 className="p-2 -ml-2 text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-transparent [-webkit-text-stroke:2px_#050505] dark:[-webkit-text-stroke:2px_#FAFAFA]">
                   IS
                 </h1>
               </motion.div>
               
               <motion.div 
                custom={2} 
                initial="hidden" 
                animate="visible" 
                variants={reveal} 
                className="flex-1 h-[2px] mx-8 md:mx-16 bg-urban-red self-center min-w-[2rem]" 
               />
               
               <motion.div custom={3} initial="hidden" animate="visible" variants={reveal}>
                <h1 className="p-2 -mr-2 text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-urban-black dark:text-urban-white">
                  URBAN
                </h1>
               </motion.div>
            </div>
          </div>

          <motion.p 
            custom={4} 
            initial="hidden" 
            animate="visible" 
            variants={reveal}
            className="font-mono mt-8 text-sm md:text-base max-w-md text-urban-black/60 dark:text-urban-white/60 relative z-30"
          >
            // A digital archive exploring the intersection of concrete, code, and community.
          </motion.p>
          
          {quote && (
             <motion.div 
               variants={typeContainer}
               initial="hidden"
               animate="visible"
               className="font-mono text-sm md:text-lg text-urban-red mt-4 max-w-2xl italic leading-relaxed relative z-30 min-h-[3.5rem]"
             >
               {quote.split("").map((char, index) => (
                 <motion.span key={index} variants={typeChar}>
                   {char}
                 </motion.span>
               ))}
               <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-2 h-4 bg-urban-red ml-1 align-middle"
               />
             </motion.div>
          )}
        </div>

        <div className="relative z-10 flex justify-end items-end mt-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-urban-black/40 dark:text-urban-white/40 uppercase [writing-mode:vertical-rl] rotate-180">
              Scroll To Explore
            </span>
            
            <div className="w-[1px] h-12 bg-black/10 dark:bg-white/10 relative overflow-hidden">
               <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 bg-urban-red"
                  animate={{ top: ['-100%', '100%'] }}
                  transition={{ 
                      duration: 2, 
                      ease: "linear", 
                      repeat: Infinity 
                  }}
               />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;