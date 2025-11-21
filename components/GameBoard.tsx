import React from 'react';
import { Coordinate, Direction, GameStatus } from '../types';
import { GRID_SIZE } from '../constants';

interface GameBoardProps {
  snake: Coordinate[];
  food: Coordinate;
  status: GameStatus;
  direction: Direction;
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, status, direction }) => {
  // Create grid cells
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div 
      className="grid bg-slate-900/80 border-2 border-slate-700 shadow-[0_0_20px_rgba(148,163,184,0.1)] rounded-xl overflow-hidden backdrop-blur-sm"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        aspectRatio: '1/1',
        width: 'min(90vw, 400px)',
      }}
    >
      {cells.map((_, index) => {
        const x = index % GRID_SIZE;
        const y = Math.floor(index / GRID_SIZE);
        
        const isFood = food.x === x && food.y === y;
        const snakeIndex = snake.findIndex(s => s.x === x && s.y === y);
        const isHead = snakeIndex === 0;
        const isBody = snakeIndex > 0;

        // Base cell
        let content = null;

        if (isFood) {
          content = (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[70%] h-[70%] bg-pink-500 rounded-full shadow-[0_0_15px_#ec4899] animate-pulse" />
            </div>
          );
        } else if (isHead) {
          content = (
            <div className={`w-full h-full bg-cyan-400 rounded-sm shadow-[0_0_20px_#22d3ee] z-10 relative ${status === GameStatus.GAME_OVER ? 'animate-shake' : ''}`}>
               {/* Simple Eyes */}
               <div className="absolute w-full h-full flex justify-between px-[15%] py-[15%]">
                  <div className="w-[20%] h-[20%] bg-slate-900 rounded-full" />
                  <div className="w-[20%] h-[20%] bg-slate-900 rounded-full" />
               </div>
            </div>
          );
        } else if (isBody) {
          // Calculate opacity for trail effect
          const opacity = Math.max(0.4, 1 - snakeIndex / (snake.length + 5));
          content = (
            <div 
              className="w-full h-full bg-cyan-600 rounded-sm shadow-[0_0_10px_#0891b2]"
              style={{ opacity }} 
            />
          );
        }

        return (
          <div 
            key={index} 
            className={`w-full h-full border-[0.5px] border-slate-800/30 ${isHead ? 'z-10' : 'z-0'}`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};