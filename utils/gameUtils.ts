import { Coordinate, Direction } from '../types';
import { GRID_SIZE } from '../constants';

export const getRandomCoordinate = (): Coordinate => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

export const checkCollision = (head: Coordinate, snake: Coordinate[]): boolean => {
  // Wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }

  // Self collision (ignore tail as it will move, but simple check is fine for now)
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
};

export const getNextHead = (currentHead: Coordinate, direction: Direction): Coordinate => {
  switch (direction) {
    case Direction.UP:
      return { x: currentHead.x, y: currentHead.y - 1 };
    case Direction.DOWN:
      return { x: currentHead.x, y: currentHead.y + 1 };
    case Direction.LEFT:
      return { x: currentHead.x - 1, y: currentHead.y };
    case Direction.RIGHT:
      return { x: currentHead.x + 1, y: currentHead.y };
    default:
      return currentHead;
  }
};

export const isOppositeDirection = (dir1: Direction, dir2: Direction): boolean => {
  if (dir1 === Direction.UP && dir2 === Direction.DOWN) return true;
  if (dir1 === Direction.DOWN && dir2 === Direction.UP) return true;
  if (dir1 === Direction.LEFT && dir2 === Direction.RIGHT) return true;
  if (dir1 === Direction.RIGHT && dir2 === Direction.LEFT) return true;
  return false;
};