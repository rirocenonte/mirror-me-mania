import { useCallback, useRef } from 'react';

interface GameSounds {
  move: () => void;
  success: () => void;
  collision: () => void;
  target: () => void;
}

export const useGameAudio = (): GameSounds => {
  const audioContext = useRef<AudioContext | null>(null);
  const isMuted = useRef(false);

  // Initialize audio context on first use
  const getAudioContext = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  }, []);

  // Generate tone using Web Audio API
  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (isMuted.current) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context can't be created
      console.warn('Audio playback failed:', error);
    }
  }, [getAudioContext]);

  const move = useCallback(() => {
    playTone(220, 0.1, 'square'); // Low beep for movement
  }, [playTone]);

  const success = useCallback(() => {
    // Victory chord progression
    playTone(262, 0.2); // C
    setTimeout(() => playTone(330, 0.2), 100); // E
    setTimeout(() => playTone(392, 0.3), 200); // G
  }, [playTone]);

  const collision = useCallback(() => {
    playTone(150, 0.3, 'sawtooth'); // Harsh collision sound
  }, [playTone]);

  const target = useCallback(() => {
    playTone(440, 0.15, 'triangle'); // Pleasant target sound
  }, [playTone]);

  return { move, success, collision, target };
};