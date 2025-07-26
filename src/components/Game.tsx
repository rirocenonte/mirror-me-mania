import { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameHUD } from './GameHUD';
import { TouchControls } from './TouchControls';
import { GameOverlay } from './GameOverlay';
import { ParticleEffect } from './ParticleEffect';
import { levels } from '../data/levels';
import { Position, GameState, Direction } from '../types/game';
import { useToast } from '@/hooks/use-toast';
import { useGameAudio } from '../hooks/useGameAudio';

export const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 1, y: 5 });
  const [mirrorPosition, setMirrorPosition] = useState<Position>({ x: 8, y: 5 });
  const [gameState, setGameState] = useState<GameState>('menu');
  const [isMoving, setIsMoving] = useState(false);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [showParticles, setShowParticles] = useState(false);
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();
  const audio = useGameAudio();

  const level = levels[currentLevel];

  // Reset positions when level changes (but not on initial load)
  useEffect(() => {
    setPlayerPosition(level.playerStart);
    setMirrorPosition(level.mirrorStart);
    // Only set to playing if we're not in menu state
    if (gameState !== 'menu') {
      setGameState('playing');
      setLevelStartTime(Date.now());
    }
  }, [currentLevel, level]);

  // Check win condition
  useEffect(() => {
    if (gameState === 'playing') {
      const playerOnTarget = 
        playerPosition.x === level.playerTarget.x && 
        playerPosition.y === level.playerTarget.y;
      
      const mirrorOnTarget = 
        mirrorPosition.x === level.mirrorTarget.x && 
        mirrorPosition.y === level.mirrorTarget.y;

      if (playerOnTarget && mirrorOnTarget) {
        setGameState('won');
        const completionTime = Date.now() - levelStartTime;
        
        // Play success sound and show particles
        audio.success();
        setParticlePosition({ 
          x: window.innerWidth / 2, 
          y: window.innerHeight / 2 
        });
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
        
        // Save progress to localStorage
        const progress = JSON.parse(localStorage.getItem('mirrorMe-progress') || '{}');
        progress[currentLevel] = {
          completed: true,
          bestTime: Math.min(progress[currentLevel]?.bestTime || completionTime, completionTime)
        };
        localStorage.setItem('mirrorMe-progress', JSON.stringify(progress));

        toast({
          title: level.successMessage,
          description: `Completed in ${Math.round(completionTime / 1000)}s`,
        });
      }
    }
  }, [playerPosition, mirrorPosition, level, gameState, levelStartTime, toast]);

  const isValidPosition = useCallback((pos: Position): boolean => {
    if (pos.x < 0 || pos.x >= 10 || pos.y < 0 || pos.y >= 8) return false;
    
    // Check for walls
    return !level.walls.some(wall => wall.x === pos.x && wall.y === pos.y);
  }, [level.walls]);

  const moveCharacter = useCallback((direction: Direction) => {
    if (isMoving || gameState !== 'playing') return;

    setIsMoving(true);

    let newPlayerPos = { ...playerPosition };
    let newMirrorPos = { ...mirrorPosition };

    // Player movement
    switch (direction) {
      case 'left':
        newPlayerPos.x -= 1;
        break;
      case 'right':
        newPlayerPos.x += 1;
        break;
      case 'up':
        newPlayerPos.y -= 1;
        break;
      case 'down':
        newPlayerPos.y += 1;
        break;
    }

    // Mirror does opposite horizontally, same vertically
    switch (direction) {
      case 'left':
        newMirrorPos.x += 1; // Opposite
        break;
      case 'right':
        newMirrorPos.x -= 1; // Opposite
        break;
      case 'up':
        newMirrorPos.y -= 1; // Same
        break;
      case 'down':
        newMirrorPos.y += 1; // Same
        break;
    }

    // Validate moves
    const playerCanMove = isValidPosition(newPlayerPos);
    const mirrorCanMove = isValidPosition(newMirrorPos);

    if (playerCanMove && mirrorCanMove) {
      setPlayerPosition(newPlayerPos);
      setMirrorPosition(newMirrorPos);
      audio.move();
    } else {
      // Collision - shake effect and sound
      setGameState('collision');
      audio.collision();
      setTimeout(() => setGameState('playing'), 500);
    }

    setTimeout(() => setIsMoving(false), 300);
  }, [playerPosition, mirrorPosition, isMoving, gameState, isValidPosition]);

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setGameState('gameComplete');
    }
  };

  const restartLevel = () => {
    setPlayerPosition(level.playerStart);
    setMirrorPosition(level.mirrorStart);
    setGameState('playing');
    setLevelStartTime(Date.now());
  };

  const goToMenu = () => {
    setGameState('menu');
  };

  // Game event listeners
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      e.preventDefault();
      switch (e.key) {
        case 'ArrowLeft':
          moveCharacter('left');
          break;
        case 'ArrowRight':
          moveCharacter('right');
          break;
        case 'ArrowUp':
          moveCharacter('up');
          break;
        case 'ArrowDown':
          moveCharacter('down');
          break;
        case 'r':
          restartLevel();
          break;
        case 'Escape':
          goToMenu();
          break;
      }
    };

    const handleStartGame = () => {
      setGameState('playing');
      setLevelStartTime(Date.now());
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('startGame', handleStartGame);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('startGame', handleStartGame);
    };
  }, [moveCharacter, gameState]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Game HUD */}
      <GameHUD 
        level={currentLevel + 1}
        totalLevels={levels.length}
        onRestart={restartLevel}
        onMenu={goToMenu}
      />

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <GameBoard
          level={level}
          playerPosition={playerPosition}
          mirrorPosition={mirrorPosition}
          gameState={gameState}
        />
      </div>

      {/* Touch Controls */}
      <TouchControls 
        onMove={moveCharacter}
        disabled={isMoving || gameState !== 'playing'}
      />

      {/* Game Overlays */}
      <GameOverlay
        gameState={gameState}
        currentLevel={currentLevel + 1}
        onNextLevel={nextLevel}
        onRestart={restartLevel}
        onMenu={goToMenu}
        levelName={level.name}
      />

      {/* Particle Effects */}
      <ParticleEffect
        active={showParticles}
        x={particlePosition.x}
        y={particlePosition.y}
        color="gold"
        count={12}
      />
    </div>
  );
};