import { Achievement } from '../types/game';

export const achievements: Achievement[] = [
  {
    id: 'first-correct',
    name: 'First Steps',
    description: 'Answer your first question correctly',
    icon: '🎯',
    unlockedAt: new Date(),
    rarity: 'common'
  },
  {
    id: 'streak-5',
    name: 'On Fire',
    description: 'Get 5 answers correct in a row',
    icon: '🔥',
    unlockedAt: new Date(),
    rarity: 'rare'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer 10 questions in under 5 seconds each',
    icon: '⚡',
    unlockedAt: new Date(),
    rarity: 'epic'
  },
  {
    id: 'perfect-game',
    name: 'Flawless Victory',
    description: 'Complete a game with 100% accuracy',
    icon: '👑',
    unlockedAt: new Date(),
    rarity: 'legendary'
  },
  {
    id: 'service-master',
    name: 'Service Master',
    description: 'Unlock all AWS services',
    icon: '🏆',
    unlockedAt: new Date(),
    rarity: 'epic'
  },
  {
    id: 'security-expert',
    name: 'Security Expert',
    description: 'Answer 20 security questions correctly',
    icon: '🛡️',
    unlockedAt: new Date(),
    rarity: 'rare'
  }
];