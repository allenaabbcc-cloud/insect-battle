import React, { useState } from 'react';
import insects from '../data/insects.json';

const WorldMap = ({ onBack, onSelectCard }) => {
  const [hoveredInsect, setHoveredInsect] = useState(null);

  const getInsectColor = (type) => {
    switch (type) {
      case '毒': return { primary: '#FF4444', secondary: '#8B0000', glow: 'rgba(255, 68, 68, 0.5)' };
      case '水': return { primary: '#64D2FF', secondary: '#1E90FF', glow: 'rgba(100, 210, 255, 0.5)' };
      case '力量': return { primary: '#FFB84D', secondary: '#FF8C00', glow: 'rgba(255, 184, 77, 0.5)' };
      default: return { primary: '#FFB84D', secondary: '#FF8C00', glow: 'rgba(255, 184, 77, 0.5)' };
    }
  };

  const insectPositions = {
    1: { x: 25, y: 55, label: '巴西' },
    2: { x: 50, y: 40, label: '欧洲' },
    3: { x: 65, y: 55, label: '中东' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-4xl font-black text-yellow-400 drop-shadow-lg">
            🌍 昆虫世界地图 🌍
          </h1>
          <div className="w-32"></div>
        </div>

        <div className="relative mx-auto bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-500/50" style={{ height: '600px' }}>
          {/* 装饰性元素 */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full blur-xl"></div>
          </div>

          {/* 各大洲 - 手绘风格 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* 北美洲 */}
            <path d="M15 15 Q10 25 12 35 Q15 40 20 38 Q25 35 22 25 Q20 20 15 15 Z" fill="#3a7d44" stroke="#2d5a32" strokeWidth="0.5" />
            
            {/* 南美洲 */}
            <path d="M20 45 Q18 55 22 65 Q28 72 30 68 Q32 60 28 50 Q25 45 20 45 Z" fill="#4a9a54" stroke="#3a7d44" strokeWidth="0.5" />
            
            {/* 欧洲 */}
            <path d="M45 25 Q42 30 45 35 Q50 38 52 33 Q55 28 50 25 Z" fill="#5ab064" stroke="#4a9a54" strokeWidth="0.5" />
            
            {/* 非洲 */}
            <path d="M48 38 Q45 48 50 60 Q58 68 60 60 Q62 50 58 40 Q55 38 48 38 Z" fill="#6ac074" stroke="#5ab064" strokeWidth="0.5" />
            
            {/* 亚洲 */}
            <path d="M55 20 Q65 15 80 20 Q85 30 75 35 Q65 38 60 32 Q55 28 55 20 Z" fill="#7ad084" stroke="#6ac074" strokeWidth="0.5" />
            
            {/* 大洋洲 */}
            <path d="M75 65 Q85 62 88 70 Q85 78 75 75 Q70 72 75 65 Z" fill="#8ae094" stroke="#7ad084" strokeWidth="0.5" />
            
            {/* 北极 */}
            <circle cx="50" cy="5" r="8" fill="#e0f0ff" opacity="0.7" />
            
            {/* 南极 */}
            <ellipse cx="50" cy="95" rx="25" ry="5" fill="#e0f0ff" opacity="0.7" />
          </svg>

          {/* 昆虫标记 */}
          {insects.map((insect) => {
            const pos = insectPositions[insect.id];
            const colors = getInsectColor(insect.type);
            
            return (
              <div
                key={insect.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 z-10"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`
                }}
                onMouseEnter={() => setHoveredInsect(insect)}
                onMouseLeave={() => setHoveredInsect(null)}
                onClick={() => onSelectCard(insect)}
              >
                {/* 发光效果 */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: colors.glow,
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />
                
                {/* 主要卡片 */}
                <div
                  className="relative w-18 h-24 rounded-xl border-3 shadow-xl overflow-hidden transform"
                  style={{
                    backgroundColor: colors.secondary,
                    borderColor: colors.primary,
                    boxShadow: `0 0 30px ${colors.glow}`
                  }}
                >
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                    {insect.type === '毒' ? '☠️' : insect.type === '水' ? '💧' : '💪'}
                  </div>
                  
                  <div className="flex items-center justify-center h-14 text-3xl">
                    {insect.name === '巴西游走蛛' && '🕷️'}
                    {insect.name === '豆娘稚虫' && '🦗'}
                    {insect.name === '避日蛛' && '🦂'}
                  </div>
                  
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold text-center w-full px-1">
                    {insect.name.substring(0, 6)}
                  </div>
                </div>

                {/* 位置标签 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  📍 {pos.label}
                </div>

                {/* 悬停卡片 */}
                {hoveredInsect?.id === insect.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50">
                    <div
                      className="w-56 p-4 rounded-xl shadow-2xl border-3"
                      style={{
                        background: `linear-gradient(145deg, ${colors.secondary}, #1a1a2e)`,
                        borderColor: colors.primary
                      }}
                    >
                      <div className="text-center mb-2">
                        <span className="text-4xl">
                          {insect.name === '巴西游走蛛' && '🕷️'}
                          {insect.name === '豆娘稚虫' && '🦗'}
                          {insect.name === '避日蛛' && '🦂'}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-center mb-1">{insect.name}</h3>
                      <p className="text-gray-300 text-sm text-center mb-2">{insect.className}</p>
                      <div className="bg-black/30 rounded-lg p-2 mb-2">
                        <p className="text-yellow-300 text-xs text-center">📍 {pos.label}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400">点击查看详情 →</p>
                      </div>
                    </div>
                    <div 
                      className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] mx-auto"
                      style={{
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: colors.secondary
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {insects.map((insect) => {
            const colors = getInsectColor(insect.type);
            const pos = insectPositions[insect.id];
            return (
              <div
                key={insect.id}
                className="bg-black/40 rounded-xl p-4 border-2 transition-all hover:scale-105 cursor-pointer"
                style={{ borderColor: colors.primary }}
                onClick={() => onSelectCard(insect)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-4xl">
                    {insect.name === '巴西游走蛛' && '🕷️'}
                    {insect.name === '豆娘稚虫' && '🦗'}
                    {insect.name === '避日蛛' && '🦂'}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{insect.name}</h3>
                    <p className="text-gray-400 text-sm">{insect.className}</p>
                    <p className="text-yellow-400 text-xs">📍 {pos.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-yellow-200">
          <p className="text-lg">💡 点击地图上的昆虫标记查看详情！</p>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
