import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GameState } from '../types/game';
import { Play, RotateCcw, Home, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameOverlayProps {
  gameState: GameState;
  currentLevel: number;
  onNextLevel: () => void;
  onRestart: () => void;
  onMenu: () => void;
  levelName: string;
}

export const GameOverlay = ({ 
  gameState, 
  currentLevel, 
  onNextLevel, 
  onRestart, 
  onMenu, 
  levelName 
}: GameOverlayProps) => {
  if (gameState === 'playing' || gameState === 'collision') {
    return null;
  }

  const renderOverlay = () => {
    switch (gameState) {
      case 'won':
        return (
          <Card className="w-full max-w-sm mx-4 animate-scale-in bg-card/95 backdrop-blur-lg border-primary/30">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <Trophy className="w-12 h-12 text-target-glow animate-success" />
                  <Sparkles className="w-6 h-6 text-target-glow absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-player-blue to-mirror-pink bg-clip-text text-transparent">
                Level Complete!
              </CardTitle>
              <CardDescription className="text-foreground/80">
                {levelName} mastered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={onNextLevel}
                className="w-full bg-gradient-to-r from-player-blue to-mirror-pink hover:opacity-90 text-black font-medium"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Next Level
              </Button>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={onRestart}
                  className="flex-1"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Retry
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onMenu}
                  className="flex-1"
                  size="sm"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'gameComplete':
        return (
          <Card className="w-full max-w-sm mx-4 animate-scale-in bg-card/95 backdrop-blur-lg border-target-glow/50">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="relative animate-glow">
                  <Trophy className="w-16 h-16 text-target-glow" />
                  <Sparkles className="w-8 h-8 text-target-glow absolute -top-2 -right-2 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-player-blue absolute -bottom-1 -left-1 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-mirror-pink absolute -bottom-1 -right-1 animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-player-blue via-target-glow to-mirror-pink bg-clip-text text-transparent">
                Game Complete!
              </CardTitle>
              <CardDescription className="text-foreground/80">
                You've mastered all {currentLevel} levels!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center py-4">
                <div className="text-lg font-semibold text-target-glow mb-2">🏆 Mirror Master 🏆</div>
                <div className="text-sm text-muted-foreground">
                  Share your achievement and challenge your friends!
                </div>
              </div>
              <Button 
                onClick={() => {
                  // Share functionality would go here
                  navigator.share?.({
                    title: 'Mirror Me - Puzzle Game',
                    text: `I just completed all ${currentLevel} levels of Mirror Me! Can you beat this mind-bending puzzle game?`,
                    url: window.location.href
                  }).catch(() => {
                    // Fallback for browsers without share API
                    navigator.clipboard?.writeText(window.location.href);
                  });
                }}
                className="w-full bg-gradient-to-r from-player-blue to-mirror-pink hover:opacity-90 text-black font-medium"
                size="lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Share Victory
              </Button>
              <Button 
                variant="outline" 
                onClick={onMenu}
                className="w-full"
                size="sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </CardContent>
          </Card>
        );

      case 'menu':
        return (
          <Card className="w-full max-w-sm mx-4 animate-scale-in bg-card/95 backdrop-blur-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-player-blue to-mirror-pink bg-clip-text text-transparent mb-2">
                Mirror Me
              </CardTitle>
              <CardDescription>
                Control the blue square. The pink square mirrors your moves!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-player-blue rounded-sm" />
                    <span>Player</span>
                  </div>
                  <div className="w-px h-4 bg-mirror-line" />
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-mirror-pink rounded-sm" />
                    <span>Mirror</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Get both characters to their target zones
                </div>
              </div>
              <Button 
                onClick={() => {
                  // Start the game by setting state to playing
                  const startGame = new CustomEvent('startGame');
                  window.dispatchEvent(startGame);
                }}
                className="w-full bg-gradient-to-r from-player-blue to-mirror-pink hover:opacity-90 text-black font-medium"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Game
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50",
      "animate-fade-in"
    )}>
      {renderOverlay()}
    </div>
  );
};