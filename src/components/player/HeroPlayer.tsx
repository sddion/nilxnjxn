"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Track } from "@/lib/data";
import { useAudioStore } from "@/store/audioStore";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface HeroPlayerProps {
  track: Track;
  onPlay?: () => void;
  hasInteracted: boolean;
}

export function HeroPlayer({ track, onPlay, hasInteracted }: HeroPlayerProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudioStore();
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isCurrentTrack = currentTrack?.id === track.id;

  useLayoutEffect(() => {
    if (!bgRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // CTA Reveal
      if (hasInteracted) {
        gsap.from(".cta-reveal", {
          y: 40,
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.5
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [hasInteracted]);

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
    if (onPlay) onPlay();
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Visuals */}
      <div 
        ref={bgRef}
        className="absolute inset-[-10%] z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url('/extra/250519DSC_0025.webp')`, height: '120%' }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-background via-transparent to-background/90" />
      
      {/* Centered Play Core */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-12 pt-24 md:pt-32">
        <AnimatePresence mode="wait">
          {!hasInteracted ? (
            <motion.div
              key="initial-cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-4"
            >
              <h2 className="text-white/60 text-[10px] tracking-[0.6em] uppercase font-functional font-bold">
                Enter the frequency
              </h2>
            </motion.div>
          ) : (
            <motion.div
              key="identity-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4 text-center px-4"
            >
              <h1 className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-expressive text-white tracking-tighter mix-blend-difference drop-shadow-2xl leading-[0.8] wrap-break-word">
                NILXNJXN
              </h1>
              <div className="overflow-hidden">
                 <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-white/40 font-functional text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-medium"
                >
                  {track.title}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={!hasInteracted ? {
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 40px rgba(34,211,238,0.1)",
              "0 0 0px rgba(255,255,255,0)"
            ]
          } : {}}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative"
        >
          <Magnetic strength={0.4}>
            <button
              onClick={handlePlay}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-white text-black rounded-full hover:scale-105 transition-all flex items-center justify-center group shadow-2xl relative z-30 overflow-hidden"
              aria-label={isPlaying && isCurrentTrack ? "Pause Track" : "Play Track"}
            >
              {/* Internal Glow Effect */}
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <AnimatePresence mode="wait">
                {isPlaying && isCurrentTrack ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  >
                    <HugeiconsIcon icon={PauseIcon} className="w-10 h-10 md:w-14 md:h-14" color="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  >
                    <HugeiconsIcon icon={PlayIcon} className="w-10 h-10 md:w-14 md:h-14 ml-2 md:ml-3" color="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </Magnetic>
        </motion.div>

        {hasInteracted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-4 px-6 w-full max-w-[320px] md:max-w-none"
          >
             <Magnetic strength={0.2}>
               <Button 
                variant="outline"
                size="lg" 
                className="cta-reveal w-full md:w-auto rounded-full border-white/20 bg-transparent text-white hover:bg-white hover:text-black font-functional px-8 py-6 text-sm md:text-base tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                Get Access — {track.price}
              </Button>
             </Magnetic>
          </motion.div>
        )}
      </div>

      {/* Hero Bottom Info - Reveal on interaction */}
      <AnimatePresence>
        {hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-6 right-6 md:left-12 flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6"
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Now Playing</span>
              <span className="text-white font-functional text-xs md:text-sm">{track.title}</span>
            </div>
            <div className="hidden md:block h-0.5 w-12 bg-accent/30" />
            <span className="text-accent text-[8px] md:text-[10px] tracking-widest uppercase">Lossless Audio</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
