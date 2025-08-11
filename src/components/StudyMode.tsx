import React, { useState, useEffect } from 'react';
import { Question, QuestionCategory } from '../types/game';
import { UserProfile } from '../types/user';
import { UserService } from '../services/userService';
import { questions, getQuestionsByCategory, getQuestionsByDifficulty } from '../data/questions';
import { questionCategories } from '../data/categories';
import { 
  BookOpen, Target, Bookmark, RotateCcw, Play, 
  Brain, Clock, CheckCircle, XCircle, ArrowRight,
  TrendingUp, Award, Filter, Shuffle
} from 'lucide-react';

interface StudyModeProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateUser: (user: UserProfile) => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ user, onBack, onUpdateUser }) => {
  const [mode, setMode] = useState<'practice' | 'flashcards' | 'review' | 'analytics'>('practice');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('mixed');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studyQuestions, setStudyQuestions] = useState<Question[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: boolean }>({});
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    startTime: new Date()
  });

  const userService = UserService.getInstance();

  useEffect(() => {
    generateStudyQuestions();
  }, [selectedCategory, selectedDifficulty, mode]);

  const generateStudyQuestions = () => {
    let filteredQuestions = [...questions];

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'bookmarked') {
        filteredQuestions = questions.filter(q => user.bookmarkedQuestions.includes(q.id.toString()));
      } else if (selectedCategory === 'weak-areas') {
        const weakAreas = userService.getWeakAreas();
        filteredQuestions = questions.filter(q => weakAreas.includes(q.category.id));
      } else {
        filteredQuestions = getQuestionsByCategory(selectedCategory);
      }
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'mixed') {
      filteredQuestions = getQuestionsByDifficulty(selectedDifficulty);
    }

    // Shuffle questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setStudyQuestions(shuffled.slice(0, 20)); // Limit to 20 questions per session
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setUserAnswers({});
    setSessionStats({ correct: 0, total: 0, startTime: new Date() });
  };

  const handleAnswer = async (isCorrect: boolean) => {
    const currentQuestion = studyQuestions[currentQuestionIndex];
    const questionId = currentQuestion.id.toString();
    
    setUserAnswers(prev => ({ ...prev, [questionId]: isCorrect }));
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    // Record the answer in user statistics
    await userService.recordQuestionAnswer(currentQuestion, isCorrect, 0);
    
    const updatedUser = userService.getCurrentUser();
    if (updatedUser) {
      onUpdateUser(updatedUser);
    }

    if (mode === 'practice') {
      setShowAnswer(true);
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < studyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      // Session complete
      recordStudySession();
    }
  };

  const recordStudySession = async () => {
    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - sessionStats.startTime.getTime()) / 60000); // minutes
    
    await userService.recordStudySession({
      id: crypto.randomUUID(),
      userId: user.id,
      mode,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      difficulty: selectedDifficulty !== 'mixed' ? selectedDifficulty : undefined,
      startTime: sessionStats.startTime,
      endTime,
      questionsAnswered: sessionStats.total,
      correctAnswers: sessionStats.correct,
      timeSpent,
      score: sessionStats.correct * 10
    });
  };

  const toggleBookmark = async (questionId: string) => {
    await userService.toggleBookmark(questionId);
    const updatedUser = userService.getCurrentUser();
    if (updatedUser) {
      onUpdateUser(updatedUser);
    }
  };

  const currentQuestion = studyQuestions[currentQuestionIndex];
  const progress = studyQuestions.length > 0 ? ((currentQuestionIndex + 1) / studyQuestions.length) * 100 : 0;

  const studyModes = [
    { id: 'practice', label: 'Practice', icon: Target, description: 'Answer questions with immediate feedback' },
    { id: 'flashcards', label: 'Flashcards', icon: Brain, description: 'Quick review of key concepts' },
    { id: 'review', label: 'Review', icon: RotateCcw, description: 'Review bookmarked and difficult questions' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'View your performance insights' }
  ];

  const categoryOptions = [
    { id: 'all', label: 'All Categories', icon: '📚' },
    { id: 'weak-areas', label: 'Weak Areas', icon: '🎯' },
    { id: 'bookmarked', label: 'Bookmarked', icon: '🔖' },
    ...questionCategories.map(cat => ({ id: cat.id, label: cat.name, icon: cat.icon }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Study Mode</h1>
            <p className="text-slate-300">Focused learning for AWS certification success</p>
          </div>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Main Menu
          </button>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {studyModes.map((studyMode) => {
            const Icon = studyMode.icon;
            return (
              <button
                key={studyMode.id}
                onClick={() => setMode(studyMode.id as any)}
                className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                  mode === studyMode.id
                    ? 'border-orange-400 bg-orange-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${mode === studyMode.id ? 'text-orange-400' : 'text-slate-400'}`} />
                <h3 className="font-semibold text-white mb-1">{studyMode.label}</h3>
                <p className="text-sm text-slate-400">{studyMode.description}</p>
              </button>
            );
          })}
        </div>

        {mode === 'analytics' ? (
          <AnalyticsView user={user} />
        ) : (
          <>
            {/* Filters */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Filter className="w-4 h-4 inline mr-1" />
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="mixed">Mixed Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={generateStudyQuestions}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>New Set</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Study Content */}
            {studyQuestions.length > 0 && currentQuestion ? (
              <div className="space-y-6">
                {/* Progress */}
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">
                      Question {currentQuestionIndex + 1} of {studyQuestions.length}
                    </span>
                    <span className="text-slate-300">
                      {sessionStats.correct}/{sessionStats.total} correct
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentQuestion.difficulty === 'Easy' ? 'text-green-400 bg-green-400/20' :
                        currentQuestion.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/20' :
                        'text-red-400 bg-red-400/20'
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-400 bg-blue-400/20">
                        {currentQuestion.category.icon} {currentQuestion.category.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleBookmark(currentQuestion.id.toString())}
                      className={`p-2 rounded-lg transition-colors ${
                        user.bookmarkedQuestions.includes(currentQuestion.id.toString())
                          ? 'text-yellow-400 bg-yellow-400/20'
                          : 'text-slate-400 hover:text-yellow-400'
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-8">
                    {currentQuestion.question}
                  </h2>

                  {mode === 'flashcards' ? (
                    <FlashcardView
                      question={currentQuestion}
                      showAnswer={showAnswer}
                      onToggleAnswer={() => setShowAnswer(!showAnswer)}
                      onAnswer={handleAnswer}
                    />
                  ) : (
                    <PracticeView
                      question={currentQuestion}
                      showAnswer={showAnswer}
                      onAnswer={handleAnswer}
                      userAnswer={userAnswers[currentQuestion.id.toString()]}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">No questions available for the selected filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('mixed');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FlashcardView: React.FC<{
  question: Question;
  showAnswer: boolean;
  onToggleAnswer: () => void;
  onAnswer: (isCorrect: boolean) => void;
}> = ({ question, showAnswer, onToggleAnswer, onAnswer }) => {
  return (
    <div className="space-y-6">
      {!showAnswer ? (
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border-2 border-slate-600 bg-slate-700/50"
            >
              <span className="text-lg text-white">
                <span className="font-bold text-orange-400 mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-900/20 border border-green-500/30">
            <h4 className="text-green-400 font-bold mb-2">Correct Answer</h4>
            <p className="text-white">
              {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
            </p>
          </div>
          
          {question.explanation && (
            <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
              <h4 className="text-blue-400 font-bold mb-2">Explanation</h4>
              <p className="text-slate-300">{question.explanation}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => onAnswer(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>I knew this</span>
            </button>
            <button
              onClick={() => onAnswer(false)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span>I didn't know</span>
            </button>
          </div>
        </div>
      )}

      {!showAnswer && (
        <div className="text-center">
          <button
            onClick={onToggleAnswer}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
};

const PracticeView: React.FC<{
  question: Question;
  showAnswer: boolean;
  onAnswer: (isCorrect: boolean) => void;
  userAnswer?: boolean;
}> = ({ question, showAnswer, onAnswer, userAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === question.correctAnswer;
    onAnswer(isCorrect);
  };

  const getOptionStyle = (index: number) => {
    if (!showAnswer) {
      return 'hover:bg-slate-700 hover:border-slate-600 cursor-pointer transform hover:scale-102 text-white';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-900/50 border-green-400 text-green-100';
    }
    
    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-900/50 border-red-400 text-red-100';
    }
    
    return 'bg-slate-800/50 border-slate-600 text-slate-300';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showAnswer}
            className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(index)}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">
                <span className="font-bold text-orange-400 mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </span>
              {showAnswer && index === question.correctAnswer && (
                <CheckCircle className="w-6 h-6 text-green-400" />
              )}
              {showAnswer && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showAnswer && question.explanation && (
        <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
          <h4 className="text-blue-400 font-bold mb-2">Explanation</h4>
          <p className="text-slate-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

const AnalyticsView: React.FC<{ user: UserProfile }> = ({ user }) => {
  const userService = UserService.getInstance();
  const weakAreas = userService.getWeakAreas();
  const recommendedTopics = userService.getRecommendedTopics();
  const studyStreak = userService.getStudyStreak();

  const getAccuracyPercentage = () => {
    const { totalQuestionsAnswered, correctAnswers } = user.statistics;
    return totalQuestionsAnswered > 0 ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) : 0;
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">{getAccuracyPercentage()}%</div>
          <div className="text-slate-300">Overall Accuracy</div>
        </div>
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{user.statistics.totalQuestionsAnswered}</div>
          <div className="text-slate-300">Questions Answered</div>
        </div>
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{studyStreak}</div>
          <div className="text-slate-300">Study Streak (days)</div>
        </div>
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{user.statistics.bestScore}</div>
          <div className="text-slate-300">Best Score</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-400" />
            Areas to Improve
          </h3>
          {weakAreas.length === 0 ? (
            <p className="text-slate-400">Great job! No weak areas identified.</p>
          ) : (
            <div className="space-y-3">
              {weakAreas.map((categoryId) => {
                const category = questionCategories.find(c => c.id === categoryId);
                const stats = user.statistics.categoryPerformance[categoryId];
                const accuracy = Math.round((stats.correctAnswers / stats.questionsAnswered) * 100);
                
                return (
                  <div key={categoryId} className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">
                        {category?.icon} {category?.name}
                      </span>
                      <span className="text-red-400">{accuracy}% accuracy</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-orange-400" />
            Recommended Topics
          </h3>
          <div className="space-y-3">
            {recommendedTopics.map((categoryId) => {
              const category = questionCategories.find(c => c.id === categoryId);
              
              return (
                <div key={categoryId} className="p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      {category?.icon} {category?.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-orange-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Category Performance</h3>
        <div className="space-y-4">
          {Object.values(user.statistics.categoryPerformance).map((categoryStats) => {
            const category = questionCategories.find(c => c.id === categoryStats.categoryId);
            const accuracy = Math.round((categoryStats.correctAnswers / categoryStats.questionsAnswered) * 100);
            
            return (
              <div key={categoryStats.categoryId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">
                    {category?.icon} {category?.name}
                  </span>
                  <span className="text-slate-300">
                    {categoryStats.correctAnswers}/{categoryStats.questionsAnswered} ({accuracy}%)
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      accuracy >= 80 ? 'bg-green-500' :
                      accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};