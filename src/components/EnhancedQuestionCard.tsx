import React from 'react';
import { Question, Player } from '../types/game';
import { Clock, CheckCircle, XCircle, ExternalLink, Flame, Zap } from 'lucide-react';

interface EnhancedQuestionCardProps {
  question: Question;
  timeLeft: number;
  onAnswerSelect: (answerIndex: number) => void;
  isAnswered: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
  currentPlayer: Player;
  isMultiplayer?: boolean;
  otherPlayersAnswered?: number;
  totalPlayers?: number;
}

export const EnhancedQuestionCard: React.FC<EnhancedQuestionCardProps> = ({
  question,
  timeLeft,
  onAnswerSelect,
  isAnswered,
  selectedAnswer,
  showExplanation,
  currentPlayer,
  isMultiplayer = false,
  otherPlayersAnswered = 0,
  totalPlayers = 1
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return 'text-green-400';
    if (timeLeft > 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return 'hover:bg-slate-700 hover:border-slate-600 cursor-pointer transform hover:scale-102 text-white';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-900/50 border-green-400 text-green-100';
    }
    
    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-900/50 border-red-400 text-red-100';
    }
    
    return 'bg-slate-800/50 border-slate-600 text-slate-300';
  };

  const calculateTimeBonus = () => {
    if (timeLeft > 25) return 3;
    if (timeLeft > 20) return 2;
    if (timeLeft > 15) return 1;
    return 0;
  };

  const calculateStreakBonus = () => {
    if (currentPlayer.streak >= 10) return 5;
    if (currentPlayer.streak >= 5) return 3;
    if (currentPlayer.streak >= 3) return 1;
    return 0;
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty} • {question.points} {question.points === 1 ? 'point' : 'points'}
          </span>
          {question.service && (
            <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-400 bg-blue-400/20">
              {question.service}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${question.category.color}/20 text-white`}>
            {question.category.icon} {question.category.name}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentPlayer.streak > 0 && (
            <div className="flex items-center space-x-1 text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-bold">{currentPlayer.streak}</span>
            </div>
          )}
          <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
            <Clock className="w-5 h-5" />
            <span className="text-xl font-bold">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {isMultiplayer && (
        <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300">Players answered:</span>
            <span className="text-white font-bold">{otherPlayersAnswered}/{totalPlayers}</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(otherPlayersAnswered / totalPlayers) * 100}%` }}
            />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
        {question.question}
      </h2>

      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={isAnswered}
            className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(index)}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">
                <span className="font-bold text-orange-400 mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </span>
              {isAnswered && index === question.correctAnswer && (
                <CheckCircle className="w-6 h-6 text-green-400" />
              )}
              {isAnswered && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
            </div>
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
            <div className="text-center">
              {selectedAnswer === question.correctAnswer ? (
                <div className="space-y-2">
                  <div className="text-green-400 font-bold text-lg">
                    🎉 Correct! +{question.points} points
                  </div>
                  {calculateTimeBonus() > 0 && (
                    <div className="text-blue-400 text-sm flex items-center justify-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Speed bonus: +{calculateTimeBonus()} points
                    </div>
                  )}
                  {calculateStreakBonus() > 0 && (
                    <div className="text-orange-400 text-sm flex items-center justify-center">
                      <Flame className="w-4 h-4 mr-1" />
                      Streak bonus: +{calculateStreakBonus()} points
                    </div>
                  )}
                </div>
              ) : selectedAnswer === -1 ? (
                <div className="text-yellow-400 font-bold text-lg">
                  ⏰ Time's up! The correct answer was {String.fromCharCode(65 + question.correctAnswer)}.
                </div>
              ) : (
                <div className="text-red-400 font-bold text-lg">
                  ❌ Incorrect! The correct answer was {String.fromCharCode(65 + question.correctAnswer)}.
                </div>
              )}
            </div>
          </div>

          {showExplanation && question.explanation && (
            <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
              <h4 className="text-blue-400 font-bold mb-2">Explanation</h4>
              <p className="text-slate-300 mb-3">{question.explanation}</p>
              {question.documentationLink && (
                <a
                  href={question.documentationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View AWS Documentation
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};