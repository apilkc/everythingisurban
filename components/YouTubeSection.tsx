import React from 'react';
import { Youtube, Play } from 'lucide-react';

const YouTubeSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black border-y border-black/10 dark:border-white/10 relative overflow-hidden group transition-colors duration-500">
        {/* Background Static/Noise Effect */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 max-w-7xl mx-auto">
            <div className="w-full md:w-1/2 space-y-8">
                
                <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] text-urban-black dark:text-urban-white">
                    AI <br/>
                    <span className="text-transparent stroke-text-light dark:stroke-text-dark" style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'currentColor' }}>Youtube</span>
                </h2>
                
                <div className="w-20 h-1 bg-urban-red" />

                <p className="font-mono text-urban-black/60 dark:text-urban-white/60 max-w-md text-sm md:text-base leading-relaxed">
                    Video essays exploring the hidden architecture of our daily lives. Subscribe for regular transmissions on design, entropy, and the urban fabric.
                </p>

                <a 
                    href="https://www.youtube.com/@everything_urban"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 bg-urban-black dark:bg-urban-white text-urban-white dark:text-urban-black px-8 py-4 font-mono font-bold uppercase hover:bg-urban-red hover:text-white dark:hover:bg-urban-red dark:hover:text-white transition-all duration-300 border border-black dark:border-white"
                >
                    <Youtube size={20} />
                    <span>Watch Channel</span>
                </a>
            </div>

            {/* Visual Element / Mock Player */}
            <a 
                href="https://www.youtube.com/@everything_urban"
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-1/2 aspect-video bg-urban-light-gray dark:bg-urban-gray border border-black/20 dark:border-white/20 relative group/video cursor-pointer overflow-hidden"
            >
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-20 h-20 rounded-full border border-black/20 dark:border-white/20 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover/video:scale-110 group-hover/video:border-urban-red group-hover/video:bg-urban-red/10 transition-all duration-500">
                        <Play fill="currentColor" className="ml-1 w-8 h-8 text-urban-black dark:text-urban-white group-hover/video:text-urban-red transition-colors" />
                    </div>
                </div>

                {/* Glitch/Hover Image Effect placeholder */}
                <div className="absolute inset-0 opacity-20 group-hover/video:opacity-40 transition-opacity duration-500 bg-gradient-to-tr from-urban-white dark:from-urban-black via-transparent to-urban-red/20" />
                
                {/* Decorative UI overlays */}
                <div className="absolute top-4 left-4 border-l-2 border-t-2 border-black/30 dark:border-white/30 w-4 h-4" />
                <div className="absolute top-4 right-4 border-r-2 border-t-2 border-black/30 dark:border-white/30 w-4 h-4" />
                <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-black/30 dark:border-white/30 w-4 h-4" />
                <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-black/30 dark:border-white/30 w-4 h-4" />
                
            </a>
        </div>
    </section>
  );
};
export default YouTubeSection;