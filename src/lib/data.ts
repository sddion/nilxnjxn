import fs from "fs";
import path from "path";

export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
  price: string;
  duration?: string;
  slug?: string;
  season?: "FRESH" | "AKAD" | "LATE";
}

export async function getTracks(): Promise<Track[]> {
  const dirPath = path.join(process.cwd(), "public", "cover-arts");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dirPath);
  } catch (err) {
    console.error("Error reading cover-arts directory", err);
  }

  const seasons: ("FRESH" | "AKAD" | "LATE")[] = ["FRESH", "AKAD", "LATE"];

  return files.map((file, i) => {
    const rawTitle = file.replace(/\.[^/.]+$/, "").replace(/-COVER/i, "");
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1).toLowerCase();
    const upperFile = file.toUpperCase();
    
    let season: "FRESH" | "AKAD" | "LATE" = seasons[i % 3];
    if (upperFile.includes("FRESH")) season = "FRESH";
    else if (upperFile.includes("AKAD")) season = "AKAD";
    else if (upperFile.includes("LATE")) season = "LATE";

    return {
      id: `trk_${i}`,
      title,
      artist: "NILXNJXN",
      coverUrl: `/cover-arts/${file}`,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      price: "₹150",
      slug: rawTitle.toLowerCase(),
      season,
    };
  });
}
