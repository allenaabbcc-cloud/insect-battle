import React, { useState } from 'react';
import insects from '../data/insects';

const MAP_ZONES = [
  { id: 'school', name: '昆虫学校', top: '18%', left: '15%', effect: '学习升级', icon: '🏫', color: 'purple' },
  { id: 'forest', name: '巨蛇森林', top: '35%', left: '60%', effect: '陆地昆虫栖息地', icon: '🌲', color: 'green' },
  { id: 'swamp', name: '巨龙沼泽', top: '75%', left: '25%', effect: '水生昆虫栖息地', icon: '🌊', color: 'blue' },
  { id: 'sky-island', name: '天空之岛', top: '75%', left: '75%', effect: '飞虫班栖息地', icon: '☁️', color: 'yellow' },
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

        <div className="relative w-full max-w-5xl mx-auto border-8 border-amber-700 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          
          <div className="relative w-full aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-amber-100 to-green-100"></div>

            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            <div className="absolute" style={{ top: '3%', left: '3%', width: '45%', height: '25%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-2xl border-3 border-amber-600 shadow-lg">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-3 py-1 rounded-full font-bold text-xs z-10">
                  🏫 学校建筑
                </div>
                
                <div className="absolute inset-2 flex flex-col">
                  <div className="flex-1 flex">
                    <div className="flex-1 bg-gradient-to-b from-red-300 to-red-400 border-2 border-red-600 m-0.5 rounded flex flex-col justify-center items-center">
                      <span className="text-xs font-bold text-red-900">5楼</span>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-b from-orange-300 to-orange-400 border-2 border-orange-600 m-0.5 rounded flex flex-col justify-center items-center">
                      <span className="text-xs font-bold text-orange-900">4楼</span>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-b from-yellow-300 to-yellow-400 border-2 border-yellow-600 m-0.5 rounded flex flex-col justify-center items-center">
                      <span className="text-xs font-bold text-yellow-900">3楼</span>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-b from-green-300 to-green-400 border-2 border-green-600 m-0.5 rounded flex flex-col justify-center items-center">
                      <span className="text-xs font-bold text-green-900">2楼</span>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 bg-gradient-to-b from-blue-300 to-blue-400 border-2 border-blue-600 m-0.5 rounded flex flex-col justify-center items-center">
                      <span className="text-xs font-bold text-blue-900">1楼</span>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-600 rounded-t"></div>
                
                <div className="absolute" style={{ top: '10%', left: '85%' }}>
                  <div className="text-lg animate-bounce">🛗</div>
                  <div className="text-xs text-purple-800 font-bold bg-white/80 rounded px-1">电梯</div>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ top: '5%', left: '50%', width: '47%', height: '40%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-green-200 via-emerald-300 to-green-400 rounded-3xl border-4 border-green-600 shadow-lg">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-1 rounded-full font-bold text-sm z-10">
                  🌲 巨蛇森林
                </div>
                
                <div className="absolute inset-3 overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-xl"
                      style={{
                        top: `${10 + Math.random() * 70}%`,
                        left: `${5 + Math.random() * 85}%`
                      }}
                    >
                      {['🌲', '🌳', '🌴', '🌿', '🍀', '🌱', '🌸', '🌺'][i % 8]}
                    </div>
                  ))}
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg width="80" height="80" viewBox="0 0 200 200">
                    <path
                      d="M100,20 Q150,50 140,100 Q130,150 100,180 Q70,150 60,100 Q50,50 100,20"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="30" r="10" fill="#059669" />
                    <circle cx="96" cy="28" r="2.5" fill="#FFD700" />
                    <circle cx="104" cy="28" r="2.5" fill="#FFD700" />
                  </svg>
                </div>

                <div className="absolute" style={{ top: '40%', left: '30%' }}>
                  <div className="bg-amber-100/80 rounded-xl p-2 border-2 border-amber-400">
                    <span className="text-xs font-bold text-amber-800">操场</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-300 rounded-full border-3 border-amber-600 mt-1"></div>
                </div>

                <div className="absolute" style={{ top: '20%', left: '60%' }}>
                  <div className="bg-pink-100/80 rounded-xl p-2 border-2 border-pink-400">
                    <span className="text-xs font-bold text-pink-800">食堂</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ top: '30%', left: '5%', width: '30%', height: '20%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl border-3 border-blue-400 shadow-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xs font-bold text-blue-800 mb-2">宿舍</div>
                  <div className="flex gap-1">
                    <div className="w-6 h-8 bg-orange-200 border-2 border-orange-400 rounded-t"></div>
                    <div className="w-6 h-8 bg-blue-200 border-2 border-blue-400 rounded-t"></div>
                    <div className="w-6 h-8 bg-green-200 border-2 border-green-400 rounded-t"></div>
                  </div>
                  <div className="mt-1">
                    <div className="text-xs text-blue-700">教室</div>
                    <div className="flex gap-1 mt-1">
                      <div className="w-5 h-4 bg-amber-200 border border-amber-400 rounded"></div>
                      <div className="w-5 h-4 bg-amber-200 border border-amber-400 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ top: '50%', left: '15%', width: '60%', height: '45%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-200 via-cyan-300 to-teal-400 rounded-[60px] border-4 border-cyan-600 shadow-lg">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-cyan-700 text-white px-4 py-1 rounded-full font-bold text-sm z-10">
                  🌊 巨龙沼泽
                </div>
                
                <div className="absolute inset-4 overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-lg"
                      style={{
                        top: `${10 + Math.random() * 70}%`,
                        left: `${5 + Math.random() * 85}%`,
                        animation: `float ${2 + i * 0.3}s ease-in-out infinite`
                      }}
                    >
                      {['🌿', '💧', '🐸', '🍃', '🐟', '🦆'][i % 6]}
                    </div>
                  ))}
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg width="70" height="70" viewBox="0 0 150 150">
                    <ellipse cx="75" cy="75" rx="45" ry="35" fill="none" stroke="#0891B2" strokeWidth="8" strokeLinecap="round" strokeDasharray="12 6" />
                    <path
                      d="M75,30 Q100,40 95,75 Q90,110 75,120 Q60,110 55,75 Q50,40 75,30"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="5"
                    />
                  </svg>
                </div>

                <div className="absolute" style={{ bottom: '15%', right: '25%' }}>
                  <div className="w-8 h-8 bg-amber-800 rounded-full border-3 border-amber-900 flex items-center justify-center">
                    <div className="w-5 h-5 bg-amber-700 rounded-full flex flex-col">
                      <div className="flex-1 bg-amber-600 rounded-t"></div>
                      <div className="flex-1 bg-amber-700 rounded-b"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ top: '50%', left: '65%', width: '32%', height: '45%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 rounded-[50%] border-4 border-orange-400 shadow-lg">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded-full font-bold text-xs z-10">
                  ☁️ 天空之岛
                </div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-orange-800 z-10">
                  (飞虫的家)
                </div>
                
                <div className="absolute inset-4 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-2xl opacity-80"
                      style={{
                        top: `${10 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 70}%`,
                        animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`
                      }}
                    >
                      ☁️
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <svg width="100" height="40" viewBox="0 0 180 60">
                    <ellipse cx="90" cy="30" rx="55" ry="15" fill="#78350F" />
                    <ellipse cx="90" cy="25" rx="50" ry="12" fill="#92400E" />
                    <ellipse cx="90" cy="20" rx="45" ry="10" fill="#B45309" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute" style={{ bottom: '2%', left: '2%', width: '18%', height: '45%' }}>
              <div className="relative w-full h-full bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 rounded-xl border-3 border-amber-600 shadow-lg">
                <div className="absolute inset-2 flex flex-col items-center justify-start">
                  <div className="text-lg mb-1">🏠</div>
                  <div className="text-xs font-bold text-amber-800 mb-2">您的家</div>
                  <div className="text-4xl mb-1">🗺️</div>
                  <div className="text-xs font-bold text-amber-700">所有地方</div>
                </div>
              </div>
            </div>

            {MAP_ZONES.map((zone) => (
              <button
                key={zone.id}
                className={`
                  absolute w-10 h-10 ${colorClasses[zone.color]} 
                  rounded-full animate-pulse border-3 border-white 
                  hover:scale-150 transition-transform cursor-pointer
                  flex items-center justify-center text-xl
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
              <p className="text-sm text-gray-600 mt-2">5层教学楼，教室和宿舍</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
              <div className="text-3xl mb-2">🌲</div>
              <h3 className="font-bold text-gray-800">巨蛇森林</h3>
              <p className="text-sm text-gray-600 mt-2">陆地昆虫的乐园，有操场和食堂</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4">
              <div className="text-3xl mb-2">🌊</div>
              <h3 className="font-bold text-gray-800">巨龙沼泽</h3>
              <p className="text-sm text-gray-600 mt-2">水生昆虫的栖息地</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4">
              <div className="text-3xl mb-2">☁️</div>
              <h3 className="font-bold text-gray-800">天空之岛</h3>
              <p className="text-sm text-gray-600 mt-2">飞虫班的家园，漂浮的岛</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorldMap;