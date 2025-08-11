import React, { useState } from 'react';
import { GameSettings } from '../types/game';
import { questionCategories } from '../data/categories';
import { ArrowRight, Settings, Users, Clock, Target } from 'lucide-react';

interface RoomCreationProps {
  onCreateRoom: (settings: GameSettings) => void;
  onBack: () => void;
}

export const RoomCreation: React.FC<RoomCreationProps> = ({ onCreateRoom, onBack }) => {
  const [settings, setSettings] = useState<GameSettings>({
    maxPlayers: 4,
    questionCount: 20,
    timePerQuestion: 30,
    difficulty: 'mixed',
    categories: questionCategories,
    answerMode: 'simultaneous',
    streakBonus: true,
    timeBonus: true
  });

  const handleCreateRoom = () => {
    onCreateRoom(settings);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Settings className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Create Your Battle Room</h2>
          <p className="text-xl text-slate-300">Customize your AWS quiz experience</p>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Settings */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-400" />
                Game Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Max Players: {settings.maxPlayers}
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={settings.maxPlayers}
                  onChange={(e) => setSettings({...settings, maxPlayers: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Questions: {settings.questionCount}
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={settings.questionCount}
                  onChange={(e) => setSettings({...settings, questionCount: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Time per Question: {settings.timePerQuestion}s
                </label>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={settings.timePerQuestion}
                  onChange={(e) => setSettings({...settings, timePerQuestion: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                <select
                  value={settings.difficulty}
                  onChange={(e) => setSettings({...settings, difficulty: e.target.value as any})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="mixed">Mixed Difficulty</option>
                  <option value="easy">Easy Only</option>
                  <option value="medium">Medium Only</option>
                  <option value="hard">Hard Only</option>
                </select>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-400" />
                Advanced Options
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Answer Mode</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="answerMode"
                      value="simultaneous"
                      checked={settings.answerMode === 'simultaneous'}
                      onChange={(e) => setSettings({...settings, answerMode: e.target.value as any})}
                      className="mr-2"
                    />
                    <span className="text-white">Simultaneous (All answer at once)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="answerMode"
                      value="turn-based"
                      checked={settings.answerMode === 'turn-based'}
                      onChange={(e) => setSettings({...settings, answerMode: e.target.value as any})}
                      className="mr-2"
                    />
                    <span className="text-white">Turn-based (Take turns)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.streakBonus}
                    onChange={(e) => setSettings({...settings, streakBonus: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-white">Streak Bonus (Extra points for consecutive correct answers)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.timeBonus}
                    onChange={(e) => setSettings({...settings, timeBonus: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-white">Time Bonus (Faster answers = more points)</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Question Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  {questionCategories.map((category) => (
                    <label key={category.id} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={settings.categories.some(c => c.id === category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSettings({
                              ...settings,
                              categories: [...settings.categories, category]
                            });
                          } else {
                            setSettings({
                              ...settings,
                              categories: settings.categories.filter(c => c.id !== category.id)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-white">{category.icon} {category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={onBack}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              ← Back
            </button>
            <button
              onClick={handleCreateRoom}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              Create Room
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};