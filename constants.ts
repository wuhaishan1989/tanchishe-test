import { Coordinate } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 50;
export const SPEED_DECREMENT = 2;

export const INITIAL_SNAKE: Coordinate[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

export const INITIAL_DIRECTION = 'UP'; // Using string to match enum but avoid circular dependency issues in imports if any
