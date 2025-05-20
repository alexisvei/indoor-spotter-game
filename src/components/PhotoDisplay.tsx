
import React from "react";

interface PhotoDisplayProps {
  photoUrl: string;
  roundNumber: number;
}

const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photoUrl, roundNumber }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-center">Round {roundNumber}</h2>
      <div className="photo-container">
        <img 
          src={photoUrl} 
          alt={`Round ${roundNumber} location`} 
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-center text-muted-foreground">
        Where was this photo taken? Select a floor and then click on the map.
      </p>
    </div>
  );
};

export default PhotoDisplay;
