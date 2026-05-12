import React, { useState, useEffect } from 'react';
import EvolutionCard from './EvolutionCard';
import evolutionData from '../data/evolution.json';

const EvolutionCenter = ({ onBack, onSelectCard, userCollection = {} }) => {
  const [selectedInsect, setSelectedInsect] = useState(null);
  const [insectStages, setInsectStages] = useState({});
  const [showEvolution, setShowEvolution] = useState(false);
  const [evolutionAnimation, setEvolutionAnimation] = useState(false);

  useEffect(() => {
    const savedStages = localStorage.getItem('insectStages');
    if (savedStages) {
      setInsectStages(JSON.parse(savedStages));
    } else {
      const initialStages = {};
      evolutionData.forEach(insect => {
        initialStages[insect.id] = {
          stage: 'A',
          exp: 0,
          evolutionCount: 0
        };
      });
      setInsectStages(initialStages);
      localStorage.setItem('insectStages', JSON.stringify(initialStages));
    }
  }, []);

  const saveStages = (newStages) => {
    setInsectStages(newStages);
    localStorage.setItem('insectStages', JSON.stringify(newStages));
  };

  const handleInsectSelect = (insect) => {
    setSelectedInsect(insect);
    setShowEvolution(false);
  };

  const handleEvolve = () => {
    if (!selectedInsect) return;

    const currentData = insectStages[selectedInsect.id];
    if (!currentData || currentData.stage === 'SS') return;

    const expToNext = currentData.stage === 'A' 
      ? selectedInsect.expToS 
      : selectedInsect.expToSS;

    if (currentData.exp >= expToNext) {
      setEvolutionAnimation(true);
      
      setTimeout(() => {
        const newStage = currentData.stage === 'A' ? 'S' : 'SS';
        const newStages = {
          ...insectStages,
          [selectedInsect.id]: {
            ...currentData,
            stage: newStage,
            exp: 0,
            evolutionCount: currentData.evolutionCount + 1
          }
        };
        saveStages(newStages);
        setEvolutionAnimation(false);
        setShowEvolution(false);
      }, 2000);
    }
  };

  const getInsectEmoji = (baseName) => {
    if (baseName.includes('游走蛛') || baseName.includes('寡妇')) return '🕷️';
    if (baseName.includes('豆娘')) return '🦗';
    if (baseName.includes('避日蛛')) return '🦂';
    if (baseName.includes('虎头蜂') || baseName.includes('黄蜂')) return '🐝';
    if (baseName.includes('龙虱')) return '🐞';
    if (baseName.includes('蜗牛')) return '🐌';
    if (baseName.includes('仰泳蝽')) return '🦟';
    if (baseName.includes('屎壳郎')) return '🪲';
    if (baseName.includes('螽斯')) return '🦗';
    if (baseName.includes('独裁巨蝎')) return '🦂';
    if (baseName.includes('匆忙')) return '🪰';
    if (baseName.includes('蚁狮')) return '🐜';
    if (baseName.includes('化蛛侠')) return '🕷️';
    return '🐛';
  };

  const getRankColor = (stage) => {
    switch (stage) {
      case 'A': return 'text-gray-400';
      case 'S': return 'text-yellow-400';
      case 'SS': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getRankBadge = (stage) => {
    switch (stage) {
      case 'A': return { text: '幼虫', color: 'bg-gray-600' };
      case 'S': return { text: '成长', color: 'bg-yellow-600' };
      case 'SS': return { text: '完全', color: 'bg-orange-600' };
      default: return { text: '幼虫', color: 'bg-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 drop-shadow-lg">
            🦋 进化中心 🦋
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：昆虫列表 */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📚</span> 选择昆虫
              </h2>
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {evolutionData.map((insect) => {
                  const stageInfo = insectStages[insect.id] || { stage: 'A', exp: 0 };
                  const badge = getRankBadge(stageInfo.stage);
                  
                  return (
                    <div
                      key={insect.id}
                      onClick={() => handleInsectSelect(insect)}
                      className={`bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-3 cursor-pointer transition-all ${
                        selectedInsect?.id === insect.id ? 'ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getInsectEmoji(insect.baseName)}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-sm">{insect.baseName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`${badge.color} text-xs text-white px-2 py-0.5 rounded-full`}>
                              {badge.text}
                            </span>
                            <span className="text-xs text-gray-400">{insect.type}</span>
                          </div>
                        </div>
                        {stageInfo.stage !== 'SS' && (
                          <div className="text-xs text-gray-500">
                            {stageInfo.exp} EXP
                          </div>
                        )}
                        {stageInfo.stage === 'SS' && (
                          <span className="text-yellow-400">👑</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 中间：进化卡片 */}
          <div className="lg:col-span-2">
            {selectedInsect ? (
              <div className="space-y-4">
                {evolutionAnimation && (
                  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="text-center animate-pulse">
                      <div className="text-9xl mb-4">✨</div>
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                        进化中...
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {getInsectEmoji(selectedInsect.baseName)} {selectedInsect.baseName}
                    </h2>
                    <span className={`${getRankColor(insectStages[selectedInsect.id]?.stage || 'A')} font-bold`}>
                      {getRankBadge(insectStages[selectedInsect.id]?.stage || 'A').text}期
                    </span>
                  </div>

                  <EvolutionCard
                    insectEvolution={selectedInsect}
                    currentStage={insectStages[selectedInsect.id]?.stage || 'A'}
                    exp={insectStages[selectedInsect.id]?.exp || 0}
                    onSelect={(stage) => setShowEvolution(stage === insectStages[selectedInsect.id]?.stage)}
                  />

                  {/* 进化按钮 */}
                  {(insectStages[selectedInsect.id]?.stage || 'A') !== 'SS' && (
                    <div className="mt-6 text-center">
                      {(() => {
                        const currentStage = insectStages[selectedInsect.id]?.stage || 'A';
                        const currentExp = insectStages[selectedInsect.id]?.exp || 0;
                        const expToNext = currentStage === 'A' 
                          ? selectedInsect.expToS 
                          : selectedInsect.expToSS;
                        const canEvolve = currentExp >= expToNext;

                        return (
                          <button
                            onClick={handleEvolve}
                            disabled={!canEvolve}
                            className={`font-bold py-4 px-8 rounded-xl text-xl transition-all ${
                              canEvolve
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black shadow-lg transform hover:scale-105'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {canEvolve 
                              ? '🌟 进化为 ' + (currentStage === 'A' ? 'S级' : 'SS级') + '！'
                              : `需要 ${expToNext} EXP 才能进化 (当前 ${currentExp} EXP)`
                            }
                          </button>
                        );
                      })()}
                    </div>
                  )}

                  {(insectStages[selectedInsect.id]?.stage || 'A') === 'SS' && (
                    <div className="mt-6 text-center">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-xl text-xl inline-block">
                        👑 已达到最强形态！👑
                      </div>
                    </div>
                  )}
                </div>

                {/* 详细信息 */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>📖</span> 昆虫档案
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">分布地区</div>
                      <div className="text-white font-bold">{selectedInsect.location}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">所属班级</div>
                      <div className="text-white font-bold">{selectedInsect.className}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">昆虫类型</div>
                      <div className="text-white font-bold">{selectedInsect.type}系</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">进化次数</div>
                      <div className="text-white font-bold">
                        {insectStages[selectedInsect.id]?.evolutionCount || 0} 次
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-white mb-3">🔄 进化路线</h4>
                    <div className="space-y-3">
                      {selectedInsect.stages.map((stage, index) => {
                        const currentStage = insectStages[selectedInsect.id]?.stage || 'A';
                        const isCurrent = stage.stage === currentStage;
                        const isEvolved = selectedInsect.stages.findIndex(s => s.stage === currentStage) >= index;

                        return (
                          <div 
                            key={stage.stage}
                            className={`rounded-lg p-4 border-2 transition-all ${
                              isCurrent 
                                ? 'border-yellow-400 bg-yellow-400/10' 
                                : isEvolved 
                                  ? 'border-green-400 bg-green-400/10' 
                                  : 'border-gray-600 bg-gray-800/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {stage.stage === 'A' ? '🥚' : stage.stage === 'S' ? '🌱' : '🦋'}
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white">{stage.name}</span>
                                  {isCurrent && (
                                    <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                                      当前
                                    </span>
                                  )}
                                  {isEvolved && !isCurrent && (
                                    <span className="bg-green-400 text-black text-xs px-2 py-0.5 rounded-full">
                                      已进化
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">{stage.rank}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-orange-400 font-bold">ATK {stage.atk}</div>
                                <div className="text-sm text-gray-500">{stage.ultimate}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">🦋</div>
                  <div className="text-2xl font-bold">选择一个昆虫开始进化之旅</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 inline-block">
            <p className="text-gray-300">
              💡 <span className="text-yellow-400 font-bold">进化提示</span>：通过战斗获得经验值，积累足够的经验就能让昆虫进化！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionCenter;