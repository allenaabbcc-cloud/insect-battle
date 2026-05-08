import React, { useState, useEffect } from 'react';
import insects from './data/insects.json';
import Card from './components/Card';
import CardGallery from './components/CardGallery';
import CardDetail from './components/CardDetail';
import WorldMap from './components/WorldMap';
import Achievements from './components/Achievements';
import CreationCenter from './components/CreationCenter';

function App() {
  const [gameState, setGameState] = useState('battle');
  const [selectedCard, setSelectedCard] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [enemyCard, setEnemyCard] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [battleCommentary, setBattleCommentary] = useState('');
  const [randomFact, setRandomFact] = useState(null);
  const [customInsects, setCustomInsects] = useState([]);
  const [playerStats, setPlayerStats] = useState({
    totalBattles: 0,
    wins: 0,
    losses: 0,
    winStreak: 0,
    currentStreak: 0
  });
  
  // 新增:战斗环境状态
  const [isUnderwater, setIsUnderwater] = useState(false);
  
  // 新增:中毒状态
  const [playerPoisoned, setPlayerPoisoned] = useState(false);
  const [enemyPoisoned, setEnemyPoisoned] = useState(false);
  const [poisonCountdown, setPoisonCountdown] = useState(0);

  // 计算实际攻击力(考虑水生机制)
  const getActualAtk = (insect, underwater) => {
    if (insect.specialMechanism === 'aquatic') {
      const multiplier = insect.aquaticMultiplier || { underwater: 0.9, land: 0.0 };
      return underwater ? insect.atk * multiplier.underwater : insect.atk * multiplier.land;
    }
    return insect.atk;
  };

  // 计算蜗牛Debuff后的攻击力
  const getDebuffedAtk = (insect, hasDebuff) => {
    if (hasDebuff && insect.specialMechanism === 'debuff') {
      return insect.atk * 0.8; // 中毒状态,ATK下降20%
    }
    return insect.atk;
  };

  // 中毒效果处理
  useEffect(() => {
    if ((playerPoisoned || enemyPoisoned) && poisonCountdown > 0) {
      const timer = setTimeout(() => {
        setPoisonCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [poisonCountdown, playerPoisoned, enemyPoisoned]);

  const generateBattleCommentary = (winner, loser, isNaturalEnemy, isWeaknessCrit, isPoisonKill) => {
    if (isPoisonKill) {
      return `${winner.name} 的 ${winner.ultimate} 让 ${loser.name} 中毒了！毒液发作，3秒后血条清零！`;
    }
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
    
    // 获取敌方昆虫(排除玩家选择的)
    const availableEnemies = insects.filter(i => i.id !== card.id);
    const enemyIndex = Math.floor(Math.random() * availableEnemies.length);
    const enemy = availableEnemies[enemyIndex];
    setEnemyCard(enemy);
    
    // 重置状态
    setBattleLog([]);
    setGameResult(null);
    setBattleCommentary('');
    setRandomFact(null);
    setPlayerPoisoned(false);
    setEnemyPoisoned(false);
    setPoisonCountdown(0);
    
    // 记录战斗环境
    const envText = isUnderwater ? '🌊 水下战斗' : '🏜️ 陆地战斗';
    setBattleLog(prev => [...prev, `【${envText}】`]);
    
    setTimeout(() => {
      setBattleLog(prev => [...prev, `${card.name} 准备出战！`]);
      
      setTimeout(() => {
        setBattleLog(prev => [...prev, `敌方 ${enemy.name} 出现了！`]);
        
        setTimeout(() => {
          let winner, loser;
          let isNaturalEnemy = false;
          let isWeaknessCrit = false;
          let isPoisonKill = false;
          
          // 计算实际攻击力
          const playerAtk = getActualAtk(card, isUnderwater);
          const enemyAtk = getActualAtk(enemy, isUnderwater);
          
          // 检查龙虱水生机制
          if (card.specialMechanism === 'aquatic') {
            setBattleLog(prev => [...prev, `💧 ${card.name} 的水生机制生效！实际攻击力：${playerAtk}`]);
          }
          if (enemy.specialMechanism === 'aquatic') {
            setBattleLog(prev => [...prev, `💧 ${enemy.name} 的水生机制生效！实际攻击力：${enemyAtk}`]);
          }
          
          // 检查黑寡妇毒牙机制
          const checkPoisonKill = (attacker, defender, attackerIsPlayer) => {
            if (attacker.specialMechanism === 'poison_kill') {
              const defenderAtk = getActualAtk(defender, isUnderwater);
              if (defenderAtk < attacker.atk) {
                isPoisonKill = true;
                if (attackerIsPlayer) {
                  setEnemyPoisoned(true);
                  setPoisonCountdown(3);
                  setBattleLog(prev => [...prev, `☠️ 黑寡妇的毒牙命中！${defender.name} 中毒了！`]);
                  setBattleLog(prev => [...prev, `⏱️ 3...2...1...毒发身亡！`]);
                } else {
                  setPlayerPoisoned(true);
                  setPoisonCountdown(3);
                  setBattleLog(prev => [...prev, `☠️ 黑寡妇的毒牙命中！${defender.name} 中毒了！`]);
                  setBattleLog(prev => [...prev, `⏱️ 3...2...1...毒发身亡！`]);
                }
                return true;
              }
            }
            return false;
          };
          
          // 检查天敌
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
            // 普通战斗逻辑
            const effectivePlayerAtk = playerAtk;
            const effectiveEnemyAtk = enemyAtk;
            
            if (effectivePlayerAtk !== effectiveEnemyAtk) {
              const underdog = effectivePlayerAtk < effectiveEnemyAtk ? card : enemy;
              const favorite = effectivePlayerAtk < effectiveEnemyAtk ? enemy : card;
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
              setPlayerStats(prev => ({
                ...prev,
                totalBattles: prev.totalBattles + 1,
                currentStreak: 0
              }));
              return;
            }
          }
          
          // 检查蜗牛粘液炸弹debuff
          if (winner.specialMechanism === 'debuff') {
            setBattleLog(prev => [...prev, `🐌 ${winner.name} 使用粘液炸弹！${loser.name} 进入中毒状态，下一场ATK下降20%！`]);
          }
          
          // 生成战斗解说
          const commentary = generateBattleCommentary(winner, loser, isNaturalEnemy, isWeaknessCrit, isPoisonKill);
          setBattleCommentary(commentary);
          
          const fact = getRandomFact(winner);
          setRandomFact(fact);
          
          // 延迟显示结果,让中毒效果先播放
          setTimeout(() => {
            if (winner === card) {
              setGameResult('victory');
              setBattleLog(prev => [...prev, `🎉 胜利！${card.name} 获胜！`]);
              setPlayerStats(prev => ({
                ...prev,
                totalBattles: prev.totalBattles + 1,
                wins: prev.wins + 1,
                currentStreak: prev.currentStreak + 1,
                winStreak: Math.max(prev.winStreak, prev.currentStreak + 1)
              }));
            } else {
              setGameResult('defeat');
              setBattleLog(prev => [...prev, `💀 失败！${enemy.name} 获胜！`]);
              setPlayerStats(prev => ({
                ...prev,
                totalBattles: prev.totalBattles + 1,
                losses: prev.losses + 1,
                currentStreak: 0
              }));
            }
          }, isPoisonKill ? 3500 : 0);
          
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
    setPlayerPoisoned(false);
    setEnemyPoisoned(false);
    setPoisonCountdown(0);
  };

  if (gameState === 'gallery') {
    return <CardGallery onBack={() => setGameState('battle')} onSelectCard={(card) => { setSelectedCard(card); setGameState('detail'); }} />;
  }
  
  if (gameState === 'detail') {
    return <CardDetail insect={selectedCard} onBack={() => setGameState('gallery')} />;
  }

  if (gameState === 'map') {
    return <WorldMap onBack={() => setGameState('battle')} onSelectCard={(card) => { setSelectedCard(card); setGameState('detail'); }} />;
  }

  if (gameState === 'achievements') {
    return <Achievements onBack={() => setGameState('battle')} playerStats={playerStats} />;
  }

  if (gameState === 'creation') {
    return <CreationCenter onBack={() => setGameState('battle')} customInsects={customInsects} setCustomInsects={setCustomInsects} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-yellow-400 drop-shadow-lg mb-4">
            🐛 Sam的昆虫大作战 🐛
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button
              onClick={() => setGameState('gallery')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              📚 英雄图鉴
            </button>
            <button
              onClick={() => setGameState('map')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              🌍 世界地图
            </button>
            <button
              onClick={() => setGameState('achievements')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              🏆 成就系统
            </button>
            <button
              onClick={() => setGameState('creation')}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              🎨 创作中心
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-black/40 rounded-2xl p-6 border border-purple-500/50">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                🎮 选择你的英雄
              </h2>
              
              {/* 战斗环境选择 */}
              <div className="mb-4 bg-indigo-900/50 rounded-xl p-4 border border-indigo-500/50">
                <div className="text-indigo-300 font-bold mb-3 text-center">⚔️ 战斗环境</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsUnderwater(false)}
                    className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
                      !isUnderwater 
                        ? 'bg-yellow-500 text-white shadow-lg' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    🏜️ 陆地
                  </button>
                  <button
                    onClick={() => setIsUnderwater(true)}
                    className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
                      isUnderwater 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    🌊 水下
                  </button>
                </div>
                <div className="text-xs text-indigo-300 mt-2 text-center">
                  💡 龙虱水下ATK:90% 陆地ATK:0%
                </div>
              </div>
              
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
            <div className="bg-black/40 rounded-2xl p-6 border border-blue-500/50">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                ⚔️ 战斗场地
              </h2>
              
              {/* 中毒状态显示 */}
              {(playerPoisoned || enemyPoisoned) && (
                <div className="mb-4 bg-red-900/50 rounded-xl p-3 border border-red-500 animate-pulse">
                  <div className="text-red-300 font-bold text-center">
                    ☠️ 中毒状态！倒计时：{poisonCountdown}
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  {playerCard && (
                    <div className="relative">
                      <Card insect={playerCard} isSmall />
                      {playerPoisoned && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                          ☠️ 中毒
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <div className="text-4xl font-black text-yellow-400 animate-pulse">
                    VS
                  </div>
                </div>
                
                <div className="flex justify-center">
                  {enemyCard && (
                    <div className="relative">
                      <Card insect={enemyCard} isEnemy isSmall />
                      {enemyPoisoned && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                          ☠️ 中毒
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 bg-black/50 rounded-xl p-4 min-h-32">
                <h3 className="text-yellow-400 font-bold mb-2">📜 战斗日志</h3>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {battleLog.map((log, index) => (
                    <div key={index} className="text-gray-200 text-sm">
                      {log}
                    </div>
                  ))}
                  {battleLog.length === 0 && (
                    <div className="text-gray-500 text-sm">选择你的英雄开始战斗！</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-black/40 rounded-2xl p-6 border border-yellow-500/50">
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
                        <div className="text-white">
                          攻击：
                          {playerCard.specialMechanism === 'aquatic' ? (
                            <span className={isUnderwater ? 'text-blue-400' : 'text-red-400'}>
                              {isUnderwater ? playerCard.atk * 0.9 : 0}
                              <span className="text-xs">({isUnderwater ? '水下' : '陆地'})</span>
                            </span>
                          ) : (
                            <span className="text-green-300">{playerCard.atk}</span>
                          )}
                        </div>
                        {playerCard.specialMechanism && (
                          <div className="text-xs text-purple-400 mt-1">
                            {playerCard.specialMechanism === 'poison_kill' && '☠️ 毒牙机制'}
                            {playerCard.specialMechanism === 'debuff' && '🐌 粘液炸弹'}
                            {playerCard.specialMechanism === 'aquatic' && '💧 水生机制'}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-red-400">{enemyCard.name}</div>
                        <div className="text-white">
                          攻击：
                          {enemyCard.specialMechanism === 'aquatic' ? (
                            <span className={isUnderwater ? 'text-blue-400' : 'text-red-400'}>
                              {isUnderwater ? enemyCard.atk * 0.9 : 0}
                              <span className="text-xs">({isUnderwater ? '水下' : '陆地'})</span>
                            </span>
                          ) : (
                            <span className="text-red-300">{enemyCard.atk}</span>
                          )}
                        </div>
                        {enemyCard.specialMechanism && (
                          <div className="text-xs text-purple-400 mt-1">
                            {enemyCard.specialMechanism === 'poison_kill' && '☠️ 毒牙机制'}
                            {enemyCard.specialMechanism === 'debuff' && '🐌 粘液炸弹'}
                            {enemyCard.specialMechanism === 'aquatic' && '💧 水生机制'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* 机制说明 */}
                  <div className="bg-purple-900/30 rounded-xl p-3 border border-purple-500/30">
                    <div className="text-purple-300 font-bold mb-2 text-sm">📖 特殊机制说明</div>
                    <div className="text-xs text-purple-200 space-y-1">
                      <div>☠️ <strong>黑寡妇</strong>: ATK&lt;97的对手直接中毒,3秒后血条清零</div>
                      <div>🐌 <strong>蜗牛</strong>: 使用粘液炸弹,对手下场ATK-20%</div>
                      <div>💧 <strong>龙虱</strong>: 水下ATK90%,陆地ATK0%</div>
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
                  {gameResult === 'victory' && '🎉 胜利！🎉'}
                  {gameResult === 'defeat' && '💀 失败！💀'}
                  {gameResult === 'draw' && '⚖️ 平局！⚖️'}
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
