import React, { useEffect, useRef, useState } from 'react';
import insects from '../data/insects.json';

const WorldMap = ({ onBack, onSelectCard }) => {
  const mapRef = useRef(null);
  const [hoveredInsect, setHoveredInsect] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const mapWidth = 800;
  const mapHeight = 500;

  // 简单的墨卡托投影
  const latLngToXY = (lat, lng) => {
    const x = (lng + 180) * (mapWidth / 360);
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = mapHeight / 2 - (mapWidth * mercN) / (2 * Math.PI);
    return { x, y };
  };

  useEffect(() => {
    let animationId;
    const animate = () => {
      if (!isDragging) {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + 0.1
        }));
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      setRotation(prev => ({
        x: prev.x + dy * 0.3,
        y: prev.y + dx * 0.3
      }));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getInsectColor = (type) => {
    switch (type) {
      case '毒': return { primary: '#FF4444', secondary: '#8B0000', glow: 'rgba(255, 68, 68, 0.5)' };
      case '水': return { primary: '#64D2FF', secondary: '#1E90FF', glow: 'rgba(100, 210, 255, 0.5)' };
      case '力量': return { primary: '#FFB84D', secondary: '#FF8C00', glow: 'rgba(255, 184, 77, 0.5)' };
      default: return { primary: '#FFB84D', secondary: '#FF8C00', glow: 'rgba(255, 184, 77, 0.5)' };
    }
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
            🌍 昆虫世界地图 🌍
          </h1>
          <div className="w-32 text-yellow-200 text-sm">
            {isDragging ? '🖱️ 拖动中...' : '✨ 可拖拽旋转'}
          </div>
        </div>

        <div 
          ref={mapRef}
          className="relative mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-500/50"
          style={{ width: mapWidth, height: mapHeight, cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 星星背景 */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  opacity: 0.3 + Math.random() * 0.7,
                  animation: `pulse ${1 + Math.random() * 3}s ease-in-out infinite`
                }}
              />
            ))}
          </div>

          {/* 地图网格 */}
          <svg width={mapWidth} height={mapHeight} className="absolute inset-0">
            <defs>
              <radialGradient id="earthGradient" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="50%" stopColor="#0f2744" />
                <stop offset="100%" stopColor="#050d18" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* 地球背景 */}
            <circle cx={mapWidth/2} cy={mapHeight/2} r={200} fill="url(#earthGradient)" />
            
            {/* 简化的世界地图 - 大陆轮廓 */}
            <g transform={`rotate(${rotation.y} ${mapWidth/2} ${mapHeight/2})`}>
              {/* 美洲 */}
              <path
                d="M 100 150 Q 80 180 100 250 Q 150 280 180 250 Q 200 200 180 150 Q 150 120 100 150 Z"
                fill="#2d5016"
                stroke="#4a7c23"
                strokeWidth="2"
              />
              
              {/* 欧洲/非洲 */}
              <path
                d="M 350 130 Q 380 120 420 150 Q 450 200 430 280 Q 380 320 340 280 Q 320 200 350 130 Z"
                fill="#3d6b1f"
                stroke="#5a8a2d"
                strokeWidth="2"
              />
              
              {/* 亚洲/澳洲 */}
              <path
                d="M 450 120 Q 550 100 650 150 Q 680 220 650 280 Q 580 310 500 270 Q 450 200 450 120 Z"
                fill="#4a7c23"
                stroke="#6b9a35"
                strokeWidth="2"
              />
              
              {/* 澳洲 */}
              <path
                d="M 600 350 Q 650 340 680 370 Q 670 410 620 420 Q 580 400 600 350 Z"
                fill="#5a8a2d"
                stroke="#7ba63f"
                strokeWidth="2"
              />
            </g>
          </svg>

          {/* 昆虫标记 */}
          {insects.map((insect) => {
            const pos = latLngToXY(insect.location.lat, insect.location.lng);
            const colors = getInsectColor(insect.type);
            
            return (
              <div
                key={insect.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125"
                style={{
                  left: pos.x,
                  top: pos.y,
                  zIndex: hoveredInsect?.id === insect.id ? 100 : 10,
                }}
                onMouseEnter={() => setHoveredInsect(insect)}
                onMouseLeave={() => setHoveredInsect(null)}
                onClick={() => onSelectCard(insect)}
              >
                {/* 发光效果 */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: colors.glow,
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />
                
                {/* 主要卡片 */}
                <div
                  className="relative w-16 h-20 rounded-lg border-3 shadow-xl overflow-hidden transform"
                  style={{
                    backgroundColor: colors.secondary,
                    borderColor: colors.primary,
                    boxShadow: `0 0 20px ${colors.glow}`
                  }}
                >
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                    {insect.type === '毒' ? '☠️' : insect.type === '水' ? '💧' : '💪'}
                  </div>
                  
                  <div className="flex items-center justify-center h-full text-2xl">
                    {insect.name === '巴西游走蛛' && '🕷️'}
                    {insect.name === '豆娘稚虫' && '🦗'}
                    {insect.name === '避日蛛' && '🦂'}
                  </div>
                  
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[10px] text-white font-bold text-center w-full px-1">
                    {insect.name.substring(0, 4)}
                  </div>
                </div>

                {/* 悬停卡片 */}
                {hoveredInsect?.id === insect.id && (
                  <div className="absolute top-[-180px] left-1/2 transform -translate-x-1/2 z-50">
                    <div
                      className="w-48 p-3 rounded-xl shadow-2xl border-3"
                      style={{
                        background: `linear-gradient(145deg, ${colors.secondary}, #1a1a2e)`,
                        borderColor: colors.primary
                      }}
                    >
                      <div className="text-center mb-2">
                        <span className="text-3xl">
                          {insect.name === '巴西游走蛛' && '🕷️'}
                          {insect.name === '豆娘稚虫' && '🦗'}
                          {insect.name === '避日蛛' && '🦂'}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-center mb-1">{insect.name}</h3>
                      <p className="text-gray-300 text-xs text-center mb-2">{insect.className}</p>
                      <div className="bg-black/30 rounded-lg p-2">
                        <p className="text-yellow-300 text-xs text-center">📍 {insect.location.label}</p>
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs text-gray-400">点击查看详情 →</span>
                      </div>
                    </div>
                    {/* 小三角 */}
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
                    <p className="text-yellow-400 text-xs">📍 {insect.location.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-yellow-200">
          <p className="text-lg">💡 拖拽地图可以旋转探索！点击标记查看昆虫详情！</p>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
