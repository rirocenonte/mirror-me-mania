import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    name: "Tutorial",
    playerStart: { x: 1, y: 6 },
    mirrorStart: { x: 8, y: 6 },
    playerTarget: { x: 1, y: 1 },
    mirrorTarget: { x: 8, y: 1 },
    walls: [
      // Left boundary
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, 
      { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 },
      // Right boundary  
      { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 },
      { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 },
      // Top boundary
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, 
      { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
      // Bottom boundary
      { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, 
      { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
    ],
    successMessage: "You discovered the mirror!"
  },
  {
    id: 2,
    name: "The Gap",
    playerStart: { x: 1, y: 6 },
    mirrorStart: { x: 8, y: 6 },
    playerTarget: { x: 3, y: 1 },
    mirrorTarget: { x: 6, y: 1 },
    walls: [
      // Boundaries
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, 
      { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 },
      { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 },
      { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 },
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, 
      { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
      { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, 
      { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
      // Gap on player side
      { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 4 },
      { x: 3, y: 3 }, { x: 3, y: 4 },
    ],
    successMessage: "Nice! You figured out the reverse logic!"
  },
  {
    id: 3,
    name: "Button Puzzle",
    playerStart: { x: 1, y: 6 },
    mirrorStart: { x: 8, y: 6 },
    playerTarget: { x: 2, y: 3 },
    mirrorTarget: { x: 7, y: 3 },
    walls: [
      // Boundaries
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, 
      { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 },
      { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 },
      { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 },
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, 
      { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
      { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, 
      { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
      // Central obstacles
      { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 },
      { x: 1, y: 5 }, { x: 8, y: 5 },
    ],
    successMessage: "Perfect coordination!"
  },
  {
    id: 4,
    name: "Timing Challenge",
    playerStart: { x: 1, y: 6 },
    mirrorStart: { x: 8, y: 6 },
    playerTarget: { x: 3, y: 2 },
    mirrorTarget: { x: 6, y: 2 },
    walls: [
      // Boundaries
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, 
      { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 },
      { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 },
      { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 },
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, 
      { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
      { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, 
      { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
      // Moving platform obstacles
      { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 },
      { x: 1, y: 3 }, { x: 8, y: 3 },
    ],
    platforms: [
      { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }
    ],
    successMessage: "Excellent timing!"
  },
  {
    id: 5,
    name: "The Swap",
    playerStart: { x: 1, y: 6 },
    mirrorStart: { x: 8, y: 6 },
    playerTarget: { x: 8, y: 1 },
    mirrorTarget: { x: 1, y: 1 },
    walls: [
      // Boundaries
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, 
      { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 },
      { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 },
      { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 },
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, 
      { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
      { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, 
      { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
      // Complex maze
      { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
      { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
      { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 8, y: 3 }, { x: 8, y: 4 },
    ],
    successMessage: "Master of mirrors! You've solved the ultimate puzzle!"
  }
];