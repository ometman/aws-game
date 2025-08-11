export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  createdAt: Date;
  lastLoginAt: Date;
  preferences: UserPreferences;
  statistics: UserStatistics;
  achievements: Achievement[];
  unlockedCosmetics: CosmeticItem[];
  bookmarkedQuestions: string[];
  studyProgress: StudyProgress;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
  notifications: boolean;
  autoAdvance: boolean;
  showExplanations: boolean;
}

export interface UserStatistics {
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number; // in minutes
  streakRecord: number;
  servicesUnlocked: string[];
  categoryPerformance: { [categoryId: string]: CategoryStats };
  difficultyPerformance: { [difficulty: string]: DifficultyStats };
  weeklyProgress: WeeklyProgress[];
}

export interface CategoryStats {
  categoryId: string;
  questionsAnswered: number;
  correctAnswers: number;
  averageTime: number;
  lastPracticed: Date;
}

export interface DifficultyStats {
  difficulty: string;
  questionsAnswered: number;
  correctAnswers: number;
  averageScore: number;
}

export interface WeeklyProgress {
  week: string; // ISO week string
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  gamesPlayed: number;
}

export interface CosmeticItem {
  id: string;
  type: 'avatar' | 'badge' | 'theme' | 'effect';
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  requirements?: string;
}

export interface StudyProgress {
  currentLevel: number;
  experiencePoints: number;
  completedLessons: string[];
  weakAreas: string[];
  recommendedTopics: string[];
  studyStreak: number;
  lastStudyDate: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
}

export interface StudySession {
  id: string;
  userId: string;
  mode: 'practice' | 'flashcards' | 'review' | 'quiz';
  category?: string;
  difficulty?: string;
  startTime: Date;
  endTime?: Date;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  score: number;
}