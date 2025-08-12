import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ModeSelection } from './components/ModeSelection';
import { RoomCreation } from './components/RoomCreation';
import { RoomJoin } from './components/RoomJoin';
import { Lobby } from './components/Lobby';
import { AvatarSelection } from './components/AvatarSelection';
import { QuizGame } from './components/QuizGame';
import { LoginScreen } from './components/LoginScreen';
import { UserProfile } from './components/UserProfile';
import { StudyMode } from './components/StudyMode';
import { InstructionsPage } from './components/InstructionsPage';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import { GameState, Player, GameSettings } from './types/game';
import { UserProfile as UserProfileType } from './types/user';
import { UserService } from './services/userService';
import { generateRoomCode } from './utils/gameLogic';
import { v4 as uuidv4 } from 'uuid';
import { User, BookOpen, Settings, HelpCircle } from 'lucide-react';

function App() {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showStudyMode, setShowStudyMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    screen: 'welcome',
    mode: null,
    roomCode: null,
    players: [],
    currentPlayer: null,
    currentQuestion: 0,
    gameSettings: {
      maxPlayers: 4,
      questionCount: 20,
      timePerQuestion: 30,
      difficulty: 'mixed',
      categories: [],
      answerMode: 'simultaneous',
      streakBonus: true,
      timeBonus: true
    },
    isGameStarted: false,
    timeLeft: 30,
    leaderboard: []
  });

  const userService = UserService.getInstance();

  useEffect(() => {
    // Check for existing user on app load
    const existingUser = userService.getCurrentUser();
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  const handleLogin = (loggedInUser: UserProfileType) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
    setShowStudyMode(false);
    setShowInstructions(false);
    setGameState({
      ...gameState,
      screen: 'welcome',
      mode: null,
      roomCode: null,
      players: [],
      currentPlayer: null
    });
  };

  const handleModeSelect = (mode: 'solo' | 'multiplayer' | 'spectator') => {
    if (mode === 'solo') {
      setGameState({
        ...gameState,
        mode,
        screen: 'avatar'
      });
    } else if (mode === 'multiplayer') {
      setGameState({
        ...gameState,
        mode,
        screen: 'room-creation'
      });
    } else {
      setGameState({
        ...gameState,
        mode,
        screen: 'room-join'
      });
    }
  };

  const handleCreateRoom = (settings: GameSettings) => {
    const roomCode = generateRoomCode();
    setGameState({
      ...gameState,
      roomCode,
      gameSettings: settings,
      screen: 'avatar'
    });
  };

  const handleJoinRoom = (roomCode: string) => {
    setGameState({
      ...gameState,
      roomCode,
      screen: 'avatar'
    });
  };

  const handleAvatarSelected = (avatar: { id: string; name: string }) => {
    const player: Player = {
      id: uuidv4(),
      name: avatar.name,
      avatar: avatar.id,
      score: 0,
      badges: 0,
      unlockedServices: [],
      lives: 3,
      streak: 0,
      achievements: [],
      isReady: false,
      isHost: gameState.mode === 'solo' || gameState.players.length === 0
    };

    if (gameState.mode === 'solo') {
      setGameState({
        ...gameState,
        currentPlayer: player,
        players: [player],
        screen: 'game'
      });
    } else {
      setGameState({
        ...gameState,
        currentPlayer: player,
        players: [...gameState.players, player],
        screen: 'lobby'
      });
    }
  };

  const handleStartGame = () => {
    setGameState({
      ...gameState,
      screen: 'game',
      isGameStarted: true
    });
  };

  const handleLeaveRoom = () => {
    setGameState({
      ...gameState,
      screen: 'mode-selection',
      roomCode: null,
      players: [],
      currentPlayer: null
    });
  };

  const handleToggleReady = () => {
    if (!gameState.currentPlayer) return;

    const updatedPlayer = {
      ...gameState.currentPlayer,
      isReady: !gameState.currentPlayer.isReady
    };

    const updatedPlayers = gameState.players.map(p => 
      p.id === updatedPlayer.id ? updatedPlayer : p
    );

    setGameState({
      ...gameState,
      currentPlayer: updatedPlayer,
      players: updatedPlayers
    });
  };

  // If no user is logged in, show login screen
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Show study mode if selected
  if (showStudyMode) {
    return (
      <AccessibilityProvider preferences={user.preferences}>
        <StudyMode 
          user={user} 
          onBack={() => setShowStudyMode(false)}
          onUpdateUser={setUser}
        />
      </AccessibilityProvider>
    );
  }

  // Show instructions if selected
  if (showInstructions) {
    return (
      <AccessibilityProvider preferences={user.preferences}>
        <InstructionsPage onBack={() => setShowInstructions(false)} />
      </AccessibilityProvider>
    );
  }

  return (
    <AccessibilityProvider preferences={user.preferences}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* User Navigation Bar */}
        {gameState.screen === 'welcome' && (
          <div className="fixed top-0 right-0 p-4 z-50 flex items-center space-x-4">
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
              aria-label="View game instructions"
            >
              <HelpCircle className="w-4 h-4" />
              <span>How to Play</span>
            </button>
            <button
              onClick={() => setShowStudyMode(true)}
              className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
              aria-label="Open study mode"
            >
              <BookOpen className="w-4 h-4" />
              <span>Study Mode</span>
            </button>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
              aria-label="Open user profile"
            >
              <div className="text-lg">{user.avatar}</div>
              <span>{user.displayName}</span>
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Sign out"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* User Profile Modal */}
        {showProfile && (
          <UserProfile
            user={user}
            onClose={() => setShowProfile(false)}
            onUpdate={setUser}
          />
        )}

        {/* Main Content */}
        <main id="main-content">
          {gameState.screen === 'welcome' && (
            <WelcomeScreen onStart={() => setGameState({...gameState, screen: 'mode-selection'})} />
          )}
          
          {gameState.screen === 'mode-selection' && (
            <ModeSelection 
              onModeSelect={handleModeSelect}
              onBack={() => setGameState({...gameState, screen: 'welcome'})}
            />
          )}
          
          {gameState.screen === 'room-creation' && (
            <RoomCreation 
              onCreateRoom={handleCreateRoom}
              onBack={() => setGameState({...gameState, screen: 'mode-selection'})}
            />
          )}
          
          {gameState.screen === 'room-join' && (
            <RoomJoin 
              onJoinRoom={handleJoinRoom}
              onBack={() => setGameState({...gameState, screen: 'mode-selection'})}
            />
          )}
          
          {gameState.screen === 'avatar' && (
            <AvatarSelection 
              onAvatarSelected={handleAvatarSelected}
            />
          )}
          
          {gameState.screen === 'lobby' && gameState.currentPlayer && (
            <Lobby
              roomCode={gameState.roomCode || ''}
              players={gameState.players}
              currentPlayer={gameState.currentPlayer}
              settings={gameState.gameSettings}
              onStartGame={handleStartGame}
              onLeaveRoom={handleLeaveRoom}
              onToggleReady={handleToggleReady}
            />
          )}
          
          {gameState.screen === 'game' && (
            <QuizGame 
              gameState={gameState}
              setGameState={setGameState}
            />
          )}
          
          {gameState.screen === 'complete' && (
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Game Complete!</h1>
                <button
                  onClick={() => setGameState({...gameState, screen: 'welcome'})}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Return to Menu
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </AccessibilityProvider>
  );
}

export default App;