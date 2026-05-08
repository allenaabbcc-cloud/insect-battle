import React, { useState } from 'react';
import achievements from '../data/achievements.json';

const Achievements = ({ onBack, playerStats }) => {
  const [localAchievements, setLocalAchievements] = useState(achievements);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return { bg: 'from-gray-600 to-gray-700', border: '#6b7280', icon: '⚪' };
      case 'rare': return { bg: 'from-blue-600 to-blue-700', border: '#3b82f6', icon: '🔵' };
      case 'epic': return { bg: 'from-purple-600 to-purple-700', border: '#8b5cf6', icon: '🟣' };
      case 'legendary': return { bg: 'from-yellow-600 to-orange-600', border: '#f59e0b', icon: '🟡' };
      default: return { bg: 'from-gray-600 to-gray-700', border: '#6b7280', icon: '⚪' };
    }
  };

  const unlockAchievement = (id) => {
    setLocalAchievements(prev => 
      prev.map(a => a.id === id ? { ...a, unlocked: true } : a)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-4xl font-black text-yellow-400 drop-shadow-lg">
            🏆 成就系统 🏆
          </h1>
          <div className="w-32"></div>
        </div>

        {/* 玩家统计 */}
        <div className="bg-black/40 rounded-2xl p-6 border border-yellow-500/50 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📊 Sam的战斗统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="text-white font-bold text-xl">{playerStats.totalBattles}</div>
              <div className="text-gray-400 text-sm">总战斗次数</div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <div className="text-green-400 font-bold text-xl">{playerStats.wins}</div>
              <div className="text-gray-400 text-sm">胜利次数</div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">💀</div>
              <div className="text-red-400 font-bold text-xl">{playerStats.losses}</div>
              <div className="text-gray-400 text-sm">失败次数</div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-orange-400 font-bold text-xl">{playerStats.winStreak}</div>
              <div className="text-gray-400 text-sm">连胜记录</div>
            </div>
          </div>
        </div>

        {/* 成就进度 */}
        <div className="bg-black/40 rounded-2xl p-6 border border-blue-500/50 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-400">📈 成就进度</h2>
            <div className="text-yellow-400 font-bold">
              {localAchievements.filter(a => a.unlocked).length} / {localAchievements.length}
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
              style={{ width: `${(localAchievements.filter(a => a.unlocked).length / localAchievements.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 成就列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localAchievements.map((achievement) => {
            const colors = getRarityColor(achievement.rarity);
            return (
              <div
                key={achievement.id}
                className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border-4 transition-all duration-300 ${achievement.unlocked ? 'scale-100' : 'grayscale opacity-70'}`}
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{colors.icon}</span>
                      <h3 className="text-white font-bold text-xl">{achievement.name}</h3>
                      {achievement.unlocked && <span className="text-yellow-400 text-xl">✅</span>}
                    </div>
                    <p className="text-gray-200 mb-3">{achievement.description}</p>
                    {!achievement.unlocked && (
                      <button
                        onClick={() => unlockAchievement(achievement.id)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-all"
                      >
                        🎯 解锁成就
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-yellow-200">
          <p className="text-lg">💡 继续探索，解锁更多成就！</p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
