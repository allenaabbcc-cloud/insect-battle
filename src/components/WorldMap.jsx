import React, { useState, useEffect } from 'react';
import insects from '../data/insects.json';

const WorldMap = ({ onBack, onSelectCard }) => {
  const [hoveredInsect, setHoveredInsect] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const getInsectColor = (type) => {
    switch (type) {
      case '毒': return { primary: '#FF4444', secondary: '#8B0000', glow: 'rgba(255, 68, 68, 0.6)' };
      case '水': return { primary: '#64D2FF', secondary: '#1E90FF', glow: 'rgba(100, 210, 255, 0.6)' };
      case '力量': return { primary: '#FFB84D', secondary: '#FF8C00', glow: 'rgba(255, 184, 77, 0.6)' };
      default: return { primary: '#FFB84D', secondary: '#FF8C00', glow: 'rgba(255, 184, 77, 0.6)' };
    }
  };

  const insectPositions = {
    1: { lat: -15, lng: -50, label: '巴西' },
    2: { lat: 50, lng: 10, label: '欧洲' },
    3: { lat: 30, lng: 45, label: '中东' },
    4: { lat: 40, lng: -100, label: '北美洲' },
    5: { lat: 35, lng: 120, label: '亚洲' },
    6: { lat: 32, lng: 118, label: '中国' },
    7: { lat: 48, lng: 2, label: '法国' },
    8: { lat: 39, lng: 116, label: '北京' },
    9: { lat: -5, lng: 20, label: '非洲' },
    10: { lat: 45, lng: 105, label: '蒙古' },
    11: { lat: 25, lng: 50, label: '中东沙漠' },
    12: { lat: 35, lng: 110, label: '亚洲各地' },
    13: { lat: 30, lng: 105, label: '亚洲沙地' },
    14: { lat: 38, lng: 114, label: '亚洲森林' },
    15: { lat: 32, lng: 118, label: '亚洲城市' }
  };

  const latLngTo3D = (lat, lng, radius = 1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  };

  const projectToScreen = (point, sphereRadius, offsetX, offsetY) => {
    const scale = sphereRadius * zoom;
    const perspective = 500;
    const scaleZ = perspective / (perspective + point.z * scale);
    
    return {
      x: offsetX + point.x * scale * scaleZ,
      y: offsetY + point.y * scale * scaleZ,
      scale: scaleZ,
      opacity: Math.max(0.3, Math.min(1, (point.z + 1) * 0.5))
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPosition.x;
    const deltaY = e.clientY - lastPosition.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.3)),
      y: prev.y + deltaX * 0.3
    }));
    
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom(prev => Math.max(0.8, Math.min(2, prev - e.deltaY * 0.001)));
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, lastPosition]);

  const sphereRadius = 150;
  const offsetX = 300;
  const offsetY = 280;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all"
          >
            ← 返回战斗
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-amber-800 drop-shadow-lg">
            🌍 昆虫世界地图 🌍
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setZoom(prev => Math.min(2, prev + 0.2))}
            className="w-12 h-12 bg-amber-200 hover:bg-amber-300 rounded-full flex items-center justify-center text-2xl shadow-md transition-all hover:scale-110"
          >
            +
          </button>
          <span className="text-amber-700 font-bold">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(prev => Math.max(0.8, prev - 0.2))}
            className="w-12 h-12 bg-amber-200 hover:bg-amber-300 rounded-full flex items-center justify-center text-2xl shadow-md transition-all hover:scale-110"
          >
            −
          </button>
        </div>

        <div 
          className="relative mx-auto rounded-full overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
          style={{ 
            width: '600px', 
            height: '560px',
            perspective: '1000px'
          }}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
          <div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            <img
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=realistic%20blue%20marble%20planet%20earth%20from%20space%20showing%20continents%20and%20oceans%20with%20atmosphere%20glow%20high%20resolution%20satellite%20view&image_size=square_hd"
              alt="Earth"
              className="w-full h-full object-cover"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformOrigin: 'center'
              }}
            />
            
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 40%, rgba(74, 144, 194, 0.2) 0%, transparent 50%)'
              }}
            />
          </div>

          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 600 560"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Insect markers */}
            {insects.map((insect) => {
              const pos = insectPositions[insect.id];
              if (!pos) return null;
              
              const point3D = latLngTo3D(pos.lat, pos.lng);
              const screenPos = projectToScreen(point3D, sphereRadius, offsetX, offsetY);
              const colors = getInsectColor(insect.type);

              return (
                <g 
                  key={insect.id}
                  transform={`translate(${screenPos.x}, ${screenPos.y}) scale(${screenPos.scale * zoom})`}
                  style={{ 
                    opacity: screenPos.opacity,
                    cursor: 'pointer',
                    pointerEvents: 'auto'
                  }}
                  onMouseEnter={() => setHoveredInsect(insect)}
                  onMouseLeave={() => setHoveredInsect(null)}
                  onClick={() => onSelectCard(insect)}
                >
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="28" 
                    fill={colors.secondary} 
                    filter="url(#glow)"
                    opacity="0.8"
                  />
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="22" 
                    fill={colors.primary} 
                  />
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="16" 
                    fill="white" 
                  />
                  <text 
                    x="0" 
                    y="7" 
                    textAnchor="middle" 
                    fontSize="14"
                  >
                    {insect.name === '巴西游走蛛' && '🕷️'}
                    {insect.name === '豆娘稚虫' && '🦗'}
                    {insect.name === '避日蛛' && '🦂'}
                    {insect.name === '黑雾寡妇蜘蛛' && '🕷️'}
                    {insect.name === '虎头蜂' && '🐝'}
                    {insect.name === '龙虱' && '🐌'}
                    {insect.name === '蜗牛' && '🐌'}
                    {insect.name === '仰泳蝽' && '🦟'}
                    {insect.name === '屎壳郎' && '🪲'}
                    {insect.name === '螽斯' && '🦗'}
                    {insect.name === '独裁巨蝎' && '🦂'}
                    {insect.name === '匆忙' && '🪰'}
                    {insect.name === '蚁狮' && '🐜'}
                    {insect.name === '黄蜂' && '🐝'}
                    {insect.name === '化蛛侠' && '🕷️'}
                  </text>
                  
                  {hoveredInsect?.id === insect.id && (
                    <g>
                      <rect 
                        x="-55" 
                        y="-50" 
                        width="110" 
                        height="65" 
                        rx="12" 
                        fill="rgba(0,0,0,0.9)" 
                        filter="url(#glow)"
                      />
                      <text 
                        x="0" 
                        y="-22" 
                        textAnchor="middle" 
                        fill="white" 
                        fontSize="11" 
                        fontWeight="bold"
                      >
                        {insect.name}
                      </text>
                      <text 
                        x="0" 
                        y="-7" 
                        textAnchor="middle" 
                        fill="#FFB84D" 
                        fontSize="10"
                      >
                        📍 {pos.label}
                      </text>
                      <text 
                        x="0" 
                        y="10" 
                        textAnchor="middle" 
                        fill="#64D2FF" 
                        fontSize="10"
                      >
                        ⚔️ ATK: {insect.atk}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-6 text-center text-amber-600">
          <p className="text-sm">💡 拖动地球旋转查看 | 使用滚轮或按钮缩放</p>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {insects.map((insect) => {
            const colors = getInsectColor(insect.type);
            const pos = insectPositions[insect.id];
            if (!pos) return null;
            
            return (
              <div
                key={insect.id}
                className="bg-white/80 backdrop-blur rounded-xl p-3 border-2 shadow-md transition-all hover:scale-105 cursor-pointer"
                style={{ borderColor: colors.primary }}
                onClick={() => onSelectCard(insect)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {insect.name === '巴西游走蛛' && '🕷️'}
                    {insect.name === '豆娘稚虫' && '🦗'}
                    {insect.name === '避日蛛' && '🦂'}
                    {insect.name === '黑雾寡妇蜘蛛' && '🕷️'}
                    {insect.name === '虎头蜂' && '🐝'}
                    {insect.name === '龙虱' && '🐌'}
                    {insect.name === '蜗牛' && '🐌'}
                    {insect.name === '仰泳蝽' && '🦟'}
                    {insect.name === '屎壳郎' && '🪰'}
                    {insect.name === '螽斯' && '🦗'}
                    {insect.name === '独裁巨蝎' && '🦂'}
                    {insect.name === '匆忙' && '🪰'}
                    {insect.name === '蚁狮' && '🐜'}
                    {insect.name === '黄蜂' && '🐝'}
                    {insect.name === '化蛛侠' && '🕷️'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-amber-800 font-bold text-sm truncate">{insect.name}</h3>
                    <p className="text-amber-600 text-xs truncate">📍 {pos.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-amber-700 text-lg">✨ 点击昆虫标记或卡片查看详情！</p>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;