"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAudioStore } from "@/store/audioStore";

export function WaveformPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const { currentTrack, isPlaying, togglePlayPause, updateProgress, setVolume, volume } = useAudioStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#3f3f46", // text-muted
      progressColor: "#14b8a6", // primary accent
      cursorColor: "#22d3ee", // secondary accent
      barWidth: 2,
      barGap: 3,
      barRadius: 2,
      height: 48,
      normalize: true,
      fillParent: true,
      url: currentTrack?.audioUrl || "", 
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
      togglePlayPause();
    });

    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, [currentTrack]);

  useEffect(() => {
    if (!wavesurferRef.current || !isReady) return;
    
    if (isPlaying) {
      wavesurferRef.current.play();
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border p-4 shadow-2xl">
      <div className="container max-w-5xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-48 shrink-0">
          <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-12 h-12 rounded-md object-cover" />
          <div className="overflow-hidden">
            <h4 className="text-white font-medium truncate text-sm">{currentTrack.title}</h4>
            <p className="text-muted-foreground text-xs truncate">{currentTrack.artist}</p>
          </div>
        </div>
        
        {/* Waveform */}
        <div className="flex-1 w-full" ref={containerRef} />
      </div>
    </div>
  );
}
