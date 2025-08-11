import React, { useState } from 'react';
import { UserService } from '../services/userService';
import { UserProfile } from '../types/user';
import { User, Mail, UserPlus, LogIn, Cloud } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    displayName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userService = UserService.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (!formData.username || !formData.email || !formData.displayName) {
          setError('All fields are required');
          return;
        }
        
        const user = await userService.createUser(
          formData.username,
          formData.email,
          formData.displayName
        );
        onLogin(user);
      } else {
        if (!formData.username) {
          setError('Username is required');
          return;
        }
        
        const user = await userService.loginUser(formData.username);
        if (user) {
          onLogin(user);
        } else {
          setError('User not found. Please register first.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="w-12 h-12 text-orange-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">
              AWS <span className="text-orange-400">Cert Clash</span>
            </h1>
          </div>
          <p className="text-slate-300">
            {isRegistering ? 'Create your account to start learning' : 'Welcome back! Sign in to continue'}
          </p>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>

            {isRegistering && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                    placeholder="How should we call you?"
                    required
                  />
                </div>
              </>
            )}

            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isRegistering ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setFormData({ username: '', email: '', displayName: '' });
              }}
              className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
            >
              {isRegistering 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Register"
              }
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Your progress and achievements will be saved locally
          </p>
        </div>
      </div>
    </div>
  );
};