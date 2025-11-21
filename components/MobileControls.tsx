import React from 'react';
import { Direction } from '../types';

interface MobileControlsProps {
  onDirectionChange: (dir: Direction) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange }) => {
  const btnClass = "w-14 h-14 bg-slate-800/80 border border-slate-700 rounded-lg flex items-center justify-center text-cyan-400 text-2xl shadow-lg active:bg-cyan-900/50 active:scale-95 transition-all touch-manipulation hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]";

  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-2 md:hidden">
      <div />
      <button 
        className={btnClass} 
        onClick={() => onDirectionChange(Direction.UP)}
        aria-label="Up"
      >
        ▲
      </button>
      <div />
      
      <button 
        className={btnClass} 
        onClick={() => onDirectionChange(Direction.LEFT)}
        aria-label="Left"
      >
        ◀
      </button>
      <button 
        className={btnClass} 
        onClick={() => onDirectionChange(Direction.DOWN)}
        aria-label="Down"
      >
        ▼
      </button>
      <button 
        className={btnClass} 
        onClick={() => onDirectionChange(Direction.RIGHT)}
        aria-label="Right"
      >
        ▶
      </button>
    </div>
  );
};