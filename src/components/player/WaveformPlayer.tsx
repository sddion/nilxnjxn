"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAudioStore } from "@/store/audioStore";
import { motion } from "framer-motion";
import { PlayIcon, PauseIcon, VolumeHighIcon, VolumeMuteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

export function WaveformPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const { currentTrack, isPlaying, togglePlayPause, updateProgress, setVolume, volume, currentTime, duration } = useAudioStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !currentTrack) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgba(255, 255, 255, 0.05)",
      progressColor: "rgba(34, 211, 238, 0.8)",
      cursorColor: "rgba(34, 211, 238, 0.4)",
      barWidth: 2,
      barGap: 4,
      barRadius: 10,
      height: 24,
      normalize: true,
      fillParent: true,
      url: currentTrack.audioUrl || "", 
    });

    wavesurferRef.current.on("ready", () => {
      setIsReady(true);
      wavesurferRef.current?.setVolume(volume);
      if (isPlaying) {
        wavesurferRef.current?.play();
      }
    });

    wavesurferRef.current.on("audioprocess", (time) => {
      updateProgress(time, wavesurferRef.current?.getDuration() || 0);
    });

    wavesurferRef.current.on("finish", () => {
      if (isPlaying) togglePlayPause();
    });

    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, [currentTrack?.id]);

  useEffect(() => {
    if (!wavesurferRef.current || !isReady) return;
    
    if (isPlaying) {
      wavesurferRef.current.play().catch(() => {});
    } else {
      wavesurferRef.current.pause();
    }
  }, [isPlaying, isReady]);

  useEffect(() => {
    if (wavesurferRef.current && isReady) {
      wavesurferRef.current.setVolume(volume);
    }
  }, [volume, isReady]);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ y: 150 }}
      animate={{ y: 0 }}
      exit={{ y: 150 }}
      className="fixed bottom-0 left-0 right-0 z-100 px-4 pb-6 md:pb-8 pt-2 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full p-2 pr-4 md:pr-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex items-center gap-3 md:gap-6 pointer-events-auto group/player">
        
        {/* Play/Pause - Smaller on mobile */}
        <Magnetic strength={0.2}>
          <button 
            onClick={togglePlayPause}
            className="w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl hover:bg-accent relative z-10 shrink-0"
          >
            {isPlaying ? (
              <HugeiconsIcon icon={PauseIcon} size={20} color="currentColor" />
            ) : (
              <HugeiconsIcon icon={PlayIcon} size={20} color="currentColor" className="ml-1" />
            )}
          </button>
        </Magnetic>

        {/* Dynamic Track Visual - Compact on mobile */}
        <div className="flex items-center gap-3 shrink-0 max-w-[120px] md:max-w-[200px]">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/20 shrink-0">
             <img 
               src={currentTrack.coverUrl} 
               alt="" 
               className={cn(
                 "w-full h-full object-cover transition-transform duration-3000 ease-linear",
                 isPlaying ? "animate-spin-slow" : ""
               )} 
             />
             <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full border border-white/10 z-10" />
          </div>
          <div className="overflow-hidden hidden sm:block">
            <h4 className="text-white font-functional font-bold truncate text-[10px] md:text-[11px] tracking-tight">{currentTrack.title}</h4>
            <p className="text-white/40 font-functional text-[8px] md:text-[9px] uppercase tracking-[0.2em] truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Waveform Visualization - Responsive Heights */}
        <div className="flex-1 flex flex-col justify-center gap-1 md:gap-2 pt-1 md:pt-2 px-4">
          <div className="w-full h-4 md:h-6 opacity-60" ref={containerRef} />
          <div className="flex justify-between items-center px-1">
            <span className="text-[7px] md:text-[8px] font-functional text-white/30 font-bold tracking-widest uppercase">{formatTime(currentTime)}</span>
            <div className="flex-1 mx-4 h-px bg-white/5" />
            <span className="text-[7px] md:text-[8px] font-functional text-white/30 font-bold tracking-widest uppercase">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
