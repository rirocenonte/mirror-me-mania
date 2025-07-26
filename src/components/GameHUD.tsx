import { Button } from '@/components/ui/button';
import { RotateCcw, Menu, Home } from 'lucide-react';

interface GameHUDProps {
  level: number;
  totalLevels: number;
  onRestart: () => void;
  onMenu: () => void;
}

export const GameHUD = ({ level, totalLevels, onRestart, onMenu }: GameHUDProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-border">
      {/* Left side - Restart button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onRestart}
        className="flex items-center space-x-2 hover:bg-primary/10"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="hidden sm:inline">Restart</span>
      </Button>

      {/* Center - Level indicator */}
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-player-blue to-mirror-pink bg-clip-text text-transparent">
          Mirror Me
        </h1>
        <div className="text-sm text-muted-foreground">
          Level {level} of {totalLevels}
        </div>
        
        {/* Progress bar */}
        <div className="w-32 h-1 bg-muted rounded-full mt-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-player-blue to-mirror-pink transition-all duration-500"
            style={{ width: `${(level / totalLevels) * 100}%` }}
          />
        </div>
      </div>

      {/* Right side - Menu button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onMenu}
        className="flex items-center space-x-2 hover:bg-primary/10"
      >
        <Menu className="w-4 h-4" />
        <span className="hidden sm:inline">Menu</span>
      </Button>
    </div>
  );
};