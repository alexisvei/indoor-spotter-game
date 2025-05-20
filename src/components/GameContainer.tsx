
import React, { useState, useEffect } from "react";
import { gameRounds, floorMaps, calculateScore, calculateDistance } from "@/data/gameData";
import PhotoDisplay from "./PhotoDisplay";
import FloorSelector from "./FloorSelector";
import MapSelector from "./MapSelector";
import ScoreBoard from "./ScoreBoard";
import ResultsSummary from "./ResultsSummary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleX } from "lucide-react";

interface RoundGuess {
  floor: number;
  position: { x: number; y: number };
}

interface RoundResult {
  roundNumber: number;
  score: number;
  guessedFloor: number;
  correctFloor: number;
  floorAccurate: boolean;
  positionAccuracy: number;
}

const GameContainer: React.FC = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  
  // Round state
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  
  // Reset round state
  const resetRoundState = () => {
    setSelectedFloor(null);
    setSelectedPosition(null);
    setIsGuessSubmitted(false);
    setRoundScore(0);
  };
  
  // Start new game
  const startNewGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setCurrentRound(1);
    setTotalScore(0);
    setRoundResults([]);
    resetRoundState();
  };
  
  // Handle floor selection
  const handleFloorSelect = (floor: number) => {
    if (isGuessSubmitted) return;
    setSelectedFloor(floor);
  };
  
  // Handle position selection
  const handlePositionSelect = (position: { x: number; y: number }) => {
    if (isGuessSubmitted || selectedFloor === null) return;
    setSelectedPosition(position);
  };
  
  // Handle guess submission
  const submitGuess = () => {
    if (!selectedFloor || !selectedPosition || isGuessSubmitted) return;
    
    const round = gameRounds[currentRound - 1];
    const score = calculateScore(
      selectedFloor,
      round.correctFloor,
      selectedPosition,
      round.correctPosition
    );
    
    // Calculate position accuracy as a percentage (100% = perfect)
    const maxDistance = 141.42; // Maximum possible distance on a 100x100 grid
    const distance = calculateDistance(selectedPosition, round.correctPosition);
    const positionAccuracy = Math.round(100 * (1 - Math.min(1, distance / maxDistance)));
    
    // Save round result
    const result: RoundResult = {
      roundNumber: currentRound,
      score,
      guessedFloor: selectedFloor,
      correctFloor: round.correctFloor,
      floorAccurate: selectedFloor === round.correctFloor,
      positionAccuracy,
    };
    
    setRoundResults(prev => [...prev, result]);
    setTotalScore(prev => prev + score);
    setRoundScore(score);
    setIsGuessSubmitted(true);
  };
  
  // Handle next round
  const handleNextRound = () => {
    if (currentRound >= gameRounds.length) {
      setGameEnded(true);
      return;
    }
    
    setCurrentRound(prev => prev + 1);
    resetRoundState();
  };
  
  // Auto-submit when both floor and position are selected
  useEffect(() => {
    if (selectedFloor !== null && selectedPosition !== null && !isGuessSubmitted) {
      submitGuess();
    }
  }, [selectedFloor, selectedPosition, isGuessSubmitted]);
  
  // Start the game automatically if not started
  useEffect(() => {
    if (!gameStarted) {
      startNewGame();
    }
  }, [gameStarted]);
  
  if (gameEnded) {
    return (
      <ResultsSummary
        totalScore={totalScore}
        maxPossibleScore={gameRounds.length * 1000}
        roundResults={roundResults}
        onPlayAgain={startNewGame}
      />
    );
  }
  
  const currentGameRound = gameRounds[currentRound - 1];
  const correctFloorName = floorMaps.find(f => f.floor === currentGameRound.correctFloor)?.name;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ScoreBoard
        currentRound={currentRound}
        totalRounds={gameRounds.length}
        score={totalScore}
        onNextRound={handleNextRound}
        isRoundComplete={isGuessSubmitted}
        roundScore={roundScore}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <PhotoDisplay 
          photoUrl={currentGameRound.photoUrl} 
          roundNumber={currentRound}
        />
        
        <div className="flex flex-col gap-4">
          <FloorSelector
            floors={floorMaps}
            selectedFloor={selectedFloor}
            onSelectFloor={handleFloorSelect}
          />
          
          {isGuessSubmitted && selectedFloor !== null && (
            <Alert className={selectedFloor === currentGameRound.correctFloor 
              ? "border-game-correct bg-game-correct/10 mb-2" 
              : "border-game-incorrect bg-game-incorrect/10 mb-2"
            }>
              <div className="flex items-center gap-2">
                {selectedFloor === currentGameRound.correctFloor ? (
                  <CircleCheck className="h-5 w-5 text-game-correct" />
                ) : (
                  <CircleX className="h-5 w-5 text-game-incorrect" />
                )}
                <AlertDescription className="flex-1">
                  {selectedFloor === currentGameRound.correctFloor 
                    ? <span>Correct! This photo was taken on the <strong>{correctFloorName}</strong>.</span>
                    : <span>Incorrect. This photo was taken on the <strong>{correctFloorName}</strong>, not on {floorMaps.find(f => f.floor === selectedFloor)?.name}.</span>
                  }
                </AlertDescription>
              </div>
            </Alert>
          )}
          
          <MapSelector
            selectedFloor={selectedFloor}
            floorMaps={floorMaps}
            onSelectPosition={handlePositionSelect}
            guessedPosition={selectedPosition}
            actualPosition={isGuessSubmitted ? currentGameRound.correctPosition : null}
            showActual={isGuessSubmitted}
            isClickable={!isGuessSubmitted && selectedFloor !== null}
          />
          
          {isGuessSubmitted && (
            <div className="p-4 rounded-lg bg-card shadow-sm border">
              <h3 className="font-medium mb-2">Actual Location:</h3>
              <p>Floor: {floorMaps.find(f => f.floor === currentGameRound.correctFloor)?.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{currentGameRound.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
