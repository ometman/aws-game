import React from 'react';
import { Player, GameSettings } from '../types/game';
import { Crown, Users, Settings, Play, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface LobbyProps {
  roomCode: string;
  players: Player[];
  currentPlayer: Player;
  settings: GameSettings;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onToggleReady: () => void;
}

export const Lobby: React.FC<LobbyProps> = ({
  roomCode,
  players,
  currentPlayer,
  settings,
  onStartGame,
  onLeaveRoom,
  onToggleReady
}) => {
  const [copied, setCopied] = useState(false);
  const host = players.find(p => p.isHost);
  const allPlayersReady = players.every(p => p.isReady || p.isHost);
  const canStart = players.length >= 2 && allPlayersReady;

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy room code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Battle Room</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-slate-300">Room Code:</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-mono font-bold text-orange-400 bg-slate-800 px-4 py-2 rounded-lg border border-slate-600">
                {roomCode}
              </span>
              <button
                onClick={copyRoomCode}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>
          <p className="text-slate-400">Share this code with friends to join the battle</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Players */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-400" />
              Players ({players.length}/{settings.maxPlayers})
            </h3>
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{player.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{player.name}</span>
                        {player.isHost && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-sm text-slate-400">
                        Score: {player.score} • Badges: {player.badges}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {player.isHost ? (
                      <span className="text-yellow-400 text-sm">Host</span>
                    ) : (
                      <span className={`text-sm ${player.isReady ? 'text-green-400' : 'text-slate-400'}`}>
                        {player.isReady ? 'Ready' : 'Not Ready'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Settings */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-orange-400" />
              Game Settings
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Questions:</span>
                <span className="text-white">{settings.questionCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Time per Question:</span>
                <span className="text-white">{settings.timePerQuestion}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Difficulty:</span>
                <span className="text-white capitalize">{settings.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Answer Mode:</span>
                <span className="text-white capitalize">{settings.answerMode.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Streak Bonus:</span>
                <span className="text-white">{settings.streakBonus ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Time Bonus:</span>
                <span className="text-white">{settings.timeBonus ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="mt-4">
                <span className="text-slate-300 block mb-2">Categories:</span>
                <div className="flex flex-wrap gap-1">
                  {settings.categories.map((category) => (
                    <span
                      key={category.id}
                      className="px-2 py-1 bg-slate-700 text-white text-xs rounded"
                    >
                      {category.icon} {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onLeaveRoom}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            ← Leave Room
          </button>

          <div className="flex space-x-4">
            {!currentPlayer.isHost && (
              <button
                onClick={onToggleReady}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                  currentPlayer.isReady
                    ? 'bg-slate-600 hover:bg-slate-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {currentPlayer.isReady ? 'Not Ready' : 'Ready Up'}
              </button>
            )}

            {currentPlayer.isHost && (
              <button
                onClick={onStartGame}
                disabled={!canStart}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                <Play className="mr-2 w-5 h-5" />
                Start Game
              </button>
            )}
          </div>
        </div>

        {!canStart && (
          <div className="text-center mt-4">
            <p className="text-slate-400 text-sm">
              {players.length < 2 
                ? 'Waiting for more players to join...'
                : 'Waiting for all players to be ready...'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};