import { useState, useCallback, useEffect, useRef } from 'react';
import { Coordinate, Direction, GameStatus } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_SPEED, MIN_SPEED, SPEED_DECREMENT } from '../constants';
import { checkCollision, getNextHead, getRandomCoordinate, isOppositeDirection } from '../utils/gameUtils';
import { useInterval } from './useInterval';

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Coordinate[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Coordinate>(getRandomCoordinate());
  const [direction, setDirection] = useState<Direction>(Direction.UP);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  // Ref to track the direction processed in the last tick to prevent rapid double-turns (suicide)
  const lastProcessedDirection = useRef<Direction>(Direction.UP);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomCoordinate());
    setDirection(Direction.UP);
    lastProcessedDirection.current = Direction.UP;
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setStatus(GameStatus.PLAYING);
  }, []);

  const pauseGame = useCallback(() => {
    if (status === GameStatus.PLAYING) setStatus(GameStatus.PAUSED);
    else if (status === GameStatus.PAUSED) setStatus(GameStatus.PLAYING);
  }, [status]);

  const changeDirection = useCallback((newDirection: Direction) => {
    // Prevent reversing direction immediately
    if (isOppositeDirection(newDirection, lastProcessedDirection.current)) {
      return;
    }
    setDirection(newDirection);
  }, []);

  const gameLoop = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = getNextHead(head, direction);

      // Save the direction we actually moved in
      lastProcessedDirection.current = direction;

      if (checkCollision(newHead, prevSnake)) {
        setStatus(GameStatus.GAME_OVER);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_DECREMENT));
        
        // Generate new food that isn't on snake
        let newFood = getRandomCoordinate();
        while (checkCollision(newFood, newSnake)) {
          newFood = getRandomCoordinate();
        }
        setFood(newFood);
        // Don't pop tail, so snake grows
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  }, [direction, food]);

  useInterval(gameLoop, status === GameStatus.PLAYING ? speed : null);

  return {
    snake,
    food,
    direction,
    status,
    score,
    highScore,
    startGame,
    pauseGame,
    changeDirection,
  };
};