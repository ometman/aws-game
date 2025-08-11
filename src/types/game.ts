export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  badges: number;
  unlockedServices: string[];
  lives: number;
  streak: number;
  achievements: Achievement[];
  isReady: boolean;
  isHost: boolean;
}

export interface GameState {
  screen: 'welcome' | 'mode-selection' | 'room-creation' | 'room-join' | 'lobby' | 'avatar' | 'game' | 'complete';
  mode: 'solo' | 'multiplayer' | 'spectator' | null;
  roomCode: string | null;
  players: Player[];
  currentPlayer: Player | null;
  currentQuestion: number;
  gameSettings: GameSettings;
  isGameStarted: boolean;
  timeLeft: number;
  leaderboard: Player[];
}

export interface GameSettings {
  maxPlayers: number;
  questionCount: number;
  timePerQuestion: number;
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
  categories: QuestionCategory[];
  answerMode: 'simultaneous' | 'turn-based';
  streakBonus: boolean;
  timeBonus: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  service?: string;
  category: QuestionCategory;
  explanation?: string;
  documentationLink?: string;
}

export interface QuestionCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Avatar {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface RoomInfo {
  code: string;
  host: string;
  players: Player[];
  settings: GameSettings;
  isStarted: boolean;
}

export interface AnswerResult {
  playerId: string;
  answerIndex: number;
  timeToAnswer: number;
  isCorrect: boolean;
  pointsEarned: number;
  streakBonus: number;
  timeBonus: number;
}