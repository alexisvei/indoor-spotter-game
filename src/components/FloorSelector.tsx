
import React from "react";
import { Button } from "@/components/ui/button";
import { FloorMap } from "@/data/gameData";

interface FloorSelectorProps {
  floors: FloorMap[];
  selectedFloor: number | null;
  onSelectFloor: (floor: number) => void;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({
  floors,
  selectedFloor,
  onSelectFloor,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-md font-medium">Select Floor</h3>
      <div className="flex flex-wrap gap-2">
        {floors.map((floor) => (
          <Button
            key={floor.floor}
            variant={selectedFloor === floor.floor ? "default" : "outline"}
            onClick={() => onSelectFloor(floor.floor)}
            className="flex-1"
          >
            {floor.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
