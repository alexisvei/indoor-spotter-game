
import React, { useState } from "react";
import { FloorMap } from "@/data/gameData";

interface MapSelectorProps {
  selectedFloor: number | null;
  floorMaps: FloorMap[];
  onSelectPosition: (position: { x: number; y: number }) => void;
  guessedPosition: { x: number; y: number } | null;
  actualPosition?: { x: number; y: number } | null;
  showActual: boolean;
  isClickable: boolean;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  selectedFloor,
  floorMaps,
  onSelectPosition,
  guessedPosition,
  actualPosition,
  showActual,
  isClickable,
}) => {
  const selectedMap = floorMaps.find(f => f.floor === selectedFloor);
  
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    
    onSelectPosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-md font-medium">
        {selectedFloor !== null 
          ? `Floor Map: ${floorMaps.find(f => f.floor === selectedFloor)?.name}` 
          : "Select a floor to view its map"}
      </h3>
      {selectedMap ? (
        <div 
          className={`map-container ${isClickable ? 'cursor-crosshair' : 'cursor-default'}`}
          onClick={handleMapClick}
        >
          <img 
            src={selectedMap.mapUrl} 
            alt={`Floor ${selectedMap.floor} map`} 
            className="w-full h-full object-cover"
          />
          
          {guessedPosition && (
            <div 
              className="map-marker guess-marker"
              style={{
                left: `${guessedPosition.x}%`,
                top: `${guessedPosition.y}%`,
              }}
            />
          )}
          
          {showActual && actualPosition && (
            <div 
              className="map-marker actual-marker"
              style={{
                left: `${actualPosition.x}%`,
                top: `${actualPosition.y}%`,
              }}
            />
          )}
        </div>
      ) : (
        <div className="map-container flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Select a floor to view its map</p>
        </div>
      )}
      
      {showActual && guessedPosition && actualPosition && (
        <div className="flex gap-4 text-sm mt-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-game-primary"></div>
            <span>Your guess</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-game-correct"></div>
            <span>Actual location</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
