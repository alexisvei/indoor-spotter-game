
import React, { useState } from "react";
import { FloorMap } from "@/data/gameData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Circle, CircleCheck, CircleX } from "lucide-react";

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

  // Calculate distance between guess and actual position (if available)
  const calculateDistance = () => {
    if (!guessedPosition || !actualPosition) return null;
    
    const dx = guessedPosition.x - actualPosition.x;
    const dy = guessedPosition.y - actualPosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Get accuracy percentage based on distance
  const getAccuracy = () => {
    const distance = calculateDistance();
    if (distance === null) return null;
    
    // 141.42 is the maximum possible distance on a 100x100 grid
    return Math.max(0, Math.round(100 * (1 - Math.min(1, distance / 141.42))));
  };

  const accuracy = getAccuracy();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-md font-medium">
        {selectedFloor !== null 
          ? `Floor Map: ${floorMaps.find(f => f.floor === selectedFloor)?.name}` 
          : "Select a floor to view its map"}
      </h3>
      
      {selectedMap ? (
        <div className="relative">
          <div 
            className={`map-container ${isClickable ? 'cursor-crosshair' : 'cursor-default'} relative overflow-hidden rounded-lg border border-muted`}
            onClick={handleMapClick}
          >
            <img 
              src={selectedMap.mapUrl} 
              alt={`Floor ${selectedMap.floor} map`} 
              className="w-full h-full object-cover"
            />
            
            {guessedPosition && (
              <div 
                className="map-marker guess-marker absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center"
                style={{
                  left: `${guessedPosition.x}%`,
                  top: `${guessedPosition.y}%`,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-game-primary flex items-center justify-center text-white">
                  <Circle className="h-5 w-5" />
                </div>
              </div>
            )}
            
            {showActual && actualPosition && (
              <>
                <div 
                  className="map-marker actual-marker absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center"
                  style={{
                    left: `${actualPosition.x}%`,
                    top: `${actualPosition.y}%`,
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-game-correct flex items-center justify-center text-white">
                    <CircleCheck className="h-5 w-5" />
                  </div>
                </div>
                
                {/* Line connecting guess and actual */}
                {guessedPosition && (
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                    <line
                      x1={`${guessedPosition.x}%`}
                      y1={`${guessedPosition.y}%`}
                      x2={`${actualPosition.x}%`}
                      y2={`${actualPosition.y}%`}
                      stroke="rgba(255,0,0,0.5)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  </svg>
                )}
              </>
            )}
          </div>
          
          {showActual && guessedPosition && actualPosition && (
            <div className="mt-3">
              <Alert className={accuracy && accuracy > 70 ? "border-game-correct bg-game-correct/10" : "border-game-incorrect bg-game-incorrect/10"}>
                <AlertDescription className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Position Accuracy</span>
                    <span className={`font-bold ${accuracy && accuracy > 70 ? "text-game-correct" : "text-game-incorrect"}`}>
                      {accuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${accuracy && accuracy > 70 ? "bg-game-correct" : "bg-game-incorrect"}`} 
                      style={{width: `${accuracy}%`}}
                    ></div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      ) : (
        <div className="map-container flex items-center justify-center bg-muted h-64 rounded-lg">
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
