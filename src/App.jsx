import React, { useState } from 'react';
import insects from './data/insects.json';
import Card from './components/Card';
import CardGallery from './components/CardGallery';
import CardDetail from './components/CardDetail';

function App() {
  const [gameState, setGameState] = useState('battle');
  const [selectedCard, setSelectedCard] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [enemyCard, setEnemyCard] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [battleCommentary, setBattleCommentary] = useState('');
  const [randomFact, setRandomFact] = useState(null);

  const generateBattleCommentary = (winner, loser, isNaturalEnemy, isWeaknessCrit) => {
    if (isNaturalEnemy) {
      return `${winner.name} 是 ${loser.name} 的天敌！利用天敌压制，轻松获胜！`;
    }
    
    if (winner.type === '毒' && loser.type === '力量') {
      return `${winner.name} 利用灵活的伏击躲开了攻击，并用 ${winner.ultimate} 瞬间麻痹了 ${loser.name} 的 ${loser.weakness}！以柔克刚，轻松取胜！`;
    }
    
    if (winner.type === '力量' && loser.type === '水') {
      return `${winner.name} 以绝对的纯物理力量碾压，使出致命的 ${winner.ultimate}，${loser.name} 根本无力招架！`;
    }
    
    if (winner.type === '水' && loser.type === '毒') {
      return `${winner.name} 利用水域优势，让 ${loser.name} 的毒液无法发挥作用，${winner.ultimate} 完美命中！`;
    }
    
    if (isWeaknessCrit) {
      return `${winner.name} 抓住了对手的弱点 ${loser.weakness}，使用 ${winner.ultimate} 实现逆风翻盘！这就是战术的胜利！`;
    }
    
    return `${winner.name} 使用 ${winner.ultimate}，凭借 ${winner.atk} 的强大攻击力击败了 ${loser.name}！`;
  };

  const getRandomFact = (insect) => {
    const facts = insect.funFacts;
    return facts[Math.floor(Math.random() * facts.length)];
  };

  const startBattle = (card) => {
    setPlayerCard(card);
    
    const enemyIndex = Math.floor(Math.random() * insects.length);
    const enemy = insects[enemyIndex];
    setEnemyCard(enemy);
    
    setBattleLog([]);
    setGameResult(null);
    setBattleCommentary('');
    setRandomFact(null);
    
    setTimeout(() => {
      setBattleLog(prev => [...prev, `${card.name} 准备出战！`]);
      
      setTimeout(() => {
        setBattleLog(prev => [...prev, `敌方 ${enemy.name} 出现了！`]);
        
        setTimeout(() => {
          let winner, loser;
          let isNaturalEnemy = false;
          let isWeaknessCrit = false;
          
          if (enemy.name === card.naturalEnemy) {
            winner = enemy;
            loser = card;
            isNaturalEnemy = true;
            setBattleLog(prev => [...prev, `⚠️ 天敌压制！${enemy.name} 是 ${card.name} 的天敌！`]);
          } else if (card.name === enemy.naturalEnemy) {
            winner = card;
            loser = enemy;
            isNaturalEnemy = true;
            setBattleLog(prev => [...prev, `🔥 天敌压制！${card.name} 是 ${enemy.name} 的天敌！`]);
          } else {
            if (card.atk !== enemy.atk) {
              const underdog = card.atk < enemy.atk ? card : enemy;
              const favorite = card.atk < enemy.atk ? enemy : card;
              const diceRoll = Math.floor(Math.random() * 20) + 1;
              
              setBattleLog(prev => [...prev, `🎲 ${underdog.name} 投出了 ${diceRoll} 点！`]);
              
              if (diceRoll >= 16) {
                winner = underdog;
                loser = favorite;
                isWeaknessCrit = true;
                setBattleLog(prev => [...prev, `💥 弱点暴击！抓住了对手的弱点！`]);
              } else {
                winner = favorite;
                loser = underdog;
              }
            } else {
              setBattleLog(prev => [...prev, `⚖️ 双方攻击力相同！平局！`]);
              setGameResult('draw');
              setBattleCommentary(`势均力敌！${card.name} 和 ${enemy.name} 打平了！`);
              setRandomFact(getRandomFact(card));
              return;
            }
          }
          
          const commentary = generateBattleCommentary(winner, loser, isNaturalEnemy, isWeaknessCrit);
          setBattleCommentary(commentary);
          
          const fact = getRandomFact(winner);
          setRandomFact(fact);
          
          if (winner === card) {
            setGameResult('victory');
            setBattleLog(prev => [...prev, `🎉 胜利！${card.name} 获胜！`]);
          } else {
            setGameResult('defeat');
            setBattleLog(prev => [...prev, `💀 失败...${enemy.name} 获胜...`]);
          }
        }, 800);
      }, 600);
    }, 400);
  };

  const resetGame = () => {
    setPlayerCard(null);
    setEnemyCard(null);
    setBattleLog([]);
    setGameResult(null);
    setBattleCommentary('');
    setRandomFact(null);
  };

  if (gameState === 'gallery') {
    return <CardGallery onBack={() => setGameState('battle')} onSelectCard={(card) => { setSelectedCard(card); setGameState('detail'); }} />;
  }
  
  if (gameState === 'detail') {
    return <CardDetail insect={selectedCard} onBack={() => setGameState('gallery')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-yellow-400 drop-shadow-lg mb-2">
            🐛 Sam的昆虫大作战 🐛
          </h1>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setGameState('gallery')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              📚 英雄卡牌图鉴
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-black/40 rounded-2xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                🎮 选择你的英雄
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {insects.map((insect) => (
                  <Card
                    key={insect.id}
                    insect={insect}
                    onClick={() => startBattle(insect)}
                    isSmall
                    isSelected={playerCard?.id === insect.id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-black/40 rounded-2xl p-6 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                ⚔️ 战斗场地
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  {playerCard && (
                    <Card insect={playerCard} isSmall />
                  )}
                </div>
                
                <div className="flex justify-center">
                  <div className="text-4xl font-black text-yellow-400 animate-pulse">
                    VS
                  </div>
                </div>
                
                <div className="flex justify-center">
                  {enemyCard && (
                    <Card insect={enemyCard} isEnemy isSmall />
                  )}
                </div>
              </div>
              
              <div className="mt-6 bg-black/50 rounded-xl p-4 min-h-32">
                <h3 className="text-yellow-400 font-bold mb-2">📜 战斗日志</h3>
                <div className="space-y-1">
                  {battleLog.map((log, index) => (
                    <div key={index} className="text-gray-200 text-sm">
                      {log}
                    </div>
                  ))}
                  {battleLog.length === 0 && (
                    <div className="text-gray-500 text-sm">选择你的英雄开始战斗...</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-black/40 rounded-2xl p-6 border border-yellow-500/30">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                📊 战斗信息
              </h2>
              
              {playerCard && enemyCard && (
                <div className="space-y-4">
                  <div className="bg-gray-800/80 rounded-xl p-4">
                    <div className="text-yellow-400 font-bold mb-2">⚡ 双方对比</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-green-400">{playerCard.name}</div>
                        <div className="text-white">攻击: {playerCard.atk}</div>
                      </div>
                      <div>
                        <div className="text-red-400">{enemyCard.name}</div>
                        <div className="text-white">攻击: {enemyCard.atk}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {gameResult && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className={`
              bg-gradient-to-br 
              ${gameResult === 'victory' ? 'from-green-800 to-green-900 border-green-500' : ''}
              ${gameResult === 'defeat' ? 'from-red-800 to-red-900 border-red-500' : ''}
              ${gameResult === 'draw' ? 'from-yellow-800 to-yellow-900 border-yellow-500' : ''}
              border-4 rounded-3xl p-8 max-w-2xl w-full
            `}>
              <div className="text-center">
                <div className={`
                  text-6xl font-black mb-4
                  ${gameResult === 'victory' ? 'text-green-300' : ''}
                  ${gameResult === 'defeat' ? 'text-red-300' : ''}
                  ${gameResult === 'draw' ? 'text-yellow-300' : ''}
                `}>
                  {gameResult === 'victory' && '🎉 VICTORY 🎉'}
                  {gameResult === 'defeat' && '💀 DEFEAT 💀'}
                  {gameResult === 'draw' && '⚖️ DRAW ⚖️'}
                </div>
                
                <div className="space-y-4">
                  {battleCommentary && (
                    <div className={`
                      bg-black/40 rounded-xl p-4 border
                      ${gameResult === 'victory' ? 'border-green-500' : ''}
                      ${gameResult === 'defeat' ? 'border-red-500' : ''}
                      ${gameResult === 'draw' ? 'border-yellow-500' : ''}
                    `}>
                      <p className="text-lg italic text-white">
                        {battleCommentary}
                      </p>
                    </div>
                  )}
                  
                  {randomFact && (
                    <div className="bg-purple-900/50 rounded-xl p-4 border border-purple-500">
                      <div className="text-yellow-400 font-bold mb-2">🎯 有趣的知识！</div>
                      <p className="text-purple-100">{randomFact}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={resetGame}
                    className={`
                      mt-4 px-8 py-3 rounded-xl font-bold text-xl transition-all
                      ${gameResult === 'victory' ? 'bg-green-600 hover:bg-green-500' : ''}
                      ${gameResult === 'defeat' ? 'bg-red-600 hover:bg-red-500' : ''}
                      ${gameResult === 'draw' ? 'bg-yellow-600 hover:bg-yellow-500' : ''}
                      text-white
                    `}
                  >
                    下一场 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
