import React from 'react';
import { 
  ArrowLeft, Play, Users, User, Eye, Trophy, Zap, Heart, 
  Clock, Target, BookOpen, Settings, Accessibility, Globe,
  Crown, Medal, Award, Flame, Shield, Database, Server
} from 'lucide-react';

interface InstructionsPageProps {
  onBack: () => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">How to Play AWS Cert Clash</h1>
            <p className="text-slate-300">Your complete guide to mastering AWS through gamified learning</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Play className="w-6 h-6 mr-3 text-orange-400" />
              Getting Started
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">1. User Registration & Login</h3>
                <ul className="text-slate-300 space-y-2 ml-4">
                  <li>• Create an account with username, email, and display name</li>
                  <li>• Choose from various avatar options (👤, 👨‍💻, 👩‍💻, 🧑‍🎓, etc.)</li>
                  <li>• Your progress is automatically saved across sessions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">2. Game Mode Selection</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="font-semibold text-white">Solo Practice</span>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Practice alone with adaptive difficulty</li>
                      <li>• Get detailed explanations</li>
                      <li>• Track personal progress</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-green-400 mr-2" />
                      <span className="font-semibold text-white">Multiplayer Battle</span>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Compete with 2-8 friends</li>
                      <li>• Real-time competition</li>
                      <li>• Live leaderboards</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Eye className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="font-semibold text-white">Spectator Mode</span>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Watch live games</li>
                      <li>• Learn from others</li>
                      <li>• No pressure environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gameplay Mechanics */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-orange-400" />
              Gameplay Mechanics
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Core Game Flow</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Avatar Selection', 'Room Setup', 'Question Rounds', 'Scoring & Progress', 'Results'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="ml-2 text-slate-300">{step}</span>
                      {index < 4 && <span className="mx-3 text-slate-500">→</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Question System</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-300">
                      <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                      <span><strong>30-second timer</strong> per question (customizable 15-60s)</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <span className="w-4 h-4 mr-2 text-blue-400 font-bold">A</span>
                      <span><strong>Multiple choice</strong> format with 4 options</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-300">
                      <Target className="w-4 h-4 mr-2 text-green-400" />
                      <span><strong>Three difficulty levels:</strong> Easy, Medium, Hard</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <BookOpen className="w-4 h-4 mr-2 text-purple-400" />
                      <span><strong>Six categories:</strong> Cloud, Security, Technology, etc.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scoring System */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-orange-400" />
              Scoring System
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Base Points</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-green-900/20 rounded border border-green-500/30">
                    <span className="text-green-400">Easy</span>
                    <span className="text-white font-bold">1 point</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-900/20 rounded border border-yellow-500/30">
                    <span className="text-yellow-400">Medium</span>
                    <span className="text-white font-bold">2 points</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-red-900/20 rounded border border-red-500/30">
                    <span className="text-red-400">Hard</span>
                    <span className="text-white font-bold">3 points</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-1 text-blue-400" />
                  Time Bonus
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="text-slate-300">First 20% of time: <span className="text-blue-400 font-bold">+3 points</span></div>
                  <div className="text-slate-300">First 40% of time: <span className="text-blue-400 font-bold">+2 points</span></div>
                  <div className="text-slate-300">First 60% of time: <span className="text-blue-400 font-bold">+1 point</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Flame className="w-4 h-4 mr-1 text-orange-400" />
                  Streak Bonus
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="text-slate-300">3+ consecutive: <span className="text-orange-400 font-bold">+1 point</span></div>
                  <div className="text-slate-300">5+ consecutive: <span className="text-orange-400 font-bold">+3 points</span></div>
                  <div className="text-slate-300">10+ consecutive: <span className="text-orange-400 font-bold">+5 points</span></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-400" />
                Lives System
              </h3>
              <p className="text-slate-300">Start with 3 lives • Lose 1 life for wrong answers or timeouts • Game continues until all questions answered</p>
            </div>
          </section>

          {/* Progression System */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-orange-400" />
              Progression System
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Medal className="w-4 h-4 mr-2 text-yellow-400" />
                  Cloud Badges
                </h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Earn 1 badge for every 10 points</li>
                  <li>• Goal: Collect 10+ badges</li>
                  <li>• Become a "Cloud Champion"</li>
                  <li>• Visual progress tracking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-blue-400" />
                  Service Unlocks
                </h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Unlock AWS services correctly</li>
                  <li>• EC2, S3, Lambda, RDS, etc.</li>
                  <li>• Animated celebrations</li>
                  <li>• Track mastery progress</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Trophy className="w-4 h-4 mr-2 text-purple-400" />
                  Achievements
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="text-slate-400">Common: First Steps</div>
                  <div className="text-blue-400">Rare: On Fire, Security Expert</div>
                  <div className="text-purple-400">Epic: Speed Demon, Service Master</div>
                  <div className="text-yellow-400">Legendary: Flawless Victory</div>
                </div>
              </div>
            </div>
          </section>

          {/* Study Mode */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-orange-400" />
              Study Mode Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Practice Mode</h3>
                  <p className="text-slate-300 text-sm">Answer questions with immediate feedback, detailed explanations, and AWS documentation links.</p>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Flashcard Mode</h3>
                  <p className="text-slate-300 text-sm">Quick concept review with self-assessment for rapid learning of key concepts.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Review Mode</h3>
                  <p className="text-slate-300 text-sm">Focus on bookmarked questions and weak performance areas with personalized sets.</p>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-slate-300 text-sm">Track accuracy, category performance, study streaks, and get personalized recommendations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Multiplayer Features */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-orange-400" />
              Multiplayer Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Room Creation</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Set max players (2-8)</li>
                  <li>• Choose question count (10-50)</li>
                  <li>• Configure time per question (15-60s)</li>
                  <li>• Select difficulty and categories</li>
                  <li>• Enable/disable bonuses</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Live Competition</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Real-time leaderboard updates</li>
                  <li>• See other players' progress</li>
                  <li>• Simultaneous or turn-based answering</li>
                  <li>• Ready-up system before games</li>
                  <li>• Host controls for management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Accessibility className="w-6 h-6 mr-3 text-orange-400" />
              Accessibility Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Visual</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• High contrast mode</li>
                  <li>• Font size options</li>
                  <li>• Dark/Light themes</li>
                  <li>• Clear focus indicators</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Full keyboard support</li>
                  <li>• Screen reader compatible</li>
                  <li>• Skip links</li>
                  <li>• ARIA labels</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Preferences</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Reduced motion</li>
                  <li>• Sound effects toggle</li>
                  <li>• Auto-advance options</li>
                  <li>• Explanation display</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Winning Conditions */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Crown className="w-6 h-6 mr-3 text-orange-400" />
              Winning Conditions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Solo Mode</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Complete all questions for final grade (A+ to C)</li>
                  <li>• Aim for 10+ Cloud Badges for "Champion" status</li>
                  <li>• Unlock all AWS services for mastery</li>
                  <li>• Achieve high accuracy for better grades</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Multiplayer Mode</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Highest score wins the battle</li>
                  <li>• Live leaderboard shows rankings</li>
                  <li>• Bonus points can change rankings quickly</li>
                  <li>• Crown icon for current leader</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips for Success */}
          <section className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 rounded-xl p-8 border border-orange-500/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-orange-400" />
              Tips for Success
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Study Strategy</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Start with Practice Mode to learn concepts</li>
                  <li>• Use Flashcards for quick review sessions</li>
                  <li>• Bookmark difficult questions for later review</li>
                  <li>• Focus on weak areas identified in Analytics</li>
                  <li>• Maintain daily study streaks for consistency</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Game Strategy</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Answer quickly for time bonuses</li>
                  <li>• Build streaks for maximum points</li>
                  <li>• Read explanations to understand concepts</li>
                  <li>• Practice regularly to improve accuracy</li>
                  <li>• Use multiplayer mode to test skills competitively</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};