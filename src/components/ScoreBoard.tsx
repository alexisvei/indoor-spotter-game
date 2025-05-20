
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ScoreBoardProps {
  currentRound: number;
  totalRounds: number;
  score: number;
  onNextRound: () => void;
  isRoundComplete: boolean;
  roundScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  currentRound,
  totalRounds,
  score,
  onNextRound,
  isRoundComplete,
  roundScore,
}) => {
  const [animateScore, setAnimateScore] = useState(false);
  
  useEffect(() => {
    if (roundScore > 0) {
      setAnimateScore(true);
      const timer = setTimeout(() => setAnimateScore(false), 500);
      return () => clearTimeout(timer);
    }
  }, [roundScore]);

  return (
    <div className="flex flex-col gap-4">
      <div className="round-progress">
        {Array.from({ length: totalRounds }).map((_, index) => (
          <div 
            key={index}
            className={`round-indicator ${
              index === currentRound - 1 
                ? "active" 
                : index < currentRound - 1 
                  ? "completed" 
                  : ""
            }`}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Round: {currentRound}/{totalRounds}</p>
          <p className="text-2xl font-bold">
            Total Score: <span className={animateScore ? "score-pulse" : ""}>{score}</span>
          </p>
        </div>
        
        {isRoundComplete && (
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium">Round Score:</p>
            <p className={`text-xl font-bold ${animateScore ? "score-pulse text-game-primary" : ""}`}>
              +{roundScore}
            </p>
          </div>
        )}
      </div>
      
      {isRoundComplete && (
        <Button 
          onClick={onNextRound}
          className="bg-game-primary hover:bg-game-primary/90"
        >
          {currentRound < totalRounds ? "Next Round" : "View Results"}
        </Button>
      )}
    </div>
  );
};

export default ScoreBoard;
