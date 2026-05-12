import React from 'react';

const Card = ({ insect, onClick, isSelected, isEnemy, isSmall, isShowcase, isCustom }) => {
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

  const customColors = {
    border: '#4CAF50',
    accent: '#8BC34A',
    bg: 'linear-gradient(145deg, #1a3a05 0%, #2a5a10 100%)',
    icon: '🎨',
    glow: '0 0 20px rgba(76, 175, 80, 0.4)'
  };

  const colors = isCustom ? customColors : (typeColors[insect.type] || typeColors['力量']);
  
  const getCardArt = () => {
    // 如果是自定义昆虫，显示可爱的通用角色
    if (isCustom) {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="customBg" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#E8F5E9"/>
              <stop offset="100%" stopColor="#C8E6C9"/>
            </radialGradient>
          </defs>
          <rect fill="url(#customBg)" width="300" height="300"/>
          
          {/* Sparkles around */}
          {[...Array(12)].map((_, i) => (
            <text 
              key={i}
              x={40 + Math.cos(i * 30 * Math.PI / 180) * 90}
              y={80 + Math.sin(i * 30 * Math.PI / 180) * 70}
              fontSize={12 + (i % 3) * 4}
              opacity={0.5}
            >✨</text>
          ))}
          
          {/* Cute custom character body */}
          <ellipse cx="150" cy="180" rx="60" ry="55" fill="#4CAF50"/>
          <ellipse cx="150" cy="175" rx="52" ry="48" fill="#66BB6A"/>
          
          {/* Head */}
          <ellipse cx="150" cy="115" rx="50" ry="45" fill="#81C784"/>
          
          {/* Super big cute eyes */}
          <ellipse cx="120" cy="110" rx="26" ry="30" fill="white"/>
          <ellipse cx="180" cy="110" rx="26" ry="30" fill="white"/>
          <circle cx="124" cy="118" r="14" fill="#1B5E20"/>
          <circle cx="184" cy="118" r="14" fill="#1B5E20"/>
          <circle cx="118" cy="108" r="6" fill="white"/>
          <circle cx="178" cy="108" r="6" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="98" cy="130" rx="16" ry="11" fill="#C8E6C9" opacity="0.8"/>
          <ellipse cx="202" cy="130" rx="16" ry="11" fill="#C8E6C9" opacity="0.8"/>
          
          {/* Big happy smile */}
          <path d="M132 142 Q150 162 168 142" stroke="#1B5E20" strokeWidth="4" fill="none" strokeLinecap="round"/>
          
          {/* Little antennae */}
          <ellipse cx="125" cy="65" rx="8" ry="25" fill="#81C784" transform="rotate(-20 125 65)"/>
          <ellipse cx="175" cy="65" rx="8" ry="25" fill="#81C784" transform="rotate(20 175 65)"/>
          <circle cx="118" cy="45" r="10" fill="#4CAF50"/>
          <circle cx="182" cy="45" r="10" fill="#4CAF50"/>
          
          {/* Cute little wings or arms */}
          <ellipse cx="90" cy="170" rx="25" ry="18" fill="#4CAF50" opacity="0.8" transform="rotate(-25 90 170)"/>
          <ellipse cx="210" cy="170" rx="25" ry="18" fill="#4CAF50" opacity="0.8" transform="rotate(25 210 170)"/>
          
          {/* Custom hero badge */}
          <text x="150" y="50" textAnchor="middle" fontSize="28">🎨</text>
          
          {/* Stars */}
          <text x="65" y="75" fontSize="18">⭐</text>
          <text x="220" y="80" fontSize="16">🌟</text>
        </svg>
      );
    }
    if (insect.name === '巴西游走蛛') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="spiderCuteBg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#FFE4E1"/>
              <stop offset="100%" stopColor="#FFB6C1"/>
            </radialGradient>
          </defs>
          <rect fill="url(#spiderCuteBg)" width="300" height="300"/>
          
          {/* Sparkles */}
          {[...Array(12)].map((_, i) => (
            <circle 
              key={i}
              cx={40 + (i * 20) % 220}
              cy={50 + (i * 15) % 200}
              r={2 + (i % 3)}
              fill={i % 2 === 0 ? '#FF69B4' : '#FFD700'}
              opacity={0.6}
            >
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.5 + i * 0.1}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          {/* Cute spider body */}
          <ellipse cx="150" cy="180" rx="50" ry="55" fill="#8B4513"/>
          <ellipse cx="150" cy="135" rx="40" ry="40" fill="#A0522D"/>
          
          {/* Big cute eyes */}
          <ellipse cx="130" cy="125" rx="20" ry="22" fill="white"/>
          <ellipse cx="170" cy="125" rx="20" ry="22" fill="white"/>
          <circle cx="132" cy="128" r="10" fill="#333"/>
          <circle cx="172" cy="128" r="10" fill="#333"/>
          <circle cx="128" cy="122" r="4" fill="white"/>
          <circle cx="168" cy="122" r="4" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="115" cy="145" rx="12" ry="8" fill="#FFB6C1" opacity="0.7"/>
          <ellipse cx="185" cy="145" rx="12" ry="8" fill="#FFB6C1" opacity="0.7"/>
          
          {/* Cute smile */}
          <path d="M135 155 Q150 170 165 155" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Little fangs (but cute) */}
          <ellipse cx="140" cy="160" rx="4" ry="6" fill="#FFE4E1"/>
          <ellipse cx="160" cy="160" rx="4" ry="6" fill="#FFE4E1"/>
          
          {/* Cute legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2, 3].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (55 + j * 5)}
                cy={150 + j * 15}
                rx="8"
                ry="25"
                fill="#A0522D"
                transform={`rotate(${side * (20 - j * 10)} ${150 + side * (55 + j * 5)} ${150 + j * 15})`}
              />
            ))
          ))}
          
          {/* Little heart */}
          <text x="150" y="80" textAnchor="middle" fontSize="24">❤️</text>
        </svg>
      );
    } else if (insect.name === '豆娘稚虫') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <linearGradient id="damselflyCuteBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0F7FA"/>
              <stop offset="100%" stopColor="#B2EBF2"/>
            </linearGradient>
          </defs>
          <rect fill="url(#damselflyCuteBg)" width="300" height="300"/>
          
          {/* Bubbles */}
          {[...Array(15)].map((_, i) => (
            <circle 
              key={i}
              cx={30 + (i * 18) % 240}
              cy={80 + (i * 14) % 180}
              r={4 + (i % 4)}
              fill="#81D4FA"
              opacity={0.5}
            >
              <animate attributeName="cy" values={`${80 + (i * 14) % 180};${30 + (i * 14) % 180}`} dur={`${2 + i * 0.2}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          {/* Cute body */}
          <ellipse cx="150" cy="185" rx="35" ry="50" fill="#4DB6AC"/>
          <ellipse cx="150" cy="180" rx="28" ry="40" fill="#80CBC4"/>
          
          {/* Head */}
          <ellipse cx="150" cy="120" rx="35" ry="30" fill="#80CBC4"/>
          
          {/* Big round eyes */}
          <ellipse cx="125" cy="115" rx="18" ry="20" fill="white"/>
          <ellipse cx="175" cy="115" rx="18" ry="20" fill="white"/>
          <circle cx="127" cy="118" r="9" fill="#00695C"/>
          <circle cx="177" cy="118" r="9" fill="#00695C"/>
          <circle cx="123" cy="112" r="4" fill="white"/>
          <circle cx="173" cy="112" r="4" fill="white"/>
          
          {/* Blush */}
          <ellipse cx="108" cy="130" rx="10" ry="7" fill="#FFCDD2" opacity="0.7"/>
          <ellipse cx="192" cy="130" rx="10" ry="7" fill="#FFCDD2" opacity="0.7"/>
          
          {/* Little smile */}
          <path d="M138 135 Q150 148 162 135" stroke="#004D40" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          
          {/* Cute mask (simplified) */}
          <ellipse cx="150" cy="150" rx="20" ry="12" fill="#26A69A"/>
          
          {/* Tail gills (cute version) */}
          <ellipse cx="135" cy="240" rx="12" ry="30" fill="#4DB6AC" opacity="0.8"/>
          <ellipse cx="150" cy="245" rx="10" ry="35" fill="#80CBC4"/>
          <ellipse cx="165" cy="240" rx="12" ry="30" fill="#4DB6AC" opacity="0.8"/>
          
          {/* Water droplet decorations */}
          <text x="80" y="70" fontSize="20">💧</text>
          <text x="200" y="60" fontSize="18">💦</text>
        </svg>
      );
    } else if (insect.name === '避日蛛') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="sunspiderCuteBg" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#FFF3E0"/>
              <stop offset="100%" stopColor="#FFE0B2"/>
            </radialGradient>
          </defs>
          <rect fill="url(#sunspiderCuteBg)" width="300" height="300"/>
          
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <ellipse 
              key={i}
              cx="150"
              cy="150"
              rx="15"
              ry="100"
              fill="#FFD54F"
              opacity="0.3"
              transform={`rotate(${i * 45} 150 150)`}
            />
          ))}
          
          {/* Cute body */}
          <ellipse cx="150" cy="170" rx="55" ry="50" fill="#8D6E63"/>
          <ellipse cx="150" cy="125" rx="45" ry="40" fill="#A1887F"/>
          
          {/* Big cute eyes */}
          <ellipse cx="125" cy="118" rx="20" ry="22" fill="white"/>
          <ellipse cx="175" cy="118" rx="20" ry="22" fill="white"/>
          <circle cx="127" cy="122" r="10" fill="#5D4037"/>
          <circle cx="177" cy="122" r="10" fill="#5D4037"/>
          <circle cx="123" cy="114" r="4" fill="white"/>
          <circle cx="173" cy="114" r="4" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="105" cy="135" rx="12" ry="8" fill="#FFAB91" opacity="0.8"/>
          <ellipse cx="195" cy="135" rx="12" ry="8" fill="#FFAB91" opacity="0.8"/>
          
          {/* Cute big jaws (but friendly looking) */}
          <ellipse cx="125" cy="155" rx="15" ry="20" fill="#6D4C41"/>
          <ellipse cx="175" cy="155" rx="15" ry="20" fill="#6D4C41"/>
          <ellipse cx="125" cy="155" rx="10" ry="15" fill="#8D6E63"/>
          <ellipse cx="175" cy="155" rx="10" ry="15" fill="#8D6E63"/>
          
          {/* Smile */}
          <path d="M135 165 Q150 178 165 165" stroke="#4E342E" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Cute legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2, 3].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (60 + j * 8)}
                cy={155 + j * 15}
                rx="10"
                ry="30"
                fill="#A1887F"
                transform={`rotate(${side * (25 - j * 8)} ${150 + side * (60 + j * 8)} ${155 + j * 15})`}
              />
            ))
          ))}
          
          {/* Little sun */}
          <text x="150" y="65" textAnchor="middle" fontSize="28">☀️</text>
        </svg>
      );
    } else if (insect.name === '黑雾寡妇蜘蛛') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="widowCuteBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#F3E5F5"/>
              <stop offset="100%" stopColor="#E1BEE7"/>
            </radialGradient>
          </defs>
          <rect fill="url(#widowCuteBg)" width="300" height="300"/>
          
          {/* Cute sparkles */}
          {[...Array(12)].map((_, i) => (
            <circle 
              key={i}
              cx={35 + (i * 22) % 230}
              cy={45 + (i * 18) % 210}
              r={2 + (i % 3)}
              fill={i % 2 === 0 ? '#E91E63' : '#9C27B0'}
              opacity={0.6}
            >
              <animate attributeName="r" values={`${2 + (i % 3)};${4 + (i % 3)};${2 + (i % 3)}`} dur={`${1 + i * 0.15}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          {/* Cute spider body - round and chubby */}
          <ellipse cx="150" cy="190" rx="60" ry="65" fill="#424242"/>
          <ellipse cx="150" cy="135" rx="45" ry="45" fill="#616161"/>
          
          {/* Red hourglass (but cute heart shaped!) */}
          <path d="M135 185 Q150 200 165 185 Q150 210 135 185" fill="#F44336"/>
          <circle cx="150" cy="190" r="8" fill="#F44336"/>
          
          {/* Super big cute eyes */}
          <ellipse cx="128" cy="128" rx="22" ry="25" fill="white"/>
          <ellipse cx="172" cy="128" rx="22" ry="25" fill="white"/>
          <circle cx="130" cy="133" r="12" fill="#212121"/>
          <circle cx="174" cy="133" r="12" fill="#212121"/>
          <circle cx="125" cy="125" r="5" fill="white"/>
          <circle cx="169" cy="125" r="5" fill="white"/>
          
          {/* Blush */}
          <ellipse cx="105" cy="145" rx="14" ry="10" fill="#F8BBD9" opacity="0.8"/>
          <ellipse cx="195" cy="145" rx="14" ry="10" fill="#F8BBD9" opacity="0.8"/>
          
          {/* Cute little smile */}
          <path d="M135 152 Q150 168 165 152" stroke="#424242" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Cute legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2, 3].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (62 + j * 6)}
                cy={155 + j * 16}
                rx="10"
                ry="35"
                fill="#616161"
                transform={`rotate(${side * (22 - j * 7)} ${150 + side * (62 + j * 6)} ${155 + j * 16})`}
              />
            ))
          ))}
          
          {/* Cute hearts */}
          <text x="80" y="70" fontSize="22">💕</text>
          <text x="200" y="65" fontSize="20">💖</text>
        </svg>
      );
    } else if (insect.name === '虎头蜂') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="hornetCuteBg" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#FFFDE7"/>
              <stop offset="100%" stopColor="#FFF9C4"/>
            </radialGradient>
          </defs>
          <rect fill="url(#hornetCuteBg)" width="300" height="300"/>
          
          {/* Little stars */}
          {[...Array(10)].map((_, i) => (
            <text 
              key={i}
              x={40 + (i * 24) % 220}
              y={60 + (i * 20) % 180}
              fontSize={12 + (i % 3) * 4}
              opacity={0.6}
            >✨</text>
          ))}
          
          {/* Cute chubby body */}
          <ellipse cx="150" cy="180" rx="50" ry="55" fill="#FFEB3B"/>
          <rect x="105" y="150" width="90" height="20" fill="#424242" rx="10"/>
          <rect x="100" y="190" width="100" height="20" fill="#424242" rx="10"/>
          
          {/* Cute round head */}
          <ellipse cx="150" cy="115" rx="48" ry="42" fill="#FFEB3B"/>
          
          {/* Big adorable eyes */}
          <ellipse cx="125" cy="110" rx="22" ry="25" fill="white"/>
          <ellipse cx="175" cy="110" rx="22" ry="25" fill="white"/>
          <circle cx="127" cy="115" r="12" fill="#33691E"/>
          <circle cx="177" cy="115" r="12" fill="#33691E"/>
          <circle cx="122" cy="107" r="5" fill="white"/>
          <circle cx="172" cy="107" r="5" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="102" cy="128" rx="14" ry="10" fill="#FFCDD2" opacity="0.8"/>
          <ellipse cx="198" cy="128" rx="14" ry="10" fill="#FFCDD2" opacity="0.8"/>
          
          {/* Cute little antennae */}
          <ellipse cx="120" cy="75" rx="6" ry="20" fill="#FDD835" transform="rotate(-20 120 75)"/>
          <ellipse cx="180" cy="75" rx="6" ry="20" fill="#FDD835" transform="rotate(20 180 75)"/>
          <circle cx="115" cy="60" r="8" fill="#F44336"/>
          <circle cx="185" cy="60" r="8" fill="#F44336"/>
          
          {/* Happy smile */}
          <path d="M135 132 Q150 148 165 132" stroke="#F57F17" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          
          {/* Cute little wings */}
          <ellipse cx="95" cy="145" rx="30" ry="20" fill="#B3E5FC" opacity="0.7" transform="rotate(-25 95 145)"/>
          <ellipse cx="205" cy="145" rx="30" ry="20" fill="#B3E5FC" opacity="0.7" transform="rotate(25 205 145)"/>
          
          {/* Cute stinger (but harmless looking) */}
          <ellipse cx="150" cy="245" rx="12" ry="20" fill="#FFEB3B"/>
          <path d="M145 255 L150 275 L155 255" fill="#FF9800"/>
          
          {/* Sun decoration */}
          <text x="150" y="55" textAnchor="middle" fontSize="26">🌻</text>
        </svg>
      );
    } else if (insect.name === '龙虱') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="divingCuteBg" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stopColor="#E1F5FE"/>
              <stop offset="100%" stopColor="#B3E5FC"/>
            </radialGradient>
          </defs>
          <rect fill="url(#divingCuteBg)" width="300" height="300"/>
          
          {/* Water bubbles */}
          {[...Array(18)].map((_, i) => (
            <circle 
              key={i}
              cx={25 + (i * 16) % 250}
              cy={70 + (i * 13) % 180}
              r={3 + (i % 4)}
              fill={i % 2 === 0 ? '#4FC3F7' : '#81D4FA'}
              opacity={0.5}
            >
              <animate attributeName="cy" values={`${70 + (i * 13) % 180};${20 + (i * 13) % 180}`} dur={`${1.8 + i * 0.15}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          {/* Cute oval beetle body */}
          <ellipse cx="150" cy="165" rx="65" ry="55" fill="#1565C0"/>
          <ellipse cx="150" cy="160" rx="55" ry="45" fill="#1976D2"/>
          
          {/* Cute shell shine */}
          <ellipse cx="130" cy="145" rx="20" ry="12" fill="#64B5F6" opacity="0.5"/>
          
          {/* Head */}
          <ellipse cx="150" cy="105" rx="40" ry="35" fill="#1976D2"/>
          
          {/* Big round eyes */}
          <ellipse cx="128" cy="100" rx="18" ry="20" fill="white"/>
          <ellipse cx="172" cy="100" rx="18" ry="20" fill="white"/>
          <circle cx="130" cy="103" r="10" fill="#0D47A1"/>
          <circle cx="174" cy="103" r="10" fill="#0D47A1"/>
          <circle cx="125" cy="97" r="4" fill="white"/>
          <circle cx="169" cy="97" r="4" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="110" cy="118" rx="12" ry="8" fill="#BBDEFB" opacity="0.8"/>
          <ellipse cx="190" cy="118" rx="12" ry="8" fill="#BBDEFB" opacity="0.8"/>
          
          {/* Cute little smile */}
          <path d="M138 118 Q150 130 162 118" stroke="#0D47A1" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Little antennae */}
          <path d="M130 80 Q125 65 120 55" stroke="#1565C0" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M170 80 Q175 65 180 55" stroke="#1565C0" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="120" cy="55" r="6" fill="#42A5F5"/>
          <circle cx="180" cy="55" r="6" fill="#42A5F5"/>
          
          {/* Cute swimming legs */}
          <ellipse cx="100" cy="200" rx="18" ry="12" fill="#1976D2" transform="rotate(-30 100 200)"/>
          <ellipse cx="200" cy="200" rx="18" ry="12" fill="#1976D2" transform="rotate(30 200 200)"/>
          <ellipse cx="115" cy="215" rx="15" ry="10" fill="#42A5F5" transform="rotate(-20 115 215)"/>
          <ellipse cx="185" cy="215" rx="15" ry="10" fill="#42A5F5" transform="rotate(20 185 215)"/>
          
          {/* Water decorations */}
          <text x="70" y="60" fontSize="20">🌊</text>
          <text x="210" y="55" fontSize="22">🐟</text>
        </svg>
      );
    } else if (insect.name === '蜗牛') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="snailCuteBg" cx="40%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#F1F8E9"/>
              <stop offset="100%" stopColor="#DCEDC8"/>
            </radialGradient>
          </defs>
          <rect fill="url(#snailCuteBg)" width="300" height="300"/>
          
          {/* Little flowers/leaves */}
          {[...Array(8)].map((_, i) => (
            <text 
              key={i}
              x={30 + (i * 30) % 240}
              y={70 + (i * 25) % 180}
              fontSize={14 + (i % 3) * 4}
              opacity={0.5}
            >🌿</text>
          ))}
          
          {/* Cute spiral shell */}
          <ellipse cx="175" cy="155" rx="70" ry="65" fill="#8D6E63"/>
          <ellipse cx="170" cy="150" rx="55" ry="50" fill="#A1887F"/>
          <ellipse cx="165" cy="145" rx="40" ry="35" fill="#BCAAA4"/>
          <ellipse cx="160" cy="140" rx="25" ry="20" fill="#D7CCC8"/>
          
          {/* Shell spiral decoration */}
          <path d="M135 130 Q155 120 170 135 Q180 150 165 160 Q150 165 140 155" 
                stroke="#6D4C41" strokeWidth="4" fill="none" strokeLinecap="round"/>
          
          {/* Cute snail body */}
          <ellipse cx="95" cy="200" rx="55" ry="35" fill="#FFECB3"/>
          <ellipse cx="95" cy="195" rx="45" ry="28" fill="#FFF8E1"/>
          
          {/* Head with tentacles */}
          <ellipse cx="65" cy="180" rx="35" ry="30" fill="#FFF8E1"/>
          
          {/* Super cute eyes on stalks */}
          <ellipse cx="50" cy="135" rx="8" ry="25" fill="#FFECB3"/>
          <ellipse cx="80" cy="135" rx="8" ry="25" fill="#FFECB3"/>
          <ellipse cx="50" cy="115" rx="16" ry="18" fill="white"/>
          <ellipse cx="80" cy="115" rx="16" ry="18" fill="white"/>
          <circle cx="52" cy="118" r="9" fill="#5D4037"/>
          <circle cx="82" cy="118" r="9" fill="#5D4037"/>
          <circle cx="48" cy="112" r="4" fill="white"/>
          <circle cx="78" cy="112" r="4" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="45" cy="190" rx="12" ry="8" fill="#FFCCBC" opacity="0.8"/>
          <ellipse cx="85" cy="190" rx="12" ry="8" fill="#FFCCBC" opacity="0.8"/>
          
          {/* Adorable smile */}
          <path d="M52 198 Q65 210 78 198" stroke="#4E342E" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Little tentacles (lower) */}
          <ellipse cx="45" cy="210" rx="6" ry="15" fill="#FFECB3" transform="rotate(-15 45 210)"/>
          <ellipse cx="85" cy="210" rx="6" ry="15" fill="#FFECB3" transform="rotate(15 85 210)"/>
          
          {/* Slime trail (cute sparkly version) */}
          {[...Array(5)].map((_, i) => (
            <ellipse 
              key={i}
              cx={40 + i * 20}
              cy={240 + (i % 2) * 5}
              rx={10 - i}
              ry={5}
              fill="#E0E0E0"
              opacity={0.5 - i * 0.08}
            />
          ))}
          
          {/* Cute mushroom/leaf */}
          <text x="210" y="70" fontSize="24">🍄</text>
        </svg>
      );
    } else if (insect.name === '仰泳蝽') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <linearGradient id="backswimmerCuteBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E3F2FD"/>
              <stop offset="100%" stopColor="#BBDEFB"/>
            </linearGradient>
          </defs>
          <rect fill="url(#backswimmerCuteBg)" width="300" height="300"/>
          
          {/* Water ripples */}
          {[...Array(10)].map((_, i) => (
            <ellipse 
              key={i}
              cx="150"
              cy={60 + i * 20}
              rx={30 + i * 15}
              ry={8}
              fill="none"
              stroke="#64B5F6"
              strokeWidth="2"
              opacity={0.4 - i * 0.03}
            />
          ))}
          
          {/* Bubbles */}
          {[...Array(12)].map((_, i) => (
            <circle 
              key={i}
              cx={40 + (i * 20) % 220}
              cy={100 + (i * 15) % 150}
              r={4 + (i % 3)}
              fill="#90CAF9"
              opacity={0.6}
            >
              <animate attributeName="cy" values={`${100 + (i * 15) % 150};${50 + (i * 15) % 150}`} dur={`${2 + i * 0.15}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          {/* Cute backswimmer body (upside down!) */}
          <ellipse cx="150" cy="160" rx="55" ry="45" fill="#42A5F5"/>
          <ellipse cx="150" cy="155" rx="48" ry="38" fill="#64B5F6"/>
          
          {/* Belly (lighter color) */}
          <ellipse cx="150" cy="150" rx="35" ry="25" fill="#BBDEFB"/>
          
          {/* Head */}
          <ellipse cx="150" cy="100" rx="40" ry="35" fill="#64B5F6"/>
          
          {/* Big cute eyes */}
          <ellipse cx="125" cy="95" rx="20" ry="22" fill="white"/>
          <ellipse cx="175" cy="95" rx="20" ry="22" fill="white"/>
          <circle cx="127" cy="100" r="11" fill="#1565C0"/>
          <circle cx="177" cy="100" r="11" fill="#1565C0"/>
          <circle cx="122" cy="93" r="5" fill="white"/>
          <circle cx="172" cy="93" r="5" fill="white"/>
          
          {/* Blush */}
          <ellipse cx="105" cy="115" rx="14" ry="9" fill="#E3F2FD" opacity="0.8"/>
          <ellipse cx="195" cy="115" rx="14" ry="9" fill="#E3F2FD" opacity="0.8"/>
          
          {/* Smile */}
          <path d="M135 118 Q150 132 165 118" stroke="#0D47A1" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Cute swimming oar legs (big!) */}
          <ellipse cx="90" cy="155" rx="25" ry="15" fill="#42A5F5" transform="rotate(-40 90 155)"/>
          <ellipse cx="210" cy="155" rx="25" ry="15" fill="#42A5F5" transform="rotate(40 210 155)"/>
          <ellipse cx="95" cy="175" rx="20" ry="12" fill="#64B5F6" transform="rotate(-30 95 175)"/>
          <ellipse cx="205" cy="175" rx="20" ry="12" fill="#64B5F6" transform="rotate(30 205 175)"/>
          
          {/* Little antennae */}
          <path d="M135 70 Q130 55 125 45" stroke="#1976D2" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M165 70 Q170 55 175 45" stroke="#1976D2" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="125" cy="45" r="6" fill="#90CAF9"/>
          <circle cx="175" cy="45" r="6" fill="#90CAF9"/>
          
          {/* Swimming decoration */}
          <text x="70" y="60" fontSize="22">🏊</text>
          <text x="210" y="55" fontSize="20">💦</text>
        </svg>
      );
    } else if (insect.name === '屎壳郎') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="dungCuteBg" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#EFEBE9"/>
              <stop offset="100%" stopColor="#D7CCC8"/>
            </radialGradient>
          </defs>
          <rect fill="url(#dungCuteBg)" width="300" height="300"/>
          
          {/* Sparkles around the ball */}
          {[...Array(10)].map((_, i) => (
            <text 
              key={i}
              x={50 + Math.cos(i * 36 * Math.PI / 180) * 80}
              y={180 + Math.sin(i * 36 * Math.PI / 180) * 60}
              fontSize={12 + (i % 3) * 3}
              opacity={0.6}
            >✨</text>
          ))}
          
          {/* Cute dung ball (shiny and round!) */}
          <circle cx="150" cy="200" r="55" fill="#8D6E63"/>
          <circle cx="150" cy="200" r="45" fill="#A1887F"/>
          <circle cx="135" cy="185" r="20" fill="#BCAAA4" opacity="0.7"/>
          <circle cx="125" cy="175" r="8" fill="#EFEBE9" opacity="0.6"/>
          
          {/* Cute beetle on top */}
          <ellipse cx="150" cy="125" rx="50" ry="45" fill="#5D4037"/>
          <ellipse cx="150" cy="120" rx="42" ry="38" fill="#795548"/>
          
          {/* Shell shine */}
          <ellipse cx="135" cy="108" rx="18" ry="10" fill="#A1887F" opacity="0.6"/>
          
          {/* Head */}
          <ellipse cx="150" cy="75" rx="35" ry="30" fill="#795548"/>
          
          {/* Big cute eyes */}
          <ellipse cx="128" cy="70" rx="16" ry="18" fill="white"/>
          <ellipse cx="172" cy="70" rx="16" ry="18" fill="white"/>
          <circle cx="130" cy="74" r="9" fill="#3E2723"/>
          <circle cx="174" cy="74" r="9" fill="#3E2723"/>
          <circle cx="125" cy="68" r="4" fill="white"/>
          <circle cx="169" cy="68" r="4" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="110" cy="85" rx="12" ry="8" fill="#FFCCBC" opacity="0.8"/>
          <ellipse cx="190" cy="85" rx="12" ry="8" fill="#FFCCBC" opacity="0.8"/>
          
          {/* Big happy smile */}
          <path d="M135 90 Q150 105 165 90" stroke="#4E342E" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          
          {/* Cute little horns */}
          <ellipse cx="135" cy="48" rx="10" ry="18" fill="#6D4C41" transform="rotate(-15 135 48)"/>
          <ellipse cx="165" cy="48" rx="10" ry="18" fill="#6D4C41" transform="rotate(15 165 48)"/>
          <ellipse cx="150" cy="42" rx="12" ry="15" fill="#8D6E63"/>
          
          {/* Strong little arms pushing the ball */}
          <ellipse cx="110" cy="160" rx="15" ry="25" fill="#795548" transform="rotate(-25 110 160)"/>
          <ellipse cx="190" cy="160" rx="15" ry="25" fill="#795548" transform="rotate(25 190 160)"/>
          
          {/* Cute decoration */}
          <text x="150" y="45" textAnchor="middle" fontSize="22">💪</text>
          <text x="70" y="70" fontSize="18">🌟</text>
        </svg>
      );
    } else if (insect.name === '螽斯') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="katydidCuteBg" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#E8F5E9"/>
              <stop offset="100%" stopColor="#C8E6C9"/>
            </radialGradient>
          </defs>
          <rect fill="url(#katydidCuteBg)" width="300" height="300"/>
          
          {/* Musical notes */}
          {[...Array(8)].map((_, i) => (
            <text 
              key={i}
              x={50 + (i * 28) % 200}
              y={60 + (i * 22) % 160}
              fontSize={18 + (i % 3) * 4}
              opacity={0.6}
            >🎵</text>
          ))}
          
          {/* Cute katydid body */}
          <ellipse cx="150" cy="175" rx="45" ry="60" fill="#66BB6A"/>
          <ellipse cx="150" cy="170" rx="38" ry="52" fill="#81C784"/>
          
          {/* Leaf-like wings */}
          <ellipse cx="110" cy="160" rx="35" ry="55" fill="#4CAF50" opacity="0.8" transform="rotate(-15 110 160)"/>
          <ellipse cx="190" cy="160" rx="35" ry="55" fill="#4CAF50" opacity="0.8" transform="rotate(15 190 160)"/>
          
          {/* Leaf veins */}
          <path d="M110 130 L110 190" stroke="#388E3C" strokeWidth="2" opacity="0.5"/>
          <path d="M190 130 L190 190" stroke="#388E3C" strokeWidth="2" opacity="0.5"/>
          
          {/* Cute round head */}
          <ellipse cx="150" cy="105" rx="42" ry="38" fill="#81C784"/>
          
          {/* Extra large cute eyes */}
          <ellipse cx="125" cy="100" rx="22" ry="25" fill="white"/>
          <ellipse cx="175" cy="100" rx="22" ry="25" fill="white"/>
          <circle cx="127" cy="105" r="12" fill="#1B5E20"/>
          <circle cx="177" cy="105" r="12" fill="#1B5E20"/>
          <circle cx="122" cy="97" r="5" fill="white"/>
          <circle cx="172" cy="97" r="5" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="102" cy="120" rx="14" ry="10" fill="#C8E6C9" opacity="0.8"/>
          <ellipse cx="198" cy="120" rx="14" ry="10" fill="#C8E6C9" opacity="0.8"/>
          
          {/* Happy singing smile */}
          <ellipse cx="150" cy="128" rx="15" ry="10" fill="#A5D6A7"/>
          <path d="M138 125 Q150 138 162 125" stroke="#1B5E20" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Long cute antennae */}
          <path d="M130 75 Q110 45 95 25" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M170 75 Q190 45 205 25" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle cx="95" cy="25" r="8" fill="#81C784"/>
          <circle cx="205" cy="25" r="8" fill="#81C784"/>
          
          {/* Big strong hind legs (cute version) */}
          <ellipse cx="105" cy="220" rx="20" ry="40" fill="#66BB6A" transform="rotate(-20 105 220)"/>
          <ellipse cx="195" cy="220" rx="20" ry="40" fill="#66BB6A" transform="rotate(20 195 220)"/>
          
          {/* Music decoration */}
          <text x="150" y="50" textAnchor="middle" fontSize="26">🎤</text>
        </svg>
      );
    } else if (insect.name === '独裁巨蝎') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="scorpionCuteBg" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#FFF3E0"/>
              <stop offset="100%" stopColor="#FFE0B2"/>
            </radialGradient>
          </defs>
          <rect fill="url(#scorpionCuteBg)" width="300" height="300"/>
          
          {/* Desert sand patterns */}
          {[...Array(12)].map((_, i) => (
            <ellipse 
              key={i}
              cx={30 + (i * 22) % 240}
              cy={230 + (i % 3) * 10}
              rx={20 + (i % 4) * 10}
              ry={5}
              fill="#D7CCC8"
              opacity={0.5}
            />
          ))}
          
          {/* Cute scorpion body */}
          <ellipse cx="150" cy="170" rx="55" ry="45" fill="#424242"/>
          <ellipse cx="150" cy="165" rx="48" ry="38" fill="#616161"/>
          
          {/* Body segments */}
          <rect x="115" y="150" width="25" height="35" fill="#424242" rx="5"/>
          <rect x="145" y="150" width="25" height="35" fill="#424242" rx="5"/>
          
          {/* Big cute claws */}
          <ellipse cx="90" cy="160" rx="35" ry="20" fill="#616161" transform="rotate(-30 90 160)"/>
          <ellipse cx="210" cy="160" rx="35" ry="20" fill="#616161" transform="rotate(30 210 160)"/>
          <ellipse cx="75" cy="155" rx="20" ry="12" fill="#757575" transform="rotate(-35 75 155)"/>
          <ellipse cx="225" cy="155" rx="20" ry="12" fill="#757575" transform="rotate(35 225 155)"/>
          
          {/* Head */}
          <ellipse cx="150" cy="120" rx="40" ry="35" fill="#616161"/>
          
          {/* Super big cute eyes */}
          <ellipse cx="125" cy="115" rx="20" ry="22" fill="white"/>
          <ellipse cx="175" cy="115" rx="20" ry="22" fill="white"/>
          <circle cx="127" cy="120" r="11" fill="#212121"/>
          <circle cx="177" cy="120" r="11" fill="#212121"/>
          <circle cx="122" cy="112" r="5" fill="white"/>
          <circle cx="172" cy="112" r="5" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="105" cy="135" rx="12" ry="8" fill="#FFAB91" opacity="0.8"/>
          <ellipse cx="195" cy="135" rx="12" ry="8" fill="#FFAB91" opacity="0.8"/>
          
          {/* Confident smile */}
          <path d="M135 140 Q150 155 165 140" stroke="#424242" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          
          {/* Curled tail with stinger */}
          <path d="M150 205 Q170 220 190 200 Q210 175 195 155" stroke="#424242" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M195 150 L210 135" stroke="#FF5252" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <circle cx="210" cy="135" r="6" fill="#FF1744"/>
          
          {/* Little legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (50 + j * 15)}
                cy={185 + j * 12}
                rx="8"
                ry="20"
                fill="#616161"
                transform={`rotate(${side * (15 - j * 5)} ${150 + side * (50 + j * 15)} ${185 + j * 12})`}
              />
            ))
          ))}
          
          {/* Cute crown decoration */}
          <text x="150" y="75" textAnchor="middle" fontSize="24">👑</text>
          
          {/* Sparkles */}
          <text x="60" y="80" fontSize="18">✨</text>
          <text x="220" y="90" fontSize="16">🌟</text>
        </svg>
      );
    } else if (insect.name === '匆忙') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="hurryBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#E3F2FD"/>
              <stop offset="100%" stopColor="#90CAF9"/>
            </radialGradient>
          </defs>
          <rect fill="url(#hurryBg)" width="300" height="300"/>
          
          {/* Motion lines */}
          {[...Array(8)].map((_, i) => (
            <ellipse 
              key={i}
              cx={50 + i * 30}
              cy={80 + (i % 3) * 20}
              rx={20}
              ry={5}
              fill="#42A5F5"
              opacity={0.3 + (i % 4) * 0.1}
            />
          ))}
          
          {/* Cute fly body */}
          <ellipse cx="150" cy="170" rx="45" ry="55" fill="#1565C0"/>
          <ellipse cx="150" cy="165" rx="38" ry="45" fill="#1E88E5"/>
          
          {/* Big compound eyes */}
          <ellipse cx="120" cy="120" rx="35" ry="40" fill="#FF5722"/>
          <ellipse cx="180" cy="120" rx="35" ry="40" fill="#FF5722"/>
          <ellipse cx="120" cy="120" rx="28" ry="32" fill="#FF9800"/>
          <ellipse cx="180" cy="120" rx="28" ry="32" fill="#FF9800"/>
          
          {/* Eye details */}
          <circle cx="115" cy="115" r="6" fill="#FFF" opacity="0.8"/>
          <circle cx="185" cy="115" r="6" fill="#FFF" opacity="0.8"/>
          
          {/* Cute transparent wings */}
          <ellipse cx="95" cy="140" rx="40" ry="25" fill="#90CAF9" opacity="0.5" transform="rotate(-25 95 140)"/>
          <ellipse cx="205" cy="140" rx="40" ry="25" fill="#90CAF9" opacity="0.5" transform="rotate(25 205 140)"/>
          
          {/* Little legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (45 + j * 12)}
                cy={185 + j * 15}
                rx={8}
                ry={22}
                fill="#1565C0"
                transform={`rotate(${side * (20 - j * 8)} ${150 + side * (45 + j * 12)} ${185 + j * 15})`}
              />
            ))
          ))}
          
          {/* Blush */}
          <ellipse cx="100" cy="150" rx="15" ry="10" fill="#FFCDD2" opacity="0.7"/>
          <ellipse cx="200" cy="150" rx="15" ry="10" fill="#FFCDD2" opacity="0.7"/>
          
          {/* Bullet decoration */}
          <text x="150" y="65" textAnchor="middle" fontSize="22">💨</text>
          <text x="70" y="240" fontSize="16">🎯</text>
        </svg>
      );
    } else if (insect.name === '蚁狮') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="antlionBg" cx="50%" cy="60%" r="70%">
              <stop offset="0%" stopColor="#FFF8E1"/>
              <stop offset="100%" stopColor="#FFE082"/>
            </radialGradient>
          </defs>
          <rect fill="url(#antlionBg)" width="300" height="300"/>
          
          {/* Sand pit */}
          <ellipse cx="150" cy="220" rx="80" ry="30" fill="#D7CCC8"/>
          <ellipse cx="150" cy="215" rx="65" ry="22" fill="#BCAAA4"/>
          
          {/* Cute antlion body */}
          <ellipse cx="150" cy="175" rx="50" ry="45" fill="#795548"/>
          <ellipse cx="150" cy="170" rx="42" ry="38" fill="#8D6E63"/>
          
          {/* Body segments */}
          <rect x="120" y="155" width="60" height="35" fill="#6D4C41" rx="8"/>
          
          {/* Big scary but cute jaws */}
          <ellipse cx="120" cy="135" rx="25" ry="18" fill="#5D4037" transform="rotate(-30 120 135)"/>
          <ellipse cx="180" cy="135" rx="25" ry="18" fill="#5D4037" transform="rotate(30 180 135)"/>
          <ellipse cx="110" cy="128" rx="18" ry="12" fill="#8D6E63" transform="rotate(-35 110 128)"/>
          <ellipse cx="190" cy="128" rx="18" ry="12" fill="#8D6E63" transform="rotate(35 190 128)"/>
          
          {/* Cute little eyes */}
          <ellipse cx="130" cy="105" rx="14" ry="16" fill="white"/>
          <ellipse cx="170" cy="105" rx="14" ry="16" fill="white"/>
          <circle cx="132" cy="108" r="7" fill="#3E2723"/>
          <circle cx="172" cy="108" r="7" fill="#3E2723"/>
          <circle cx="127" cy="102" r="3" fill="white"/>
          <circle cx="167" cy="102" r="3" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="110" cy="120" rx="12" ry="8" fill="#FFAB91" opacity="0.8"/>
          <ellipse cx="190" cy="120" rx="12" ry="8" fill="#FFAB91" opacity="0.8"/>
          
          {/* 3 pairs of legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (50 + j * 15)}
                cy={185 + j * 12}
                rx={10}
                ry={25}
                fill="#795548"
                transform={`rotate(${side * (18 - j * 6)} ${150 + side * (50 + j * 15)} ${185 + j * 12})`}
              />
            ))
          ))}
          
          {/* Ant decoration */}
          <text x="150" y="60" textAnchor="middle" fontSize="24">🐜</text>
          <text x="80" y="250" fontSize="16">🏜️</text>
        </svg>
      );
    } else if (insect.name === '黄蜂') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="waspBg" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#FFFDE7"/>
              <stop offset="100%" stopColor="#FFF59D"/>
            </radialGradient>
          </defs>
          <rect fill="url(#waspBg)" width="300" height="300"/>
          
          {/* Cute sparkles */}
          {[...Array(10)].map((_, i) => (
            <text 
              key={i}
              x={40 + (i * 25) % 220}
              y={70 + (i * 18) % 160}
              fontSize={12 + (i % 3) * 4}
              opacity={0.6}
            >✨</text>
          ))}
          
          {/* Cute wasp body */}
          <ellipse cx="150" cy="175" rx="48" ry="55" fill="#FFEB3B"/>
          <rect x="108" y="150" width="84" height="25" fill="#424242" rx="10"/>
          <rect x="103" y="190" width="94" height="25" fill="#424242" rx="10"/>
          
          {/* Head */}
          <ellipse cx="150" cy="115" rx="45" ry="40" fill="#FFEB3B"/>
          
          {/* Big compound eyes */}
          <ellipse cx="120" cy="110" rx="22" ry="26" fill="white"/>
          <ellipse cx="180" cy="110" rx="22" ry="26" fill="white"/>
          <circle cx="122" cy="115" r="12" fill="#1B5E20"/>
          <circle cx="182" cy="115" r="12" fill="#1B5E20"/>
          <circle cx="118" cy="107" r="5" fill="white"/>
          <circle cx="178" cy="107" r="5" fill="white"/>
          
          {/* Blush */}
          <ellipse cx="98" cy="130" rx="14" ry="10" fill="#FFCDD2" opacity="0.8"/>
          <ellipse cx="202" cy="130" rx="14" ry="10" fill="#FFCDD2" opacity="0.8"/>
          
          {/* Cute antennae */}
          <ellipse cx="130" cy="75" rx="7" ry="20" fill="#FDD835" transform="rotate(-20 130 75)"/>
          <ellipse cx="170" cy="75" rx="7" ry="20" fill="#FDD835" transform="rotate(20 170 75)"/>
          <circle cx="125" cy="60" r="8" fill="#FFC107"/>
          <circle cx="175" cy="60" r="8" fill="#FFC107"/>
          
          {/* Wings (weak point!) */}
          <ellipse cx="90" cy="150" rx="38" ry="24" fill="#B3E5FC" opacity="0.6" transform="rotate(-28 90 150)"/>
          <ellipse cx="210" cy="150" rx="38" ry="24" fill="#B3E5FC" opacity="0.6" transform="rotate(28 210 150)"/>
          
          {/* Little legs */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (48 + j * 14)}
                cy={190 + j * 14}
                rx={9}
                ry={23}
                fill="#FFEB3B"
                transform={`rotate(${side * (16 - j * 5)} ${150 + side * (48 + j * 14)} ${190 + j * 14})`}
              />
            ))
          ))}
          
          {/* Cute stinger */}
          <ellipse cx="150" cy="235" rx="14" ry="22" fill="#FFEB3B"/>
          <path d="M145 248 L150 270 L155 248" fill="#FF9800"/>
          
          {/* Flower decoration */}
          <text x="150" y="55" textAnchor="middle" fontSize="24">🌸</text>
        </svg>
      );
    } else if (insect.name === '化蛛侠') {
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="spiderheroBg" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stopColor="#F3E5F5"/>
              <stop offset="100%" stopColor="#CE93D8"/>
            </radialGradient>
          </defs>
          <rect fill="url(#spiderheroBg)" width="300" height="300"/>
          
          {/* Web pattern */}
          <path d="M50 50 Q150 100 50 250" stroke="#E1BEE7" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M100 30 Q150 130 100 270" stroke="#E1BEE7" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M200 50 Q150 100 200 250" stroke="#E1BEE7" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M250 30 Q150 130 250 270" stroke="#E1BEE7" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M30 150 Q150 150 270 150" stroke="#E1BEE7" strokeWidth="2" fill="none" opacity="0.5"/>
          
          {/* Cute sparkles */}
          {[...Array(10)].map((_, i) => (
            <circle 
              key={i}
              cx={35 + (i * 23) % 230}
              cy={60 + (i * 18) % 180}
              r={2 + (i % 3)}
              fill={i % 2 === 0 ? "#E91E63" : "#9C27B0"}
              opacity={0.6}
            >
              <animate attributeName="opacity" values={`${0.6};1;${0.6}`} dur={`${1.2 + i * 0.15}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          
          {/* Cute chubby spider body */}
          <ellipse cx="150" cy="180" rx="60" ry="65" fill="#424242"/>
          <ellipse cx="150" cy="125" rx="48" ry="48" fill="#616161"/>
          
          {/* Spider symbol on belly */}
          <ellipse cx="150" cy="175" rx="25" ry="20" fill="#E91E63"/>
          <text x="150" y="180" textAnchor="middle" fontSize="20">🕷️</text>
          
          {/* Super big cute eyes */}
          <ellipse cx="125" cy="115" rx="24" ry="28" fill="white"/>
          <ellipse cx="175" cy="115" rx="24" ry="28" fill="white"/>
          <circle cx="128" cy="122" r="13" fill="#212121"/>
          <circle cx="178" cy="122" r="13" fill="#212121"/>
          <circle cx="123" cy="114" r="5" fill="white"/>
          <circle cx="173" cy="114" r="5" fill="white"/>
          
          {/* Blush cheeks */}
          <ellipse cx="102" cy="135" rx="16" ry="11" fill="#F8BBD9" opacity="0.8"/>
          <ellipse cx="198" cy="135" rx="16" ry="11" fill="#F8BBD9" opacity="0.8"/>
          
          {/* Little smile */}
          <path d="M135 145 Q150 160 165 145" stroke="#424242" strokeWidth="4" fill="none" strokeLinecap="round"/>
          
          {/* Fangs (cute version!) */}
          <ellipse cx="138" cy="155" rx="5" ry="8" fill="#FFE0B2"/>
          <ellipse cx="162" cy="155" rx="5" ry="8" fill="#FFE0B2"/>
          
          {/* 6 legs! */}
          {[-1, 1].map((side, i) => (
            [0, 1, 2].map((leg, j) => (
              <ellipse 
                key={`${i}-${j}`}
                cx={150 + side * (60 + j * 10)}
                cy={160 + j * 18}
                rx={12}
                ry={32}
                fill="#616161"
                transform={`rotate(${side * (22 - j * 7)} ${150 + side * (60 + j * 10)} ${160 + j * 18})`}
              />
            ))
          ))}
          
          {/* Hero mask */}
          <text x="150" y="65" textAnchor="middle" fontSize="28">🦸</text>
          
          {/* Hearts */}
          <text x="70" y="75" fontSize="20">💜</text>
          <text x="215" y="70" fontSize="18">💖</text>
        </svg>
      );
    }
    return null;
  };

  const getUltimateAnimation = () => {
    if (insect.name === '巴西游走蛛') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">💕</div>
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
                <div className="text-3xl">💖</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (insect.name === '豆娘稚虫') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-pulse">✨</div>
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
                <div className="text-2xl">💧</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (insect.name === '黑雾寡妇蜘蛛') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-7xl animate-pulse">🥰</div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${15 + (i % 4) * 20}%`,
                  top: `${35 + Math.floor(i / 4) * 30}%`,
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              >
                <div className="text-3xl">💗</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">⭐</div>
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
                <div className="text-2xl">✨</div>
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
