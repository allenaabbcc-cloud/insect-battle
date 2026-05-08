import React, { useState } from 'react';

const CreationCenter = ({ onBack, customInsects, setCustomInsects }) => {
  const [newInsect, setNewInsect] = useState({
    name: '',
    className: '',
    features: '',
    ultimate: '',
    weakness: '',
    naturalEnemy: '',
    atk: 50,
    type: '力量',
    location: { lat: 50, lng: 50, label: '自定义' }
  });

  const [activeTab, setActiveTab] = useState('create');

  const handleInputChange = (field, value) => {
    setNewInsect(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateInsect = () => {
    if (!newInsect.name) return;
    
    const insect = {
      id: Date.now(),
      ...newInsect,
      createdAt: new Date().toLocaleDateString(),
      realImage: '',
      samImage: '',
      funFacts: [
        '这是Sam自己创造的昆虫！',
        '独一无二的超级英雄！',
        '拥有强大的特殊技能！'
      ],
      knowledge: {
        scientificName: newInsect.name,
        habitat: '神奇的地方',
        diet: '能量和勇气',
        lifecycle: '永远存在',
        description: '这是Sam创造的特别昆虫！'
      }
    };

    setCustomInsects(prev => [...prev, insect]);
    
    // 重置表单
    setNewInsect({
      name: '',
      className: '',
      features: '',
      ultimate: '',
      weakness: '',
      naturalEnemy: '',
      atk: 50,
      type: '力量',
      location: { lat: 50, lng: 50, label: '自定义' }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-4xl font-black text-yellow-400 drop-shadow-lg">
            🎨 Sam的创作中心 🎨
          </h1>
          <div className="w-32"></div>
        </div>

        {/* 标签页 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'create' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                : 'bg-black/40 text-gray-300 hover:bg-black/60'
            }`}
          >
            ✏️ 创造新昆虫
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'gallery' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                : 'bg-black/40 text-gray-300 hover:bg-black/60'
            }`}
          >
            📦 我的收藏 ({customInsects.length})
          </button>
        </div>

        {activeTab === 'create' && (
          <div className="bg-black/40 rounded-2xl p-8 border border-yellow-500/50">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">创造你的专属昆虫英雄！</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 基本信息 */}
              <div className="space-y-4">
                <div>
                  <label className="text-white font-bold block mb-2">🦗 昆虫名字</label>
                  <input
                    type="text"
                    value={newInsect.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300"
                    placeholder="给你的昆虫起个霸气的名字"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">🎖️ 班级称号</label>
                  <input
                    type="text"
                    value={newInsect.className}
                    onChange={(e) => handleInputChange('className', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300"
                    placeholder="如：闪电班、力量班、水属性班"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">⚡ 必杀技名字</label>
                  <input
                    type="text"
                    value={newInsect.ultimate}
                    onChange={(e) => handleInputChange('ultimate', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300"
                    placeholder="如：雷霆一击、毒液爆发"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">💪 攻击力 (0-100)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newInsect.atk}
                    onChange={(e) => handleInputChange('atk', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-yellow-400 font-bold text-xl mt-2">
                    {newInsect.atk}
                  </div>
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">🏷️ 属性</label>
                  <select
                    value={newInsect.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300"
                  >
                    <option value="毒">毒属性 ☠️</option>
                    <option value="水">水属性 💧</option>
                    <option value="力量">力量属性 💪</option>
                  </select>
                </div>
              </div>

              {/* 详细信息 */}
              <div className="space-y-4">
                <div>
                  <label className="text-white font-bold block mb-2">📋 特点描述</label>
                  <textarea
                    value={newInsect.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300 h-20"
                    placeholder="描述一下你的昆虫有什么特别之处"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">⚔️ 弱点</label>
                  <input
                    type="text"
                    value={newInsect.weakness}
                    onChange={(e) => handleInputChange('weakness', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300"
                    placeholder="你的昆虫有什么弱点？"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">🕸️ 天敌</label>
                  <input
                    type="text"
                    value={newInsect.naturalEnemy}
                    onChange={(e) => handleInputChange('naturalEnemy', e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-300"
                    placeholder="谁是它的天敌？"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleCreateInsect}
                disabled={!newInsect.name}
                className={`px-8 py-4 rounded-xl font-black text-xl shadow-lg transform hover:scale-105 transition-all ${
                  newInsect.name
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                🎉 创造昆虫！
              </button>
              {!newInsect.name && (
                <p className="text-gray-400 mt-2">请先给你的昆虫起个名字！</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {customInsects.length === 0 ? (
              <div className="bg-black/40 rounded-2xl p-12 border border-yellow-500/50 text-center">
                <div className="text-8xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">还没有创造的昆虫</h2>
                <p className="text-gray-300">去"创造新昆虫"标签页，创造你的第一个昆虫英雄吧！</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customInsects.map((insect) => {
                  const getTypeColors = (type) => {
                    switch (type) {
                      case '毒': return { primary: '#FF4444', secondary: '#8B0000' };
                      case '水': return { primary: '#64D2FF', secondary: '#1E90FF' };
                      case '力量': return { primary: '#FFB84D', secondary: '#FF8C00' };
                      default: return { primary: '#FFB84D', secondary: '#FF8C00' };
                    }
                  };
                  const colors = getTypeColors(insect.type);

                  return (
                    <div
                      key={insect.id}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-4 border-yellow-500 shadow-xl"
                    >
                      <div className="text-center mb-4">
                        <div className="text-5xl mb-2">🎨</div>
                        <h3 className="text-xl font-black text-yellow-400">{insect.name}</h3>
                        <p className="text-gray-300">{insect.className}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="bg-black/30 rounded-lg p-2">
                          <span className="text-gray-400">⚡ 必杀技：</span>
                          <span className="text-white font-bold">{insect.ultimate}</span>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2">
                          <span className="text-gray-400">💪 攻击力：</span>
                          <span className="text-white font-bold">{insect.atk}</span>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2">
                          <span className="text-gray-400">📋 特点：</span>
                          <span className="text-gray-200">{insect.features}</span>
                        </div>
                      </div>

                      <div className="mt-4 text-center text-gray-400 text-sm">
                        📅 创建于：{insect.createdAt}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-yellow-200">
          <p className="text-lg">💡 发挥你的想象力，创造最厉害的昆虫英雄！</p>
        </div>
      </div>
    </div>
  );
};

export default CreationCenter;
