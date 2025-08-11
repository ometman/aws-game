import { UserProfile, UserPreferences, UserStatistics, StudySession } from '../types/user';
import { Question } from '../types/game';

const STORAGE_KEYS = {
  USER_PROFILE: 'aws_cert_clash_user_profile',
  STUDY_SESSIONS: 'aws_cert_clash_study_sessions',
  BOOKMARKS: 'aws_cert_clash_bookmarks',
  PREFERENCES: 'aws_cert_clash_preferences'
};

export class UserService {
  private static instance: UserService;
  private currentUser: UserProfile | null = null;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // User Authentication & Profile Management
  async createUser(username: string, email: string, displayName: string): Promise<UserProfile> {
    const user: UserProfile = {
      id: crypto.randomUUID(),
      username,
      email,
      displayName,
      avatar: '👤',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      preferences: this.getDefaultPreferences(),
      statistics: this.getDefaultStatistics(),
      achievements: [],
      unlockedCosmetics: [],
      bookmarkedQuestions: [],
      studyProgress: {
        currentLevel: 1,
        experiencePoints: 0,
        completedLessons: [],
        weakAreas: [],
        recommendedTopics: [],
        studyStreak: 0,
        lastStudyDate: new Date()
      }
    };

    this.currentUser = user;
    this.saveUserProfile(user);
    return user;
  }

  async loginUser(username: string): Promise<UserProfile | null> {
    const users = this.getAllUsers();
    const user = users.find(u => u.username === username);
    
    if (user) {
      user.lastLoginAt = new Date();
      this.currentUser = user;
      this.saveUserProfile(user);
      return user;
    }
    
    return null;
  }

  getCurrentUser(): UserProfile | null {
    if (!this.currentUser) {
      this.currentUser = this.loadUserProfile();
    }
    return this.currentUser;
  }

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (!this.currentUser) throw new Error('No user logged in');
    
    this.currentUser = { ...this.currentUser, ...updates };
    this.saveUserProfile(this.currentUser);
    return this.currentUser;
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');
    
    this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
    this.saveUserProfile(this.currentUser);
    this.applyPreferences(this.currentUser.preferences);
  }

  // Statistics & Progress Tracking
  async recordQuestionAnswer(question: Question, isCorrect: boolean, timeSpent: number): Promise<void> {
    if (!this.currentUser) return;

    const stats = this.currentUser.statistics;
    
    // Update overall stats
    stats.totalQuestionsAnswered++;
    if (isCorrect) stats.correctAnswers++;
    
    // Update category performance
    if (!stats.categoryPerformance[question.category.id]) {
      stats.categoryPerformance[question.category.id] = {
        categoryId: question.category.id,
        questionsAnswered: 0,
        correctAnswers: 0,
        averageTime: 0,
        lastPracticed: new Date()
      };
    }
    
    const categoryStats = stats.categoryPerformance[question.category.id];
    categoryStats.questionsAnswered++;
    if (isCorrect) categoryStats.correctAnswers++;
    categoryStats.averageTime = (categoryStats.averageTime + timeSpent) / 2;
    categoryStats.lastPracticed = new Date();

    // Update difficulty performance
    if (!stats.difficultyPerformance[question.difficulty]) {
      stats.difficultyPerformance[question.difficulty] = {
        difficulty: question.difficulty,
        questionsAnswered: 0,
        correctAnswers: 0,
        averageScore: 0
      };
    }
    
    const difficultyStats = stats.difficultyPerformance[question.difficulty];
    difficultyStats.questionsAnswered++;
    if (isCorrect) difficultyStats.correctAnswers++;

    await this.updateUserProfile({ statistics: stats });
  }

  async recordStudySession(session: StudySession): Promise<void> {
    const sessions = this.getStudySessions();
    sessions.push(session);
    localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));

    // Update user statistics
    if (this.currentUser) {
      const stats = this.currentUser.statistics;
      stats.totalTimeSpent += session.timeSpent;
      stats.totalGamesPlayed++;
      
      if (session.score > stats.bestScore) {
        stats.bestScore = session.score;
      }
      
      stats.averageScore = (stats.averageScore + session.score) / 2;
      
      await this.updateUserProfile({ statistics: stats });
    }
  }

  // Bookmarks & Study Management
  async toggleBookmark(questionId: string): Promise<boolean> {
    if (!this.currentUser) return false;

    const bookmarks = [...this.currentUser.bookmarkedQuestions];
    const index = bookmarks.indexOf(questionId);
    
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(questionId);
    }
    
    await this.updateUserProfile({ bookmarkedQuestions: bookmarks });
    return index === -1; // Return true if bookmarked, false if removed
  }

  getBookmarkedQuestions(): string[] {
    return this.currentUser?.bookmarkedQuestions || [];
  }

  // Analytics & Insights
  getWeakAreas(): string[] {
    if (!this.currentUser) return [];
    
    const categoryPerformance = this.currentUser.statistics.categoryPerformance;
    const weakAreas: string[] = [];
    
    Object.values(categoryPerformance).forEach(stats => {
      const accuracy = stats.correctAnswers / stats.questionsAnswered;
      if (accuracy < 0.7 && stats.questionsAnswered >= 5) {
        weakAreas.push(stats.categoryId);
      }
    });
    
    return weakAreas;
  }

  getRecommendedTopics(): string[] {
    const weakAreas = this.getWeakAreas();
    const allCategories = ['cloud-concepts', 'security', 'technology', 'billing', 'architecture', 'services'];
    
    // Recommend weak areas first, then unexplored areas
    const unexplored = allCategories.filter(cat => 
      !this.currentUser?.statistics.categoryPerformance[cat] || 
      this.currentUser.statistics.categoryPerformance[cat].questionsAnswered < 3
    );
    
    return [...weakAreas, ...unexplored].slice(0, 3);
  }

  getStudyStreak(): number {
    if (!this.currentUser) return 0;
    
    const sessions = this.getStudySessions()
      .filter(s => s.userId === this.currentUser!.id)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const session of sessions) {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }
    
    return streak;
  }

  // Private helper methods
  private getDefaultPreferences(): UserPreferences {
    return {
      theme: 'dark',
      language: 'en',
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
      soundEnabled: true,
      notifications: true,
      autoAdvance: false,
      showExplanations: true
    };
  }

  private getDefaultStatistics(): UserStatistics {
    return {
      totalGamesPlayed: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      averageScore: 0,
      bestScore: 0,
      totalTimeSpent: 0,
      streakRecord: 0,
      servicesUnlocked: [],
      categoryPerformance: {},
      difficultyPerformance: {},
      weeklyProgress: []
    };
  }

  private saveUserProfile(user: UserProfile): void {
    const users = this.getAllUsers().filter(u => u.id !== user.id);
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(users));
  }

  private loadUserProfile(): UserProfile | null {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (stored) {
      const users = JSON.parse(stored);
      return users[users.length - 1] || null; // Return most recent user
    }
    return null;
  }

  private getAllUsers(): UserProfile[] {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : [];
  }

  private getStudySessions(): StudySession[] {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
    return stored ? JSON.parse(stored) : [];
  }

  private applyPreferences(preferences: UserPreferences): void {
    // Apply theme
    document.documentElement.setAttribute('data-theme', preferences.theme);
    
    // Apply font size
    document.documentElement.setAttribute('data-font-size', preferences.fontSize);
    
    // Apply high contrast
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (preferences.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }
}