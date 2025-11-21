import React, { useEffect } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import { GameBoard } from './components/GameBoard';
import { Direction, GameStatus } from './types';
import { MobileControls } from './components/MobileControls';

const App: React.FC = () => {
  const { 
    snake, 
    food, 
    direction, 
    status, 
    score, 
    highScore, 
    startGame, 
    pauseGame, 
    changeDirection 
  } = useSnakeGame();

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection(Direction.RIGHT);
          break;
        case ' ':
        case 'Enter':
        case 'Escape':
          if (status === GameStatus.IDLE || status === GameStatus.GAME_OVER) {
            startGame();
          } else {
            pauseGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, pauseGame, startGame, status]);

  // Visual Text Helpers
  const getStatusText = () => {
    if (status === GameStatus.IDLE) return "START GAME";
    if (status === GameStatus.GAME_OVER) return "GAME OVER";
    if (status === GameStatus.PAUSED) return "PAUSED";
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10"></div>
      
      <header className="mb-6 text-center">
        <h1 className="font-digital text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 font-bold tracking-wider shadow-neon drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          NEON SNAKE
        </h1>
      </header>

      {/* HUD */}
      <div className="flex gap-8 mb-6 w-[min(90vw,400px)] justify-between px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-slate-400 text-xs tracking-widest font-bold">SCORE</span>
          <span className="font-digital text-2xl text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            {score.toString().padStart(3, '0')}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-slate-400 text-xs tracking-widest font-bold">BEST</span>
          <span className="font-digital text-2xl text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]">
            {highScore.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* Game Container */}
      <div className="relative">
        <GameBoard 
          snake={snake} 
          food={food} 
          status={status} 
          direction={direction} 
        />

        {/* Overlay for Start/Game Over/Pause */}
        {status !== GameStatus.PLAYING && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-20 animate-fade-in">
            <h2 className="font-digital text-4xl text-white mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {getStatusText()}
            </h2>
            <button 
              onClick={status === GameStatus.PAUSED ? pauseGame : startGame}
              className="mt-6 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(8,145,178,0.6)] transition-all hover:scale-105 active:scale-95 group"
            >
              <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {status === GameStatus.PAUSED ? "RESUME" : "PLAY NOW"}
              </span>
            </button>
            {status === GameStatus.IDLE && (
               <p className="mt-4 text-slate-400 text-xs">Use Arrows / WASD to move</p>
            )}
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mt-8">
        <MobileControls onDirectionChange={changeDirection} />
      </div>
      
      <footer className="mt-8 text-slate-600 text-xs">
        Neon Snake v1.0
      </footer>
    </div>
  );
};

export default App;