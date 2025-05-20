
import React, { useState } from "react";
import GameContainer from "@/components/GameContainer";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <div className="max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 text-3xl font-bold">
              <MapPin className="h-8 w-8 text-game-primary" />
              <span>Indoor Explorer</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Test Your Indoor Navigation Skills</h1>
          
          <p className="text-lg mb-8 text-muted-foreground">
            Can you recognize where photos were taken inside a building? 
            Guess the floor and location for each photo to earn points.
          </p>
          
          <div className="bg-card p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">How to Play</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-3 rounded-lg bg-muted/30">
                <h3 className="font-medium mb-1">Step 1</h3>
                <p className="text-sm text-muted-foreground">
                  Observe the photo carefully to identify details about its location.
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <h3 className="font-medium mb-1">Step 2</h3>
                <p className="text-sm text-muted-foreground">
                  Select which floor you think the photo was taken on.
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <h3 className="font-medium mb-1">Step 3</h3>
                <p className="text-sm text-muted-foreground">
                  Click on the floor map to pinpoint the exact location.
                </p>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>You'll earn points for each correct floor and for how close your position guess is.</p>
              <p>Play through 10 challenging rounds to test your spatial awareness!</p>
            </div>
          </div>
          
          <Button
            onClick={startGame}
            className="bg-game-primary hover:bg-game-primary/90 px-8 py-6 text-lg"
          >
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <GameContainer />
    </div>
  );
};

export default Index;
