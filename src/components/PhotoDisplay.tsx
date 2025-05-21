
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoDisplayProps {
  photoUrl: string;
  roundNumber: number;
}

const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photoUrl, roundNumber }) => {
  const [showFullScreen, setShowFullScreen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3);
  const [imageViewed, setImageViewed] = useState(false);

  useEffect(() => {
    if (showFullScreen) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowFullScreen(false);
            setImageViewed(true);
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
      
      <div className={cn(
        "photo-container transition-opacity duration-300",
        imageViewed && "opacity-30 hover:opacity-100"
      )}>
        <img 
          src={photoUrl} 
          alt={`Round ${roundNumber} location`} 
          className="w-full h-full object-cover"
          onClick={() => !showFullScreen && setShowFullScreen(true)}
        />
      </div>
      
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
