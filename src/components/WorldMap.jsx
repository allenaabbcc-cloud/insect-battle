import React, { useState } from 'react';
import insects from '../data/insects';

const MAP_ZONES = [
  { id: 'school', name: '昆虫学校', top: '20%', left: '18%', effect: '学习升级', icon: '🏫', color: 'purple' },
  { id: 'forest', name: '巨蛇森林', top: '40%', left: '55%', effect: '陆地昆虫栖息地', icon: '🌲', color: 'green' },
  { id: 'swamp', name: '巨龙沼泽', top: '70%', left: '30%', effect: '水生昆虫栖息地', icon: '🌊', color: 'blue' },
  { id: 'sky-island', name: '天空之岛', top: '70%', left: '75%', effect: '飞虫班栖息地', icon: '☁️', color: 'yellow' },
];

const getZoneInsects = (zoneId) => {
  switch(zoneId) {
    case 'sky-island':
      return insects.filter(insect => 
        insect.className === '飞虫班' ||
        ['虎头蜂', '匆忙', '黄蜂'].includes(insect.name)
      );
    case 'swamp':
      return insects.filter(insect => 
        insect.className === '水虫班' ||
        ['豆娘稚虫', '龙虱', '仰泳蝽'].includes(insect.name)
      );
    case 'forest':
      return insects.filter(insect => 
        !['飞虫班', '水虫班'].includes(insect.className) &&
        !['虎头蜂', '匆忙', '黄蜂', '豆娘稚虫', '龙虱', '仰泳蝽'].includes(insect.name)
      );
    case 'school':
    default:
      return insects;
  }
};

const WorldMap = ({ onSelectZone, onSelectInsect }) => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  
  const colorClasses = {
    purple: 'bg-purple-500/80 border-purple-300',
    green: 'bg-green-500/80 border-green-300',
    blue: 'bg-blue-500/80 border-blue-300',
    yellow: 'bg-yellow-500/80 border-yellow-300'
  };
  
  const bgColors = {
    purple: 'from-purple-100 to-pink-100',
    green: 'from-green-100 to-emerald-100',
    blue: 'from-blue-100 to-cyan-100',
    yellow: 'from-yellow-100 to-orange-100'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onSelectZone(null)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-3xl font-black text-yellow-400 drop-shadow-lg">
            🗺️ Sam的昆虫宇宙地图 🌍
          </h1>
          <div className="w-32"></div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">
            📌 点击地图区域查看详细信息！
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {MAP_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  setSelectedZone(selectedZone?.id === zone.id ? null : zone);
                  onSelectZone && onSelectZone(zone);
                }}
                className={`
                  bg-gradient-to-r ${bgColors[zone.color]}
                  text-gray-800 font-bold py-3 px-6 rounded-xl
                  shadow-lg transform hover:scale-105 transition-all
                  border-4 ${selectedZone?.id === zone.id ? 'ring-4 ring-yellow-400' : ''}
                `}
              >
                <span className="text-2xl mr-2">{zone.icon}</span>
                {zone.name}
              </button>
            ))}
          </div>
        </div>

        {selectedZone && (
          <div className="mb-6 bg-black/40 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-3">
                <span className="text-3xl">{selectedZone.icon}</span>
                {selectedZone.name}
              </h2>
              <button
                onClick={() => setSelectedZone(null)}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
              >
                关闭
              </button>
            </div>
            <p className="text-gray-300 mb-4">{selectedZone.effect}</p>
            <h3 className="text-lg font-bold text-white mb-3">
              🐛 居住在此的昆虫 ({getZoneInsects(selectedZone.id).length}只):
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {getZoneInsects(selectedZone.id).map(insect => (
                <div
                  key={insect.id}
                  onClick={() => onSelectInsect && onSelectInsect(insect)}
                  className="bg-black/30 rounded-xl p-4 cursor-pointer hover:bg-black/50 transition-all hover:scale-105"
                >
                  <div className="text-4xl text-center mb-2">
                    {insect.className === '毒虫班' ? '🕷️' : 
                     insect.className === '水虫班' ? '🐛' : 
                     insect.className === '飞虫班' ? '🦋' :
                     insect.className === '甲虫班' ? '🪲' :
                     insect.className === '沙漠虫班' ? '🦂' :
                     insect.className === '软体班' ? '🐌' :
                     insect.className === '直翅目' ? '🦗' :
                     insect.className === '幼虫班' ? '🐛' : '🐝'}
                  </div>
                  <div className="text-white text-center font-bold">{insect.name}</div>
                  <div className="text-yellow-400 text-center text-sm">{insect.atk} ATK</div>
                  <div className="text-gray-400 text-center text-xs">{insect.className}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative w-full max-w-5xl mx-auto border-8 border-amber-600 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
          
          <div className="relative w-full aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-yellow-100 to-green-100"></div>

            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            <div className="absolute" style={{ top: '5%', left: '5%', width: '30%', height: '45%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 rounded-3xl border-4 border-purple-400 shadow-xl p-4">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full font-bold text-sm z-10">
                  🏫 昆虫学校
                </div>
                
                <div className="absolute top-12 left-4 right-4 h-20 bg-gradient-to-b from-red-400 to-red-600 rounded-lg border-2 border-red-700">
                  <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-xs text-center py-1">5楼</div>
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-500 text-xs text-center py-1">4楼</div>
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="bg-yellow-200 h-5 rounded"></div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute top-32 left-4 right-4 h-16 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg border-2 border-orange-700">
                  <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-xs text-center py-1">3楼</div>
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-500 text-xs text-center py-1">2楼</div>
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="bg-yellow-200 h-5 rounded"></div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute top-48 left-4 right-4 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg border-2 border-blue-700">
                  <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-xs text-center py-1">1楼</div>
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-yellow-200 h-5 rounded"></div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-500 w-6 h-10 rounded-t"></div>

                <div className="absolute" style={{ top: '45%', left: '75%' }}>
                  <div className="text-xl animate-bounce">🛗</div>
                  <div className="text-xs text-purple-800 font-bold bg-white/80 rounded px-1">电梯</div>
                </div>
                <div className="absolute" style={{ top: '35%', left: '20%' }}>
                  <div className="text-xl animate-bounce">🏠</div>
                  <div className="text-xs text-purple-800 font-bold bg-white/80 rounded px-1">宿舍</div>
                </div>
                <div className="absolute" style={{ top: '30%', left: '50%' }}>
                  <div className="text-xl animate-bounce">📚</div>
                  <div className="text-xs text-purple-800 font-bold bg-white/80 rounded px-1">校室</div>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ top: '15%', left: '35%', width: '55%', height: '40%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 rounded-3xl border-4 border-green-600 shadow-xl p-4">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full font-bold text-sm z-10">
                  🌲 巨蛇森林
                </div>
                
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        top: `${15 + Math.random() * 70}%`,
                        left: `${10 + Math.random() * 80}%`
                      }}
                    >
                      {['🌲', '🌳', '🌴', '🌿', '🍀', '🌱'][i % 6]}
                    </div>
                  ))}
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg width="120" height="120" viewBox="0 0 200 200">
                    <path
                      d="M100,20 Q150,50 140,100 Q130,150 100,180 Q70,150 60,100 Q50,50 100,20"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="30" r="12" fill="#059669" />
                    <circle cx="96" cy="27" r="3" fill="#FFD700" />
                    <circle cx="104" cy="27" r="3" fill="#FFD700" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ top: '55%', left: '5%', width: '40%', height: '40%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-300 via-cyan-400 to-teal-500 rounded-3xl border-4 border-cyan-600 shadow-xl p-4">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white px-4 py-1 rounded-full font-bold text-sm z-10">
                  🌊 巨龙沼泽
                </div>
                
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-xl opacity-60"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`
                      }}
                    >
                      {['🌿', '💧', '🐸', '🍃'][i % 4]}
                    </div>
                  ))}
                </div>

                <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="100" height="100" viewBox="0 0 150 150">
                  <ellipse cx="75" cy="75" rx="50" ry="40" fill="none" stroke="#0891B2" strokeWidth="10" strokeLinecap="round" strokeDasharray="15 8" />
                  <path
                    d="M75,30 Q105,40 100,75 Q95,110 75,120 Q55,110 50,75 Q45,40 75,30"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="6"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute" style={{ top: '55%', left: '50%', width: '45%', height: '40%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 rounded-3xl border-4 border-orange-400 shadow-xl p-4">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full font-bold text-sm z-10">
                  ☁️ 天空之岛
                </div>
                
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-3xl opacity-70"
                      style={{
                        top: `${10 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 75}%`
                      }}
                    >
                      ☁️
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <svg width="140" height="50" viewBox="0 0 180 60">
                    <ellipse cx="90" cy="30" rx="65" ry="18" fill="#92400E" />
                    <ellipse cx="90" cy="25" rx="60" ry="15" fill="#B45309" />
                    <ellipse cx="90" cy="20" rx="55" ry="12" fill="#D97706" />
                  </svg>
                </div>
              </div>
            </div>

            {MAP_ZONES.map((zone) => (
              <button
                key={zone.id}
                className={`
                  absolute w-12 h-12 ${colorClasses[zone.color]} 
                  rounded-full animate-pulse border-4 border-white 
                  hover:scale-150 transition-transform cursor-pointer
                  flex items-center justify-center text-2xl
                  shadow-lg z-20
                `}
                style={{ top: zone.top, left: zone.left }}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => {
                  setSelectedZone(selectedZone?.id === zone.id ? null : zone);
                  onSelectZone && onSelectZone(zone);
                }}
              >
                {zone.icon}
              </button>
            ))}

            {hoveredZone && (
              <div className="absolute top-4 right-4 bg-slate-900/95 p-4 rounded-xl border-2 border-cyan-500 backdrop-blur-md z-30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{hoveredZone.icon}</span>
                  <h3 className="text-cyan-400 font-bold text-xl">{hoveredZone.name}</h3>
                </div>
                <p className="text-white text-sm">{hoveredZone.effect}</p>
                <p className="text-gray-400 text-xs mt-2">
                  点击查看更多信息！
                </p>
              </div>
            )}

          </div>
        </div>

        <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">📖 昆虫宇宙地理指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
              <div className="text-3xl mb-2">🏫</div>
              <h3 className="font-bold text-gray-800">昆虫学校</h3>
              <p className="text-sm text-gray-600 mt-2">所有昆虫学习和成长的地方</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
              <div className="text-3xl mb-2">🌲</div>
              <h3 className="font-bold text-gray-800">巨蛇森林</h3>
              <p className="text-sm text-gray-600 mt-2">陆地昆虫的乐园，生机勃勃的大森林</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4">
              <div className="text-3xl mb-2">🌊</div>
              <h3 className="font-bold text-gray-800">巨龙沼泽</h3>
              <p className="text-sm text-gray-600 mt-2">水生昆虫的栖息地，水草丰美的沼泽地</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4">
              <div className="text-3xl mb-2">☁️</div>
              <h3 className="font-bold text-gray-800">天空之岛</h3>
              <p className="text-sm text-gray-600 mt-2">飞虫班的家园，漂浮在云端的神奇岛屿</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorldMap;