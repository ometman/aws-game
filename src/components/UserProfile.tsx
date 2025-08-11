import React, { useState } from 'react';
import { UserProfile as UserProfileType, UserPreferences } from '../types/user';
import { UserService } from '../services/userService';
import { 
  User, Settings, BarChart3, Trophy, Bookmark, 
  Eye, Volume2, VolumeX, Palette, Type, 
  Globe, Moon, Sun, Monitor, Save, X 
} from 'lucide-react';

interface UserProfileProps {
  user: UserProfileType;
  onClose: () => void;
  onUpdate: (user: UserProfileType) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'preferences' | 'achievements'>('profile');
  const [preferences, setPreferences] = useState<UserPreferences>(user.preferences);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user.displayName,
    avatar: user.avatar
  });

  const userService = UserService.getInstance();

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await userService.updateUserProfile({
        displayName: editForm.displayName,
        avatar: editForm.avatar
      });
      onUpdate(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleSavePreferences = async () => {
    try {
      await userService.updatePreferences(preferences);
      const updatedUser = userService.getCurrentUser();
      if (updatedUser) {
        onUpdate(updatedUser);
      }
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  const getAccuracyPercentage = () => {
    const { totalQuestionsAnswered, correctAnswers } = user.statistics;
    return totalQuestionsAnswered > 0 ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) : 0;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'preferences', label: 'Settings', icon: Settings },
    { id: 'achievements', label: 'Achievements', icon: Trophy }
  ];

  const avatarOptions = ['👤', '👨‍💻', '👩‍💻', '🧑‍🎓', '👨‍🏫', '👩‍🏫', '🧑‍💼', '👨‍🔬', '👩‍🔬', '🤖', '☁️', '⚡', '🔒', '📊', '🏗️', '🚀'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">User Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-slate-900/50 border-r border-slate-700">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">{user.avatar}</div>
                  <h3 className="text-xl font-bold text-white">{user.displayName}</h3>
                  <p className="text-slate-400">@{user.username}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={editForm.displayName}
                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Avatar
                      </label>
                      <div className="grid grid-cols-8 gap-2">
                        {avatarOptions.map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setEditForm({ ...editForm, avatar })}
                            className={`text-2xl p-2 rounded-lg border-2 transition-colors ${
                              editForm.avatar === avatar
                                ? 'border-orange-400 bg-orange-500/20'
                                : 'border-slate-600 hover:border-slate-500'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{user.statistics.totalGamesPlayed}</div>
                    <div className="text-sm text-slate-300">Games Played</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{getAccuracyPercentage()}%</div>
                    <div className="text-sm text-slate-300">Accuracy</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{user.statistics.bestScore}</div>
                    <div className="text-sm text-slate-300">Best Score</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Performance Statistics</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-white">{user.statistics.totalQuestionsAnswered}</div>
                    <div className="text-sm text-slate-300">Questions Answered</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-green-400">{user.statistics.correctAnswers}</div>
                    <div className="text-sm text-slate-300">Correct Answers</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-blue-400">{formatTime(user.statistics.totalTimeSpent)}</div>
                    <div className="text-sm text-slate-300">Time Studied</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-orange-400">{user.statistics.streakRecord}</div>
                    <div className="text-sm text-slate-300">Best Streak</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Category Performance</h4>
                  <div className="space-y-3">
                    {Object.values(user.statistics.categoryPerformance).map((category) => {
                      const accuracy = Math.round((category.correctAnswers / category.questionsAnswered) * 100);
                      return (
                        <div key={category.categoryId} className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium capitalize">
                              {category.categoryId.replace('-', ' ')}
                            </span>
                            <span className="text-sm text-slate-300">
                              {category.correctAnswers}/{category.questionsAnswered} ({accuracy}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${accuracy}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Preferences & Settings</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Appearance
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Theme</label>
                        <div className="flex space-x-2">
                          {[
                            { value: 'dark', label: 'Dark', icon: Moon },
                            { value: 'light', label: 'Light', icon: Sun },
                            { value: 'auto', label: 'Auto', icon: Monitor }
                          ].map(({ value, label, icon: Icon }) => (
                            <button
                              key={value}
                              onClick={() => setPreferences({ ...preferences, theme: value as any })}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                                preferences.theme === value
                                  ? 'border-orange-400 bg-orange-500/20 text-orange-400'
                                  : 'border-slate-600 text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Font Size</label>
                        <div className="flex space-x-2">
                          {[
                            { value: 'small', label: 'Small' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'large', label: 'Large' }
                          ].map(({ value, label }) => (
                            <button
                              key={value}
                              onClick={() => setPreferences({ ...preferences, fontSize: value as any })}
                              className={`px-3 py-2 rounded-lg border transition-colors ${
                                preferences.fontSize === value
                                  ? 'border-orange-400 bg-orange-500/20 text-orange-400'
                                  : 'border-slate-600 text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Accessibility
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-slate-300">High Contrast Mode</span>
                        <input
                          type="checkbox"
                          checked={preferences.highContrast}
                          onChange={(e) => setPreferences({ ...preferences, highContrast: e.target.checked })}
                          className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-slate-300">Reduced Motion</span>
                        <input
                          type="checkbox"
                          checked={preferences.reducedMotion}
                          onChange={(e) => setPreferences({ ...preferences, reducedMotion: e.target.checked })}
                          className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Volume2 className="w-5 h-5 mr-2" />
                      Audio & Notifications
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-slate-300">Sound Effects</span>
                        <input
                          type="checkbox"
                          checked={preferences.soundEnabled}
                          onChange={(e) => setPreferences({ ...preferences, soundEnabled: e.target.checked })}
                          className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-slate-300">Notifications</span>
                        <input
                          type="checkbox"
                          checked={preferences.notifications}
                          onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                          className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Study Preferences</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-slate-300">Auto-advance to next question</span>
                        <input
                          type="checkbox"
                          checked={preferences.autoAdvance}
                          onChange={(e) => setPreferences({ ...preferences, autoAdvance: e.target.checked })}
                          className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-slate-300">Show explanations after answers</span>
                        <input
                          type="checkbox"
                          checked={preferences.showExplanations}
                          onChange={(e) => setPreferences({ ...preferences, showExplanations: e.target.checked })}
                          className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSavePreferences}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Achievements</h3>
                
                {user.achievements.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No achievements yet. Keep studying to unlock them!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {user.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${
                          achievement.rarity === 'legendary'
                            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400'
                            : achievement.rarity === 'epic'
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400'
                            : achievement.rarity === 'rare'
                            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400'
                            : 'bg-slate-700/50 border-slate-600'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{achievement.name}</h4>
                            <p className="text-sm text-slate-300 mb-2">{achievement.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                achievement.rarity === 'legendary'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : achievement.rarity === 'epic'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : achievement.rarity === 'rare'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-slate-600/50 text-slate-300'
                              }`}>
                                {achievement.rarity}
                              </span>
                              <span className="text-xs text-slate-400">
                                {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};