import { getTracks } from "@/lib/data";
import { HeroPlayer } from "@/components/player/HeroPlayer";
import { WaveformPlayer } from "@/components/player/WaveformPlayer";
import { TrackCard } from "@/components/player/TrackCard";

export default async function Home() {
  const tracks = await getTracks();
  
  // Use first track for Hero, others for Latest Releases
  const featuredTrack = tracks[0];
  const otherTracks = tracks.slice(1);

  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-black">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-linear-to-b from-background/90 to-transparent">
        <div className="flex items-center gap-3">
          <img src="/LOGO-FINAL.png" alt="NILXNJXN Logo" className="h-10 w-auto" />
          <div className="text-xl font-mrs-sheppards text-white tracking-widest leading-none mt-1">nilxnjxn</div>
        </div>
        <div className="flex gap-6 text-sm font-medium text-muted-foreground mr-4">
          <a href="/music" className="hover:text-white transition-colors">Music</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      {featuredTrack && <HeroPlayer track={featuredTrack} />}
      
      {/* Latest Releases - Horizontal Scroll */}
      {otherTracks.length > 0 && (
        <section className="py-24 px-6 relative z-10 bg-background/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Latest Releases</h2>
            
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {otherTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section preview with public image */}
      <section className="py-32 px-6 relative z-10 bg-[#060606]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-4/5 rounded-[24px] overflow-hidden">
             <img src="/extra/250519DSC_0023.webp" alt="Artist Profile" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Behind the Sound</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              NILXNJXN creates immersive electronic soundscapes that blur the lines between 
              ambient nostalgia and forward-thinking club rhythms. Every release is a 
              statement—available here directly from the artist.
            </p>
            <a href="/about" className="inline-block mt-4 text-accent hover:text-white transition-colors border-b border-accent/30 pb-1">
              Read full story →
            </a>
          </div>
        </div>
      </section>

      {/* Global Bottom Waveform Player */}
      <WaveformPlayer />

      {/* Footer */}
      <footer className="w-full pb-32 pt-24 flex flex-col items-center justify-center text-muted-foreground text-xs gap-4 relative z-10 border-t border-white/5 bg-background">
        <div className="flex gap-6">
          <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/refunds" className="hover:text-white transition-colors">Refund Policy</a>
        </div>
        <p>&copy; {new Date().getFullYear()} NILXNJXN. All rights reserved.</p>
        <img src="/LOGO-FINAL.png" alt="NILXNJXN Logo" className="h-6 w-auto opacity-30 grayscale hover:grayscale-0 transition-all hover:opacity-100 mt-4" />
      </footer>
    </main>
  );
}
