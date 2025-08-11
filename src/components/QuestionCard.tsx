import React from 'react';
import { Question } from '../types/game';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  timeLeft: number;
  onAnswerSelect: (answerIndex: number) => void;
  isAnswered: boolean;
  selectedAnswer: number | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  timeLeft,
  onAnswerSelect,
  isAnswered,
  selectedAnswer
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
        </div>
        
        <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
          <Clock className="w-5 h-5" />
          <span className="text-xl font-bold">{timeLeft}s</span>
        </div>
      </div>

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
        <div className="mt-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600">
          <div className="text-center">
            {selectedAnswer === question.correctAnswer ? (
              <div className="text-green-400 font-bold text-lg">
                🎉 Correct! +{question.points} points
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
      )}
    </div>
  );
};