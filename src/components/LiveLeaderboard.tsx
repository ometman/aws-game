import React from 'react';
import { Player } from '../types/game';
import { Trophy, Medal, Award, Crown, Flame } from 'lucide-react';

interface LiveLeaderboardProps {
  players: Player[];
  currentPlayer: Player;
  isVisible: boolean;
}

export const LiveLeaderboard: React.FC<LiveLeaderboardProps> = ({
  players,
  currentPlayer,
  isVisible
}) => {
  if (!isVisible) return null;

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-400" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-slate-400 font-bold">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-400';
      case 2: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-400';
      case 3: return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-400';
      default: return 'bg-slate-800/50 border-slate-600';
    }
  };

  return (
    <div className="fixed top-20 right-4 w-80 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-slate-700 p-4 z-40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-orange-400" />
          Live Leaderboard
        </h3>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isCurrentPlayer = player.id === currentPlayer.id;
          
          return (
            <div
              key={player.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                isCurrentPlayer 
                  ? 'ring-2 ring-orange-400 bg-orange-500/10' 
                  : ''
              } ${getRankColor(rank)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(rank)}
                  </div>
                  <div className="text-2xl">{player.avatar}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${isCurrentPlayer ? 'text-orange-400' : 'text-white'}`}>
                        {player.name}
                      </span>
                      {player.streak > 0 && (
                        <div className="flex items-center space-x-1 text-orange-400">
                          <Flame className="w-3 h-3" />
                          <span className="text-xs">{player.streak}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      {player.badges} badges • {player.unlockedServices.length} services
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{player.score}</div>
                  <div className="text-xs text-slate-400">points</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};