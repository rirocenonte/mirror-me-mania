export interface Position {
  x: number;
  y: number;
}

export interface Wall {
  x: number;
  y: number;
}

export interface Platform {
  x: number;
  y: number;
  width?: number;
}

export interface Level {
  id: number;
  name: string;
  playerStart: Position;
  mirrorStart: Position;
  playerTarget: Position;
  mirrorTarget: Position;
  walls: Wall[];
  platforms?: Platform[];
  successMessage: string;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameState = 'menu' | 'playing' | 'won' | 'lost' | 'collision' | 'gameComplete';

export interface GameProgress {
  [levelId: number]: {
    completed: boolean;
    bestTime: number;
  };
}