import React from 'react';
import { GameState } from '../types/game';
import { Trophy, Star, Award, RefreshCw } from 'lucide-react';

interface GameCompleteProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export const GameComplete: React.FC<GameCompleteProps> = ({ gameState, onPlayAgain }) => {
  const getGrade = () => {
    const percentage = (gameState.score / 60) * 100; // Max possible score is 60 (30 questions * 2 avg points)
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-400', message: 'Outstanding! You\'re AWS certified material!' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', message: 'Excellent work! Almost ready for the real exam!' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-400', message: 'Great job! Keep studying to reach excellence!' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-400', message: 'Good effort! A bit more practice will help!' };
    if (percentage >= 50) return { grade: 'C+', color: 'text-yellow-400', message: 'Not bad! Review the concepts and try again!' };
    return { grade: 'C', color: 'text-orange-400', message: 'Keep learning! AWS mastery takes practice!' };
  };

  const { grade, color, message } = getGrade();
  const isWinner = gameState.badges >= 10;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-12 border border-slate-700 shadow-2xl">
          <div className="mb-8">
            {isWinner ? (
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-bounce" />
            ) : (
              <Award className="w-24 h-24 text-orange-400 mx-auto mb-4" />
            )}
            
            <h1 className="text-4xl font-bold text-white mb-4">
              {isWinner ? 'Congratulations! 🎉' : 'Quiz Complete! 📚'}
            </h1>
            
            <p className="text-xl text-slate-300 mb-6">
              {isWinner 
                ? 'You\'ve earned 10+ Cloud Badges and mastered AWS concepts!'
                : 'You\'ve completed the AWS Cert Clash challenge!'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {gameState.score}
              </div>
              <div className="text-slate-300">Total Points</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {gameState.badges}
              </div>
              <div className="text-slate-300">Cloud Badges</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {gameState.unlockedServices.length}
              </div>
              <div className="text-slate-300">Services Unlocked</div>
            </div>
          </div>

          <div className="mb-8">
            <div className={`text-6xl font-bold ${color} mb-2`}>
              {grade}
            </div>
            <p className="text-lg text-slate-300">
              {message}
            </p>
          </div>

          {gameState.unlockedServices.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                AWS Services You've Mastered:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {gameState.unlockedServices.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <RefreshCw className="mr-2 w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};