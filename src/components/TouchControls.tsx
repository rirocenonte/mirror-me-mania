import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Direction } from '../types/game';
import { cn } from '@/lib/utils';

interface TouchControlsProps {
  onMove: (direction: Direction) => void;
  disabled: boolean;
}

export const TouchControls = ({ onMove, disabled }: TouchControlsProps) => {
  const handleTouch = (direction: Direction) => {
    if (!disabled) {
      onMove(direction);
    }
  };

  const buttonClass = cn(
    "w-14 h-14 rounded-full transition-all duration-200 active:scale-95",
    "bg-card/80 backdrop-blur-sm border-2 border-border",
    "hover:bg-primary/10 hover:border-primary/30",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "flex items-center justify-center",
    "shadow-lg"
  );

  return (
    <div className="p-4 bg-card/30 backdrop-blur-sm border-t border-border">
      <div className="max-w-sm mx-auto">
        {/* Instructions */}
        <div className="text-center text-xs text-muted-foreground mb-4">
          Move to make both characters reach their targets
        </div>
        
        {/* Touch control layout */}
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-fit mx-auto">
          {/* Empty */}
          <div />
          
          {/* Up */}
          <Button
            className={buttonClass}
            onClick={() => handleTouch('up')}
            disabled={disabled}
            size="sm"
          >
            <ArrowUp className="w-6 h-6 text-foreground" />
          </Button>
          
          {/* Empty */}
          <div />
          
          {/* Left */}
          <Button
            className={buttonClass}
            onClick={() => handleTouch('left')}
            disabled={disabled}
            size="sm"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Button>
          
          {/* Center info */}
          <div className="flex flex-col items-center justify-center text-xs text-muted-foreground">
            <div className="w-1 h-6 bg-mirror-line/50 mb-1" />
            <span>Mirror</span>
          </div>
          
          {/* Right */}
          <Button
            className={buttonClass}
            onClick={() => handleTouch('right')}
            disabled={disabled}
            size="sm"
          >
            <ArrowRight className="w-6 h-6 text-foreground" />
          </Button>
          
          {/* Empty */}
          <div />
          
          {/* Down */}
          <Button
            className={buttonClass}
            onClick={() => handleTouch('down')}
            disabled={disabled}
            size="sm"
          >
            <ArrowDown className="w-6 h-6 text-foreground" />
          </Button>
          
          {/* Empty */}
          <div />
        </div>

        {/* Alternative touch zones for easier mobile play */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Tip: Use keyboard arrows on desktop
        </div>
      </div>
    </div>
  );
};