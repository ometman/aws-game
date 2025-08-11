import { Player, Question, AnswerResult, Achievement } from '../types/game';
import { achievements } from '../data/achievements';

export const calculateScore = (
  question: Question,
  timeToAnswer: number,
  maxTime: number,
  isCorrect: boolean,
  streak: number,
  enableTimeBonus: boolean = true,
  enableStreakBonus: boolean = true
): { points: number; timeBonus: number; streakBonus: number } => {
  if (!isCorrect) {
    return { points: 0, timeBonus: 0, streakBonus: 0 };
  }

  let points = question.points;
  let timeBonus = 0;
  let streakBonus = 0;

  // Time bonus calculation
  if (enableTimeBonus) {
    const timeRatio = timeToAnswer / maxTime;
    if (timeRatio <= 0.2) timeBonus = 3; // Answered in first 20% of time
    else if (timeRatio <= 0.4) timeBonus = 2; // Answered in first 40% of time
    else if (timeRatio <= 0.6) timeBonus = 1; // Answered in first 60% of time
  }

  // Streak bonus calculation
  if (enableStreakBonus && streak > 0) {
    if (streak >= 10) streakBonus = 5;
    else if (streak >= 5) streakBonus = 3;
    else if (streak >= 3) streakBonus = 1;
  }

  return { points: points + timeBonus + streakBonus, timeBonus, streakBonus };
};

export const updatePlayerProperties = (
  player: Player,
  updates: Partial<Player>
): Player => {
  return { ...player, ...updates };
};

export const applyAnswerResult = (
  player: Player,
  answerResult: AnswerResult,
  question: Question
): Player => {
  const updatedPlayer = { ...player };

  // Update score
  updatedPlayer.score += answerResult.pointsEarned;

  // Update streak
  if (answerResult.isCorrect) {
    updatedPlayer.streak += 1;
  } else {
    updatedPlayer.streak = 0;
    updatedPlayer.lives = Math.max(0, updatedPlayer.lives - 1);
  }

  // Update badges (every 10 points)
  updatedPlayer.badges = Math.floor(updatedPlayer.score / 10);

  // Update unlocked services
  if (answerResult.isCorrect && question.service && !updatedPlayer.unlockedServices.includes(question.service)) {
    updatedPlayer.unlockedServices.push(question.service);
  }

  // Check for achievements
  updatedPlayer.achievements = checkAchievements(updatedPlayer, answerResult, question);

  return updatedPlayer;
};

// Keep the old function name for backward compatibility, but make it safer
export const updatePlayerStats = (
  player: Player,
  updates: Partial<Player>
): Player => {
  return updatePlayerProperties(player, updates);
};

export const checkAchievements = (
  player: Player,
  answerResult: AnswerResult,
  question: Question
): Achievement[] => {
  const newAchievements: Achievement[] = [...player.achievements];
  const achievementIds = newAchievements.map(a => a.id);

  // First correct answer
  if (answerResult.isCorrect && !achievementIds.includes('first-correct')) {
    const achievement = achievements.find(a => a.id === 'first-correct');
    if (achievement) {
      newAchievements.push({ ...achievement, unlockedAt: new Date() });
    }
  }

  // Streak achievements
  if (player.streak === 5 && !achievementIds.includes('streak-5')) {
    const achievement = achievements.find(a => a.id === 'streak-5');
    if (achievement) {
      newAchievements.push({ ...achievement, unlockedAt: new Date() });
    }
  }

  // Speed demon (need to track this separately in game state)
  if (answerResult.timeToAnswer <= 5 && !achievementIds.includes('speed-demon')) {
    // This would need additional tracking in the game state
  }

  // Security expert
  if (question.category && question.category.id === 'security' && answerResult.isCorrect) {
    const securityQuestions = player.achievements.filter(a => a.id.startsWith('security-')).length;
    if (securityQuestions >= 20 && !achievementIds.includes('security-expert')) {
      const achievement = achievements.find(a => a.id === 'security-expert');
      if (achievement) {
        newAchievements.push({ ...achievement, unlockedAt: new Date() });
      }
    }
  }

  // Service master
  if (player.unlockedServices.length >= 15 && !achievementIds.includes('service-master')) {
    const achievement = achievements.find(a => a.id === 'service-master');
    if (achievement) {
      newAchievements.push({ ...achievement, unlockedAt: new Date() });
    }
  }

  return newAchievements;
};

export const generateRoomCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const adaptDifficulty = (player: Player, recentAnswers: boolean[]): 'Easy' | 'Medium' | 'Hard' => {
  if (recentAnswers.length < 3) return 'Easy';
  
  const recentCorrect = recentAnswers.slice(-5).filter(Boolean).length;
  const accuracy = recentCorrect / Math.min(5, recentAnswers.length);
  
  if (accuracy >= 0.8) return 'Hard';
  if (accuracy >= 0.6) return 'Medium';
  return 'Easy';
};