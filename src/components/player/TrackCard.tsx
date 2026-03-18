"use client";

import { Track } from "@/lib/data";
import { useAudioStore } from "@/store/audioStore";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function TrackCard({ track }: { track: Track }) {
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
    <div className="group relative flex-none w-[280px] sm:w-[320px] snap-center shrink-0 space-y-4 cursor-pointer" onClick={handlePlay}>
      <div className="relative aspect-square overflow-hidden rounded-[16px] border border-white/10 shadow-xl transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        <img 
          src={track.coverUrl} 
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <button 
            className="w-16 h-16 bg-accent/90 text-background rounded-full hover:bg-accent transition-transform shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center scale-90 group-hover:scale-100"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            {isPlaying && isCurrentTrack ? (
              <HugeiconsIcon icon={PauseIcon} size={24} color="currentColor" />
            ) : (
              <HugeiconsIcon icon={PlayIcon} size={24} color="currentColor" className="ml-1" />
            )}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white truncate group-hover:text-accent transition-colors">{track.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
      </div>
    </div>
  );
}
