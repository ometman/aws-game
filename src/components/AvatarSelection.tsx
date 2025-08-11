import React, { useState } from 'react';
import { avatars } from '../data/avatars';
import { Avatar } from '../types/game';
import { ArrowRight, User } from 'lucide-react';

interface AvatarSelectionProps {
  onAvatarSelected: (avatar: Avatar) => void;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onAvatarSelected }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleConfirm = () => {
    if (selectedAvatar) {
      onAvatarSelected(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <User className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Cloud Avatar</h2>
          <p className="text-xl text-slate-300">Select the role that represents your cloud journey</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar)}
              className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                selectedAvatar?.id === avatar.id
                  ? 'ring-4 ring-orange-400 bg-gradient-to-b from-orange-500/20 to-orange-600/20'
                  : 'hover:ring-2 hover:ring-slate-400 bg-slate-800/50'
              } backdrop-blur-sm rounded-xl p-8 border border-slate-700 text-center`}
            >
              <div className="text-6xl mb-4">{avatar.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{avatar.name}</h3>
              <p className="text-slate-300 text-sm">{avatar.description}</p>
            </div>
          ))}
        </div>

        {selectedAvatar && (
          <div className="text-center">
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg p-6 mb-6 border border-slate-600 max-w-md mx-auto">
              <div className="text-4xl mb-2">{selectedAvatar.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to play as {selectedAvatar.name}?
              </h3>
              <p className="text-slate-300 text-sm">{selectedAvatar.description}</p>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              Begin Quiz Battle
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};