import React from 'react';
import { Users, User, Eye, BookOpen } from 'lucide-react';

interface ModeSelectionProps {
  onModeSelect: (mode: 'solo' | 'multiplayer' | 'spectator') => void;
  onBack: () => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect, onBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Choose Your Battle Mode</h2>
          <p className="text-xl text-slate-300">Select how you want to experience AWS Cert Clash</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div
            onClick={() => onModeSelect('solo')}
            className="cursor-pointer group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-orange-400 transition-all duration-300 transform hover:scale-105"
          >
            <User className="w-16 h-16 text-blue-400 mx-auto mb-6 group-hover:text-orange-400 transition-colors" />
            <h3 className="text-2xl font-bold text-white mb-4">Solo Practice</h3>
            <p className="text-slate-300 mb-6">
              Practice alone with adaptive difficulty and detailed explanations
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div>• Personalized learning path</div>
              <div>• Detailed explanations</div>
              <div>• Progress tracking</div>
            </div>
          </div>

          <div
            onClick={() => onModeSelect('multiplayer')}
            className="cursor-pointer group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-orange-400 transition-all duration-300 transform hover:scale-105"
          >
            <Users className="w-16 h-16 text-green-400 mx-auto mb-6 group-hover:text-orange-400 transition-colors" />
            <h3 className="text-2xl font-bold text-white mb-4">Multiplayer Battle</h3>
            <p className="text-slate-300 mb-6">
              Compete with friends in real-time quiz battles
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div>• Real-time competition</div>
              <div>• Live leaderboards</div>
              <div>• Team challenges</div>
            </div>
          </div>

          <div
            onClick={() => onModeSelect('spectator')}
            className="cursor-pointer group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-orange-400 transition-all duration-300 transform hover:scale-105"
          >
            <Eye className="w-16 h-16 text-purple-400 mx-auto mb-6 group-hover:text-orange-400 transition-colors" />
            <h3 className="text-2xl font-bold text-white mb-4">Spectator Mode</h3>
            <p className="text-slate-300 mb-6">
              Watch live games and learn from other players
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div>• Watch live battles</div>
              <div>• Learn strategies</div>
              <div>• No pressure environment</div>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors duration-200"
        >
          ← Back to Welcome
        </button>
      </div>
    </div>
  );
};