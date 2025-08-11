import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { GameState, AnswerResult } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { GameHUD } from './GameHUD';
import { GameComplete } from './GameComplete';
import { ServiceUnlock } from './ServiceUnlock';
import { updatePlayerStats, applyAnswerResult, calculateScore } from '../utils/gameLogic';

interface QuizGameProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ gameState, setGameState }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showServiceUnlock, setShowServiceUnlock] = useState(false);
  const [unlockedService, setUnlockedService] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setSelectedAnswer(-1); // Indicates time up
    
    // Lose a life for time up
    const currentPlayer = gameState.currentPlayer;
    const newLives = Math.max(0, currentPlayer.lives - 1);
    
    const updatedPlayer = updatePlayerStats(currentPlayer, {
      lives: newLives
    });

    const updatedPlayers = gameState.players.map(player => 
      player.id === currentPlayer.id ? updatedPlayer : player
    );

    setGameState({
      ...gameState,
      currentPlayer: updatedPlayer,
      players: updatedPlayers
    });

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const currentPlayer = gameState.currentPlayer;
    const timeToAnswer = 30 - timeLeft;
    
    // Calculate score using the utility function
    const scoreResult = calculateScore(currentQuestion, timeToAnswer, 30, isCorrect, currentPlayer.streak);
    
    // Create answer result object
    const answerResult: AnswerResult = {
      isCorrect,
      pointsEarned: scoreResult.points,
      timeToAnswer,
      streakBonus: scoreResult.streakBonus,
      timeBonus: scoreResult.timeBonus
    };
    
    if (isCorrect) {
      const updatedPlayer = applyAnswerResult(currentPlayer, answerResult, currentQuestion);
      const shouldUnlockService = currentQuestion.service && !currentPlayer.unlockedServices.includes(currentQuestion.service);

      const updatedPlayers = gameState.players.map(player => 
        player.id === currentPlayer.id ? updatedPlayer : player
      );
      
      const newGameState = {
        ...gameState,
        currentPlayer: updatedPlayer,
        players: updatedPlayers
      };
      
      setGameState(newGameState);

      if (shouldUnlockService) {
        setUnlockedService(currentQuestion.service!);
        setShowServiceUnlock(true);
        
        // Auto-hide service unlock and proceed to next question
        setTimeout(() => {
          setShowServiceUnlock(false);
          setUnlockedService(null);
          nextQuestion();
        }, 3000);
      } else {
        // No service unlock, proceed normally
        setTimeout(() => {
          nextQuestion();
        }, 2000);
      }
    } else {
      const updatedPlayer = applyAnswerResult(currentPlayer, answerResult, currentQuestion);

      const updatedPlayers = gameState.players.map(player => 
        player.id === currentPlayer.id ? updatedPlayer : player
      );

      setGameState({
        ...gameState,
        currentPlayer: updatedPlayer,
        players: updatedPlayers
      });

      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      setGameState({
        ...gameState,
        screen: 'complete'
      });
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowServiceUnlock(false);
    setUnlockedService(null);
    
    const currentPlayer = gameState.currentPlayer;
    const resetPlayer = updatePlayerStats(currentPlayer, {
      score: 0,
      badges: 0,
      unlockedServices: [],
      lives: 3,
      streak: 0,
      achievements: []
    });

    const updatedPlayers = gameState.players.map(player => 
      player.id === currentPlayer.id ? resetPlayer : player
    );

    setGameState({
      ...gameState,
      screen: 'avatar',
      currentPlayer: resetPlayer,
      players: updatedPlayers
    });
  };

  if (gameState.screen === 'complete') {
    return <GameComplete gameState={gameState} onPlayAgain={resetGame} />;
  }

  if (showServiceUnlock && unlockedService) {
    return <ServiceUnlock service={unlockedService} />;
  }

  return (
    <div className="min-h-screen p-4">
      <GameHUD gameState={gameState} />
      
      <div className="max-w-4xl mx-auto pt-24">
        <div className="mb-6 text-center">
          <div className="text-slate-300 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          timeLeft={timeLeft}
          onAnswerSelect={handleAnswerSelect}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </div>
  );
};