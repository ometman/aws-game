import React from 'react';
import { GameState } from '../types/game';
import { Trophy, Heart, Zap, User } from 'lucide-react';

interface GameHUDProps {
  gameState: GameState;
}

export const GameHUD: React.FC<GameHUDProps> = ({ gameState }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-orange-400" />
            <span className="text-white font-medium">
              {gameState.currentPlayer?.name || 'Player'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{gameState.currentPlayer?.score || 0}</span>
            <span className="text-slate-300 text-sm">points</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-orange-400" />
            <span className="text-white font-bold">{gameState.currentPlayer?.badges || 0}</span>
            <span className="text-slate-300 text-sm">/ 10 badges</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${
                  i < (gameState.currentPlayer?.lives || 0) ? 'text-red-400 fill-red-400' : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          
          <div className="text-slate-300 text-sm">
            Services Unlocked: {gameState.currentPlayer?.unlockedServices?.length || 0}
          </div>
        </div>
      </div>
      
      {(gameState.currentPlayer?.badges || 0) > 0 && (
        <div className="max-w-6xl mx-auto mt-2">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((gameState.currentPlayer?.badges || 0) / 10) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};