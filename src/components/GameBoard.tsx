import { Level, Position, GameState } from '../types/game';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  level: Level;
  playerPosition: Position;
  mirrorPosition: Position;
  gameState: GameState;
}

export const GameBoard = ({ level, playerPosition, mirrorPosition, gameState }: GameBoardProps) => {
  const gridSize = 10;
  const gridHeight = 8;

  const isWall = (x: number, y: number) => {
    return level.walls.some(wall => wall.x === x && wall.y === y);
  };

  const isPlatform = (x: number, y: number) => {
    return level.platforms?.some(platform => platform.x === x && platform.y === y) || false;
  };

  const isPlayerTarget = (x: number, y: number) => {
    return level.playerTarget.x === x && level.playerTarget.y === y;
  };

  const isMirrorTarget = (x: number, y: number) => {
    return level.mirrorTarget.x === x && level.mirrorTarget.y === y;
  };

  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isPlayerPos = playerPosition.x === x && playerPosition.y === y;
        const isMirrorPos = mirrorPosition.x === x && mirrorPosition.y === y;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={cn(
              "relative border border-border/20 transition-all duration-300",
              {
                // Wall styling
                "bg-wall-color border-wall-color": isWall(x, y),
                // Platform styling
                "bg-platform-color": isPlatform(x, y),
                // Target zones
                "bg-player-blue/20 animate-glow": isPlayerTarget(x, y),
                "bg-mirror-pink/20 animate-glow": isMirrorTarget(x, y),
                // Mirror line
                "border-r-2 border-r-mirror-line": x === 4,
              }
            )}
          >
            {/* Player character */}
            {isPlayerPos && (
              <div 
                className={cn(
                  "absolute inset-1 bg-player-blue rounded-sm shadow-lg transition-all duration-300",
                  "animate-character-move",
                  {
                    "animate-shake": gameState === 'collision',
                    "animate-success": gameState === 'won'
                  }
                )}
                style={{
                  boxShadow: '0 0 10px hsl(var(--player-blue)), 0 0 20px hsl(var(--player-blue))'
                }}
              />
            )}
            
            {/* Mirror character */}
            {isMirrorPos && (
              <div 
                className={cn(
                  "absolute inset-1 bg-mirror-pink rounded-sm shadow-lg transition-all duration-300",
                  "animate-character-move",
                  {
                    "animate-shake": gameState === 'collision',
                    "animate-success": gameState === 'won'
                  }
                )}
                style={{
                  boxShadow: '0 0 10px hsl(var(--mirror-pink)), 0 0 20px hsl(var(--mirror-pink))'
                }}
              />
            )}
            
            {/* Target indicators */}
            {isPlayerTarget(x, y) && (
              <div className="absolute inset-2 border-2 border-player-blue rounded-sm opacity-50" />
            )}
            
            {isMirrorTarget(x, y) && (
              <div className="absolute inset-2 border-2 border-mirror-pink rounded-sm opacity-50" />
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-sm mx-auto">
      {/* Level title */}
      <h2 className="text-xl font-bold text-center text-foreground">
        {level.name}
      </h2>
      
      {/* Game grid */}
      <div 
        className={cn(
          "grid bg-background border-2 border-border rounded-lg overflow-hidden",
          "w-full max-w-[320px] aspect-[5/4]",
          {
            "animate-shake": gameState === 'collision'
          }
        )}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridHeight}, 1fr)`
        }}
      >
        {renderGrid()}
      </div>

      {/* Mirror line indicator */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <div className="w-8 h-0.5 bg-player-blue" />
        <span>Player</span>
        <div className="w-4 h-px bg-mirror-line" />
        <span>Mirror</span>
        <div className="w-8 h-0.5 bg-mirror-pink" />
      </div>
    </div>
  );
};