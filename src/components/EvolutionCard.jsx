import React from 'react';

const EvolutionCard = ({ insectEvolution, onSelect, currentStage = 'A', exp = 0 }) => {
  const typeColors = {
    '毒': {
      border: '#8B0000',
      accent: '#FF4444',
      bg: 'linear-gradient(145deg, #1a0505 0%, #3a1010 100%)',
      icon: '☠️',
      glow: '0 0 20px rgba(255, 68, 68, 0.4)'
    },
    '水': {
      border: '#1E90FF',
      accent: '#64D2FF',
      bg: 'linear-gradient(145deg, #052040 0%, #103060 100%)',
      icon: '💧',
      glow: '0 0 20px rgba(100, 210, 255, 0.4)'
    },
    '力量': {
      border: '#FF8C00',
      accent: '#FFB84D',
      bg: 'linear-gradient(145deg, #2a1a05 0%, #5a3a10 100%)',
      icon: '💪',
      glow: '0 0 20px rgba(255, 184, 77, 0.4)'
    }
  };

  const rankLabels = {
    'A': { text: '幼虫期', color: '#888888', icon: '🥚' },
    'S': { text: '成长期', color: '#FFD700', icon: '🌟' },
    'SS': { text: '完全体', color: '#FF6B35', icon: '👑' }
  };

  const colors = typeColors[insectEvolution.type] || typeColors['力量'];

  const getStageEmoji = (stage) => {
    switch (stage) {
      case 'A': return '🥚';
      case 'S': return '🌱';
      case 'SS': return '🦋';
      default: return '🥚';
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

  const renderEvolutionPath = () => {
    return (
      <div className="flex justify-center items-center gap-2 my-4">
        {insectEvolution.stages.map((stage, index) => {
          const rank = rankLabels[stage.stage];
          const isActive = stage.stage === currentStage;
          const isEvolved = insectEvolution.stages.findIndex(s => s.stage === currentStage) >= index;

          return (
            <React.Fragment key={stage.stage}>
              <div 
                className={`relative cursor-pointer transition-all ${
                  isActive ? 'scale-110' : isEvolved ? 'scale-100' : 'scale-90 opacity-50'
                }`}
                onClick={() => onSelect && onSelect(stage.stage)}
              >
                <div 
                  className={`rounded-full flex items-center justify-center border-4 transition-all ${
                    isActive ? 'border-yellow-400 shadow-lg' : isEvolved ? 'border-gray-400' : 'border-gray-600'
                  }`}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: isActive ? colors.bg : 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)'
                  }}
                >
                  <span className="text-2xl">{getStageEmoji(stage.stage)}</span>
                </div>
                <div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <div className={`text-xs font-bold ${isActive ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {stage.rank}
                  </div>
                  <div className={`text-xs ${isEvolved ? 'text-white' : 'text-gray-600'}`}>
                    {stage.stage}
                  </div>
                </div>
              </div>
              {index < insectEvolution.stages.length - 1 && (
                <div className="flex items-center px-2">
                  <div className={`w-12 h-1 rounded ${
                    isEvolved ? 'bg-gradient-to-r from-green-400 to-yellow-400' : 'bg-gray-600'
                  }`}>
                    {isEvolved && (
                      <div className="text-center text-xs text-white -mt-4">→</div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const getCurrentStageData = () => {
    return insectEvolution.stages.find(s => s.stage === currentStage) || insectEvolution.stages[0];
  };

  const currentData = getCurrentStageData();
  const rank = rankLabels[currentStage];
  const expToNext = currentStage === 'A' ? insectEvolution.expToS : currentStage === 'S' ? insectEvolution.expToSS : null;
  const expProgress = expToNext ? (exp / expToNext) * 100 : 0;

  return (
    <div 
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-105 cursor-pointer"
      style={{
        border: `3px solid ${isActive => isActive}(${currentStage === 'SS' ? colors.accent : rank.color})`,
        boxShadow: currentStage === 'SS' ? colors.glow : `0 0 15px ${rank.color}40`
      }}
    >
      {currentStage === 'SS' && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
          👑 最强形态
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{getInsectEmoji(insectEvolution.baseName)}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{currentData.name}</h3>
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm font-bold px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: rank.color,
                    color: 'black'
                  }}
                >
                  {rank.icon} {rank.text}
                </span>
                <span className="text-gray-400 text-sm">{currentData.stage}</span>
              </div>
            </div>
          </div>
          <div 
            className="text-3xl font-black"
            style={{ color: colors.accent }}
          >
            {currentData.atk}
          </div>
        </div>

        {renderEvolutionPath()}

        <div className="space-y-2 mt-8">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-sm">⚔️ 必杀技</span>
            <span className="text-white text-sm flex-1">{currentData.ultimate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-red-400 text-sm">⚠️ 弱点</span>
            <span className="text-white text-sm flex-1">{currentData.weakness}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-purple-400 text-sm">🦅 天敌</span>
            <span className="text-white text-sm flex-1">{currentData.naturalEnemy}</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
          <p className="text-gray-300 text-sm italic">"{currentData.description}"</p>
        </div>

        {expToNext && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">升级进度</span>
              <span className="text-yellow-400 font-bold">{exp} / {expToNext} EXP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, expProgress)}%`,
                  background: currentStage === 'A' 
                    ? 'linear-gradient(90deg, #888 0%, #666 100%)'
                    : 'linear-gradient(90deg, #FFD700 0%, #FF6B35 100%)'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvolutionCard;