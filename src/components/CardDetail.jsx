import React, { useState } from 'react';
import Card from './Card';

const CardDetail = ({ insect, onBack }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const typeColors = {
    '毒': {
      primary: '#FF4444',
      secondary: '#8B0000',
      bg: 'from-red-900 via-red-800 to-red-900'
    },
    '水': {
      primary: '#64D2FF',
      secondary: '#1E90FF',
      bg: 'from-blue-900 via-blue-800 to-blue-900'
    },
    '力量': {
      primary: '#FFB84D',
      secondary: '#FF8C00',
      bg: 'from-orange-900 via-orange-800 to-orange-900'
    }
  };

  const colors = typeColors[insect.type] || typeColors['力量'];

  const getUltimateAnimation = () => {
    if (insect.name === '巴西游走蛛') {
      return (
        <div className="relative w-full h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl animate-bounce">☠️</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${15 + (i % 6) * 15}%`,
                  top: `${20 + Math.floor(i / 6) * 50}%`,
                  animation: `pulse ${0.8 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="text-4xl">💚</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (insect.name === '豆娘稚虫') {
      return (
        <div className="relative w-full h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl animate-pulse">🎭</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 10}%`,
                  top: '50%',
                  animation: `bounce ${0.6 + i * 0.12}s ease-in-out infinite`,
                  animationDelay: `${i * 0.08}s`
                }}
              >
                <div className="text-3xl">💦</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl animate-shake">🔥</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i % 3) * 30}%`,
                  top: `${30 + Math.floor(i / 3) * 30}%`,
                  animation: `pulse ${0.5 + i * 0.1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.06}s`
                }}
              >
                <div className="text-3xl">⚔️</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回图鉴
          </button>
          <h1 className="text-3xl font-black text-white drop-shadow-lg">
            📖 {insect.name} 详细资料
          </h1>
          <div className="w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-6">
            <Card insect={insect} isShowcase />
            
            <div className="w-full bg-black/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-yellow-400 mb-6 text-center">🖼️ 昆虫照片展示</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-blue-400 text-center">👦 Sam手工制作</h4>
                  <div className="relative rounded-xl overflow-hidden border-4 border-blue-500 shadow-xl">
                    <img 
                      src={insect.samImage}
                      alt={`${insect.name} - Sam制作`}
                      className="w-full h-auto object-cover min-h-48"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center bg-gray-800 min-h-48 text-gray-400">
                      <div className="text-center p-4">
                        <div className="text-5xl mb-3">🎨</div>
                        <div className="font-bold mb-1">Sam的手工图片</div>
                        <div className="text-sm">请把图片放到 /public/sam-images/ 目录</div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-3">
                      <div className="text-white text-sm font-bold">
                        🖌️ {insect.name}（Sam手工版）
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-blue-300 text-xs">
                    💖 Sam的创意作品！
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-green-400 text-center">📷 真实昆虫照片</h4>
                  <div className="relative rounded-xl overflow-hidden border-4 border-green-500 shadow-xl">
                    <img 
                      src={insect.realImage}
                      alt={`${insect.name} - 真实照片`}
                      className="w-full h-auto object-cover min-h-48"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center bg-gray-800 min-h-48 text-gray-400">
                      <div className="text-center">
                        <div className="text-5xl mb-3">🦗</div>
                        <div>真实照片加载中...</div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/90 to-transparent p-3">
                      <div className="text-white text-sm font-bold">
                        🔬 {insect.name}（{insect.knowledge.scientificName}）
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-green-300 text-xs">
                    图片来源：维基百科（知识共享许可）
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-white font-black text-xl py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              {isAnimating ? '⏸️ 停止必杀技' : '⚡ 发动必杀技'}
            </button>
            
            {isAnimating && (
              <div className="bg-black/60 rounded-2xl p-4 w-full border-2 border-yellow-500">
                <div className="text-center text-yellow-400 text-xl font-bold mb-4">
                  🎬 {insect.ultimate} 发动中！
                </div>
                {getUltimateAnimation()}
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-black/50 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-black text-yellow-400 mb-4">
                🔬 科学信息
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-800/80 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">学名</div>
                  <div className="text-white font-bold text-lg">{insect.knowledge.scientificName}</div>
                </div>
                
                <div className="bg-gray-800/80 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">🌍 栖息地</div>
                  <div className="text-white font-medium">{insect.knowledge.habitat}</div>
                </div>
                
                <div className="bg-gray-800/80 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">🍽️ 食物</div>
                  <div className="text-white font-medium">{insect.knowledge.diet}</div>
                </div>
                
                <div className="bg-gray-800/80 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">⏱️ 生命周期</div>
                  <div className="text-white font-medium">{insect.knowledge.lifecycle}</div>
                </div>
                
                <div className="bg-gray-800/80 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">📝 介绍</div>
                  <div className="text-white">{insect.knowledge.description}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 rounded-2xl p-6 border border-yellow-600">
              <h2 className="text-2xl font-black text-yellow-400 mb-4">
                🎯 有趣冷知识
              </h2>
              
              <div className="space-y-3">
                {insect.funFacts.map((fact, index) => (
                  <div 
                    key={index}
                    className="bg-yellow-900/30 rounded-xl p-4 border border-yellow-600/30"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⭐</span>
                      <div className="text-yellow-100">{fact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
