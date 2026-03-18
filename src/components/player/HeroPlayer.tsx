"use client";

import { motion } from "framer-motion";
import { Track } from "@/lib/data";
import { useAudioStore } from "@/store/audioStore";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export function HeroPlayer({ track }: { track: Track }) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudioStore();

  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Dynamic Backing Image from public/extra */}
      <div 
        className="absolute inset-0 z-0 bg-background mix-blend-multiply opacity-30 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('/extra/250519DSC_0025.webp')` }}
      />
      <div className="absolute inset-0 z-0 bg-background mix-blend-multiply opacity-60 bg-[url('/noise.png')] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="font-mrs-sheppards text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-lg leading-none">
            nilxnjxn
          </h1>
          <p className="font-sans text-lg md:text-2xl text-accent/90 max-w-2xl mx-auto font-light tracking-wide">
            Listen. Feel. Own.
            <br />
            <span className="text-muted-foreground text-sm md:text-base mt-2 block">
              Preview instantly, buy directly.
            </span>
          </p>
        </div>

        <motion.div
           whileHover={{ scale: 1.03 }}
           className="relative group mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[20px] overflow-hidden shadow-2xl ring-1 ring-white/10"
        >
          <img 
            src={track.coverUrl} 
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none" />
          
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center m-auto w-20 h-20 bg-accent/90 text-background rounded-full hover:bg-accent transition-transform shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            aria-label={isPlaying && isCurrentTrack ? "Pause Track" : "Play Track"}
          >
            {isPlaying && isCurrentTrack ? (
              <HugeiconsIcon icon={PauseIcon} size={32} color="currentColor" />
            ) : (
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <HugeiconsIcon icon={PlayIcon} size={32} color="currentColor" className="ml-1" />
              </motion.div>
            )}
          </button>
        </motion.div>

        <div className="pt-8">
          <Button 
            size="lg" 
            className="rounded-full bg-white text-background hover:bg-gray-200 font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={() => {
              console.log("Unlock track clicked");
            }}
          >
            Unlock Track — {track.price}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

