import React, { useState } from 'react';
import { ArrowRight, Hash } from 'lucide-react';

interface RoomJoinProps {
  onJoinRoom: (roomCode: string) => void;
  onBack: () => void;
}

export const RoomJoin: React.FC<RoomJoinProps> = ({ onJoinRoom, onBack }) => {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      onJoinRoom(roomCode.trim().toUpperCase());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <Hash className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Join Battle Room</h2>
          <p className="text-xl text-slate-300">Enter the room code to join the battle</p>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Room Code
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-2xl font-mono tracking-widest focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            <button
              onClick={handleJoinRoom}
              disabled={roomCode.length !== 6}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Join Room
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            <button
              onClick={onBack}
              className="w-full text-slate-400 hover:text-white transition-colors duration-200"
            >
              ← Back to Mode Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};