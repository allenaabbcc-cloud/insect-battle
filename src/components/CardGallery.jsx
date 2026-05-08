import React from 'react';
import Card from './Card';
import insects from '../data/insects.json';

const CardGallery = ({ onBack, onSelectCard }) => {
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
            🐛 英雄卡牌图鉴 🐛
          </h1>
          <div className="w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insects.map((insect) => (
            <div 
              key={insect.id}
              className="flex flex-col items-center gap-4"
            >
              <Card 
                insect={insect}
                onClick={() => onSelectCard(insect)}
                isShowcase
              />
              <div className="text-center">
                <div className="text-yellow-400 font-bold mb-1">
                  📅 创建日期: {insect.createdAt}
                </div>
                <div className="text-gray-300 text-sm">
                  点击查看详细信息
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400">
          <p className="text-lg">✨ 收集所有昆虫英雄，组建你的无敌战队！ ✨</p>
        </div>
      </div>
    </div>
  );
};

export default CardGallery;
