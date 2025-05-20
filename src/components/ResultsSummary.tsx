
import React from "react";
import { Button } from "@/components/ui/button";

interface RoundResult {
  roundNumber: number;
  score: number;
  guessedFloor: number;
  correctFloor: number;
  floorAccurate: boolean;
  positionAccuracy: number; // Percentage of position accuracy
}

interface ResultsSummaryProps {
  totalScore: number;
  maxPossibleScore: number;
  roundResults: RoundResult[];
  onPlayAgain: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  totalScore,
  maxPossibleScore,
  roundResults,
  onPlayAgain,
}) => {
  const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100);
  const correctFloors = roundResults.filter(r => r.floorAccurate).length;
  
  // Calculate average position accuracy
  const avgPositionAccuracy = Math.round(
    roundResults.reduce((sum, r) => sum + r.positionAccuracy, 0) / roundResults.length
  );
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Game Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Total Score</p>
          <p className="text-3xl font-bold text-game-primary">{totalScore}</p>
          <p className="text-sm text-muted-foreground">out of {maxPossibleScore}</p>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Correct Floors</p>
          <p className="text-3xl font-bold text-game-secondary">{correctFloors}</p>
          <p className="text-sm text-muted-foreground">out of {roundResults.length}</p>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Position Accuracy</p>
          <p className="text-3xl font-bold text-game-accent">{avgPositionAccuracy}%</p>
          <p className="text-sm text-muted-foreground">average</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Round Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="py-2 px-3 text-left">Round</th>
                <th className="py-2 px-3 text-right">Score</th>
                <th className="py-2 px-3 text-center">Floor</th>
                <th className="py-2 px-3 text-right">Position Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {roundResults.map((result) => (
                <tr key={result.roundNumber} className="border-b border-muted">
                  <td className="py-2 px-3">{result.roundNumber}</td>
                  <td className="py-2 px-3 text-right">{result.score}</td>
                  <td className="py-2 px-3 text-center">
                    {result.floorAccurate ? (
                      <span className="text-game-correct">Correct</span>
                    ) : (
                      <span className="text-game-incorrect">
                        {result.guessedFloor} ≠ {result.correctFloor}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-right">{result.positionAccuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={onPlayAgain}
          className="bg-game-primary hover:bg-game-primary/90 px-8 py-6 text-lg"
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default ResultsSummary;
