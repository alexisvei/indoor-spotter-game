
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Timer, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoDisplayProps {
  photoUrl: string;
  roundNumber: number;
}

const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photoUrl, roundNumber }) => {
  const [showFullScreen, setShowFullScreen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3);
  const [imageViewed, setImageViewed] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    if (showFullScreen) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowFullScreen(false);
            setImageViewed(true);
            setShowThumbnail(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showFullScreen]);

  // Reset the state when the round changes
  useEffect(() => {
    setShowFullScreen(true);
    setTimeLeft(3);
    setImageViewed(false);
    setShowThumbnail(true);
  }, [roundNumber]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-center">Round {roundNumber}</h2>
      
      {/* Full screen preview dialog */}
      <Dialog open={showFullScreen} onOpenChange={setShowFullScreen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black border-none">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <img 
              src={photoUrl} 
              alt={`Round ${roundNumber} location`} 
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <Timer className="h-5 w-5" />
              <span className="text-lg font-bold">{timeLeft}s</span>
            </div>
            <p className="text-white mt-4 text-center">Memorize this location!</p>
          </div>
        </DialogContent>
      </Dialog>
      
      {showThumbnail ? (
        <div className="photo-container">
          <img 
            src={photoUrl} 
            alt={`Round ${roundNumber} location`} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div 
          className="photo-container bg-muted flex items-center justify-center h-48 cursor-pointer border border-dashed border-muted-foreground"
          onClick={() => setShowFullScreen(true)}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm">Click to view photo</span>
          </div>
        </div>
      )}
      
      <p className="text-sm text-center text-muted-foreground">
        {imageViewed ? 
          "Where was this photo taken? Select a floor and then click on the map." :
          "Memorizing the location..."
        }
      </p>
      {imageViewed && (
        <button 
          onClick={() => setShowFullScreen(true)}
          className="text-xs text-center text-game-primary hover:underline"
        >
          View photo again
        </button>
      )}
    </div>
  );
};

export default PhotoDisplay;
