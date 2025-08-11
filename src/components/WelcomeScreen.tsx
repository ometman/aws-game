import React from 'react';
import { Cloud, Zap, Shield, Trophy } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="w-16 h-16 text-orange-400 mr-4" />
            <h1 className="text-6xl font-bold text-white">
              AWS <span className="text-orange-400">Cert Clash</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-8">
            Master the AWS Cloud Practitioner exam through epic quiz battles!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Fast-Paced Quiz</h3>
            <p className="text-slate-300">Answer 30-second questions across Easy, Medium, and Hard difficulties</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Unlock Services</h3>
            <p className="text-slate-300">Correct answers unlock AWS services like EC2, S3, Lambda, and more</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Earn Cloud Badges</h3>
            <p className="text-slate-300">Collect 10 Cloud Badges to become a certified cloud champion</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Cloud Journey
          </button>
          <p className="text-slate-400 text-sm">
            Choose your cloud avatar and begin mastering AWS concepts!
          </p>
        </div>
      </div>
    </div>
  );
};