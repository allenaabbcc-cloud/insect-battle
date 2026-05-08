import React from 'react';

const Card = ({ insect, onClick, isSelected, isEnemy, isSmall, isShowcase }) => {
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
      bg: 'linear-gradient(145deg, #05152a 0%, #103060 100%)',
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

  const colors = typeColors[insect.type] || typeColors['力量'];
  
  const getCardArt = () => {
    if (insect.name === '巴西游走蛛') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="spiderArtBg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#2a1020"/>
              <stop offset="100%" stopColor="#0d0308"/>
            </radialGradient>
            <filter id="spiderGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <rect fill="url(#spiderArtBg)" width="300" height="300"/>
          
          {[...Array(15)].map((_, i) => (
            <circle 
              key={i}
              cx={30 + (i * 19) % 240}
              cy={40 + (i * 17) % 220}
              r={2 + (i % 3)}
              fill={i % 2 === 0 ? '#7fff00' : '#ff4444'}
              opacity={0.4 + (i % 5) * 0.1}
            >
              <animate attributeName="cy" values={`${40 + (i * 17) % 220};${30 + (i * 17) % 220};${40 + (i * 17) % 220}`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          <g filter="url(#spiderGlow)">
            <ellipse cx="150" cy="170" rx="45" ry="55" fill="#4a1525"/>
            <ellipse cx="150" cy="125" rx="35" ry="38" fill="#6a2535"/>
            
            <circle cx="135" cy="110" r="8" fill="#ff0000"/>
            <circle cx="165" cy="110" r="8" fill="#ff0000"/>
            <circle cx="140" cy="98" r="5" fill="#ff6666"/>
            <circle cx="160" cy="98" r="5" fill="#ff6666"/>
            
            <path d="M140 130 L130 150 L148 140 Z" fill="#7a0010"/>
            <path d="M160 130 L170 150 L152 140 Z" fill="#7a0010"/>
          </g>
          
          <ellipse cx="148" cy="152" rx="4" ry="6" fill="#7fff00">
            <animate attributeName="ry" values="6;9;6" dur="2s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="152" cy="150" rx="3" ry="5" fill="#32cd32">
            <animate attributeName="ry" values="5;8;5" dur="1.7s" repeatCount="indefinite"/>
          </ellipse>
        </svg>
      );
    } else if (insect.name === '豆娘稚虫') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <linearGradient id="waterArtBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a2040"/>
              <stop offset="50%" stopColor="#104070"/>
              <stop offset="100%" stopColor="#052040"/>
            </linearGradient>
          </defs>
          
          <rect fill="url(#waterArtBg)" width="300" height="300"/>
          
          {[...Array(20)].map((_, i) => (
            <circle 
              key={i}
              cx={20 + (i * 15) % 260}
              cy={60 + (i * 13) % 200}
              r={1.5 + (i % 3)}
              fill={i % 3 === 0 ? '#80d0ff' : i % 3 === 1 ? '#60c0a0' : '#a0e0ff'}
              opacity={0.3 + (i % 4) * 0.15}
            >
              <animate attributeName="cy" values={`${60 + (i * 13) % 200};${40 + (i * 13) % 200};${60 + (i * 13) % 200}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          <g>
            <ellipse cx="150" cy="180" rx="38" ry="50" fill="#3a6a4a"/>
            <ellipse cx="150" cy="175" rx="32" ry="42" fill="#4a8a6a"/>
            <ellipse cx="150" cy="105" rx="30" ry="25" fill="#5a9a7a"/>
            
            <ellipse cx="150" cy="95" rx="20" ry="12" fill="#2a4a3a"/>
            <path d="M130 95 Q120 110 138 105" stroke="#1a3a2a" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M170 95 Q180 110 162 105" stroke="#1a3a2a" strokeWidth="5" fill="none" strokeLinecap="round"/>
            
            <ellipse cx="132" cy="98" rx="10" ry="8" fill="#1a3a2a"/>
            <ellipse cx="168" cy="98" rx="10" ry="8" fill="#1a3a2a"/>
            <circle cx="130" cy="96" r="3" fill="#6af0a0"/>
            <circle cx="170" cy="96" r="3" fill="#6af0a0"/>
          </g>
          
          <path d="M135 230 Q125 260 120 290" stroke="#2a5a4a" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M150 232 Q150 265 150 295" stroke="#4a8a6a" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M165 230 Q175 260 180 290" stroke="#2a5a4a" strokeWidth="8" fill="none" strokeLinecap="round"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="sunArtBg" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#5a3010"/>
              <stop offset="50%" stopColor="#3a1a05"/>
              <stop offset="100%" stopColor="#1a0802"/>
            </radialGradient>
          </defs>
          
          <rect fill="url(#sunArtBg)" width="300" height="300"/>
          
          {[...Array(25)].map((_, i) => (
            <ellipse 
              key={i}
              cx={15 + (i * 12) % 270}
              cy={160 + (i * 9) % 120}
              rx={3 + (i % 3)}
              ry={2 + (i % 2)}
              fill={i % 2 === 0 ? '#8a6040' : '#6a4525'}
              opacity="0.5"
            />
          ))}
          
          {[...Array(10)].map((_, i) => (
            <circle 
              key={i}
              cx={50 + (i * 22)}
              cy={40 + (i * 8) % 80}
              r={2 + (i % 3)}
              fill="#ff8800"
              opacity="0.3"
            >
              <animate attributeName="cy" values={`${40 + (i * 8) % 80};${20 + (i * 8) % 80};${40 + (i * 8) % 80}`} dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          <g>
            <ellipse cx="150" cy="155" rx="48" ry="42" fill="#8a5a30"/>
            <ellipse cx="150" cy="105" rx="40" ry="34" fill="#a47840"/>
            
            <path d="M108 95 Q85 75 92 105 Q108 98 115 92" fill="#5a3515" stroke="#3a2010" strokeWidth="2"/>
            <path d="M192 95 Q215 75 208 105 Q192 98 185 92" fill="#5a3515" stroke="#3a2010" strokeWidth="2"/>
            
            <path d="M82 88 L70 82" stroke="#4a2810" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M218 88 L230 82" stroke="#4a2810" strokeWidth="4" fill="none" strokeLinecap="round"/>
            
            <circle cx="130" cy="98" r="6" fill="#1a0802"/>
            <circle cx="170" cy="98" r="6" fill="#1a0802"/>
            <circle cx="140" cy="90" r="4" fill="#1a0802"/>
            <circle cx="160" cy="90" r="4" fill="#1a0802"/>
            <circle cx="128" cy="96" r="2" fill="#ffaa44" opacity="0.6"/>
            <circle cx="172" cy="96" r="2" fill="#ffaa44" opacity="0.6"/>
          </g>
        </svg>
      );
    }
  };

  const getUltimateAnimation = () => {
    if (insect.name === '巴西游走蛛') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">☠️</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: `${30 + Math.floor(i / 4) * 40}%`,
                  animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="text-3xl">💚</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (insect.name === '豆娘稚虫') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-pulse">🎭</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${30 + i * 10}%`,
                  top: '50%',
                  animation: `bounce ${0.8 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="text-2xl">💦</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-shake">🔥</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${25 + (i % 3) * 25}%`,
                  top: `${40 + Math.floor(i / 3) * 30}%`,
                  animation: `pulse ${0.6 + i * 0.1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.08}s`
                }}
              >
                <div className="text-2xl">⚔️</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const cardSize = isSmall ? 'w-52' : isShowcase ? 'w-80' : 'w-72';
  const cardScale = isSelected ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-102';

  return (
    <div 
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-300
        ${cardSize} ${cardScale}
      `}
    >
      <div 
        className={`
          relative rounded-xl overflow-hidden
          ${isEnemy ? 'rotate-2' : ''}
        `}
        style={{
          background: colors.bg,
          border: `4px solid ${colors.border}`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), ${colors.glow}`,
        }}
      >
        <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500 flex items-center justify-center z-10">
          <span className="text-xl font-black text-yellow-400">{insect.atk}</span>
        </div>
        
        <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 flex items-center justify-center z-10">
          <span className="text-xl">{colors.icon}</span>
        </div>
        
        <div className="pt-2 px-4 text-center">
          <h3 className="text-lg font-black text-white drop-shadow-lg" style={{textShadow: `2px 2px 4px ${colors.border}`}}>
            {insect.name}
          </h3>
          <div className="text-xs text-gray-300 font-medium">{insect.className}</div>
        </div>
        
        <div className="relative mx-2 my-2 rounded-lg overflow-hidden border-2 border-gray-700 aspect-square">
          {getCardArt()}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        <div className="px-3 pb-3 space-y-2">
          <div className="bg-black/40 rounded-lg p-2 border border-gray-700">
            <div className="text-xs text-gray-400 mb-1">⚡ 必杀技</div>
            <div className="text-sm font-bold" style={{color: colors.accent}}>
              {insect.ultimate}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-yellow-900/30 rounded-lg p-2 border border-yellow-700/50">
              <div className="text-xs text-gray-400">弱点</div>
              <div className="text-xs text-yellow-300">{insect.weakness}</div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-2 border border-purple-700/50">
              <div className="text-xs text-gray-400">天敌</div>
              <div className="text-xs text-purple-300">{insect.naturalEnemy}</div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default Card;
