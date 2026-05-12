import React, { useState } from 'react';
import Card from './Card';
import insects from '../data/insects.json';

const CardGallery = ({ onBack, onSelectCard, customInsects = [] }) => {
  const allInsects = [...insects, ...customInsects];
  
  const classColors = {
    '毒虫班': { bg: 'from-red-900 to-red-800', text: 'text-red-400', border: 'border-red-500', icon: '☠️' },
    '水虫班': { bg: 'from-blue-900 to-blue-800', text: 'text-blue-400', border: 'border-blue-500', icon: '💧' },
    '飞虫班': { bg: 'from-yellow-900 to-yellow-800', text: 'text-yellow-400', border: 'border-yellow-500', icon: '🦋' },
    '甲虫班': { bg: 'from-amber-900 to-amber-800', text: 'text-amber-400', border: 'border-amber-500', icon: '🪲' },
    '沙漠虫班': { bg: 'from-orange-900 to-orange-800', text: 'text-orange-400', border: 'border-orange-500', icon: '🏜️' },
    '软体班': { bg: 'from-pink-900 to-pink-800', text: 'text-pink-400', border: 'border-pink-500', icon: '🐌' },
    '直翅目': { bg: 'from-green-900 to-green-800', text: 'text-green-400', border: 'border-green-500', icon: '🦗' },
    '幼虫班': { bg: 'from-purple-900 to-purple-800', text: 'text-purple-400', border: 'border-purple-500', icon: '🐛' },
    'default': { bg: 'from-gray-900 to-gray-800', text: 'text-gray-400', border: 'border-gray-500', icon: '🐝' }
  };

  const groupedByClass = allInsects.reduce((acc, insect) => {
    const className = insect.className || '其他';
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push(insect);
    return acc;
  }, {});

  const [expandedClasses, setExpandedClasses] = useState(
    Object.keys(groupedByClass).reduce((acc, className) => {
      acc[className] = true;
      return acc;
    }, {})
  );

  const toggleClass = (className) => {
    setExpandedClasses(prev => ({
      ...prev,
      [className]: !prev[className]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-4xl font-black text-yellow-400 drop-shadow-lg">
            📚 英雄卡牌图鉴 📚
          </h1>
          <div className="w-32"></div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🏫</span> 昆虫班级一览
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.entries(groupedByClass).map(([className, insectList]) => {
              const colors = classColors[className] || classColors.default;
              return (
                <button
                  key={className}
                  onClick={() => toggleClass(className)}
                  className={`
                    bg-gradient-to-br ${colors.bg}
                    rounded-xl p-4 border-2 ${colors.border}
                    hover:scale-105 transition-all cursor-pointer
                    ${expandedClasses[className] ? 'ring-2 ring-white' : ''}
                  `}
                >
                  <div className="text-3xl mb-2">{colors.icon}</div>
                  <div className={`${colors.text} font-bold text-sm mb-1`}>{className}</div>
                  <div className="text-white text-xs">{insectList.length} 只昆虫</div>
                </button>
              );
            })}
          </div>
        </div>

        {Object.entries(groupedByClass).map(([className, insectList]) => {
          const colors = classColors[className] || classColors.default;
          
          return (
            <div key={className} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className={`text-2xl font-bold ${colors.text} flex items-center gap-3 cursor-pointer hover:scale-105 transition-all`}
                  onClick={() => toggleClass(className)}
                >
                  <span>{colors.icon}</span>
                  <span>{className}</span>
                  <span className="text-white text-lg">({insectList.length}只)</span>
                </h2>
                <button
                  onClick={() => toggleClass(className)}
                  className={`
                    bg-gradient-to-r ${colors.bg}
                    rounded-lg px-4 py-2 text-white font-bold
                    hover:scale-105 transition-all
                  `}
                >
                  {expandedClasses[className] ? '收起 ▲' : '展开 ▼'}
                </button>
              </div>

              {expandedClasses[className] && (
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {insectList.map((insect) => (
                      <div 
                        key={insect.id}
                        className="flex flex-col items-center gap-4"
                      >
                        <Card 
                          insect={insect}
                          onClick={() => onSelectCard(insect)}
                          isShowcase
                          isCustom={customInsects.some(ci => ci.id === insect.id)}
                        />
                        <div className="text-center bg-black/40 rounded-lg p-3 w-full">
                          <div className="text-white font-bold mb-1 flex items-center justify-center gap-2">
                            <span>{insect.name}</span>
                            {customInsects.some(ci => ci.id === insect.id) && (
                              <span className="text-green-400 text-xs">🎨</span>
                            )}
                          </div>
                          <div className={`${colors.text} text-sm mb-1`}>
                            {insect.atk} ⚔️ ATK
                          </div>
                          <div className="text-gray-400 text-xs">
                            必杀技: {insect.ultimate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 inline-block">
            <p className="text-gray-300 text-lg mb-2">
              ✨ 总计 <span className="text-yellow-400 font-bold">{allInsects.length}</span> 只昆虫英雄
            </p>
            <p className="text-gray-400 text-sm">
              分布在 <span className="text-white font-bold">{Object.keys(groupedByClass).length}</span> 个班级
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p className="text-lg">💡 点击班级卡片可以展开/收起该班级的所有昆虫</p>
        </div>
      </div>
    </div>
  );
};

export default CardGallery;