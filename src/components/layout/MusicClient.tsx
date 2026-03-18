"use client";

import { useState, useRef, useLayoutEffect, useMemo } from "react";
import { Track } from "@/lib/data";
import { TrackCard } from "@/components/player/TrackCard";
import { Search01Icon, CircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

interface MusicClientProps {
  tracks: Track[];
}

type MoodFilter = 'ALL' | 'FRESH' | 'AKAD' | 'LATE';

export function MusicClient({ tracks }: MusicClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<MoodFilter>('ALL');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredTracks = useMemo(() => {
    return tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMood = filter === 'ALL' ? true : track.season === filter;
      return matchesSearch && matchesMood;
    });
  }, [tracks, searchQuery, filter]);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".track-item");
      if (items.length === 0) return;

      gsap.from(items, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, gridRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [filteredTracks.length]);

  return (
    <main className="min-h-screen bg-background pb-32 pt-32 px-6 selection:bg-accent selection:text-black">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="flex flex-col gap-12 pt-8">
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl lg:text-9xl font-expressive text-white tracking-tighter"
            >
              The Archive
            </motion.h1>
            <p className="text-white/30 font-functional text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
              Exploration of Human Behavior through Sound
            </p>
          </div>

          {/* Filters & Search - Fully Responsive */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
            <div className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
              <div className="flex items-center gap-3 min-w-max">
                {(['ALL', 'FRESH', 'AKAD', 'LATE'] as const).map((mood) => (
                  <Magnetic key={mood} strength={0.2}>
                    <button
                      onClick={() => setFilter(mood)}
                      className={cn(
                        "px-8 py-2.5 rounded-full text-[10px] font-functional font-bold uppercase tracking-[0.2em] transition-all border",
                        filter === mood 
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                          : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                      )}
                    >
                      {mood}
                    </button>
                  </Magnetic>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:max-w-md group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                <HugeiconsIcon icon={Search01Icon} size={18} />
              </div>
              <input 
                type="text"
                placeholder="SEARCH FREQUENCY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-full pl-16 pr-8 text-[11px] font-functional tracking-[0.2em] text-white focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all placeholder:text-white/10 uppercase"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 justify-items-center min-h-[400px]"
        >
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="w-full flex justify-center track-item"
              >
                <TrackCard track={track} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <h3 className="text-white/10 font-expressive text-8xl md:text-9xl select-none">Void...</h3>
              <p className="text-accent font-functional text-[10px] uppercase tracking-[0.5em] mt-8">Frequency vanished into the shadows</p>
            </div>
          )}
        </div>
      </div>

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
        <img src="/noise.png" alt="" className="w-full h-full object-cover" />
      </div>
    </main>
  );
}
