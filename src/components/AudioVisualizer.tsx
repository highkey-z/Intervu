'use client';

import { useState, useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLAudioElement | null;
  className?: string;
}

export default function AudioVisualizer({ isPlaying, audioElement, className = '' }: AudioVisualizerProps) {
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    if (!isPlaying || !audioElement) {
      setBarHeights([]);
      return;
    }

    // Create audio context and analyser
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!analyser || !dataArray) return;

    // Connect audio element to analyser
    const source = audioContextRef.current.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContextRef.current.destination);

    const animate = () => {
      if (!isPlaying) return;

      analyser.getByteFrequencyData(new Uint8Array(dataArray));
      
      // Create bar heights from frequency data
      const barCount = 12;
      const newHeights: number[] = [];
      
      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * dataArray.length);
        const value = dataArray[dataIndex];
        const height = Math.max(4, (value / 255) * 60);
        newHeights.push(height);
      }
      
      setBarHeights(newHeights);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioElement]);

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div className="w-full h-20 transition-opacity duration-300 flex items-end justify-center space-x-1">
        {isPlaying && barHeights.length > 0 ? (
          barHeights.map((height, i) => (
            <div
              key={i}
              className="w-2 rounded-full transition-all duration-50 bg-white dark:bg-gray-200"
              style={{
                height: `${height}px`,
                minHeight: '4px'
              }}
            />
          ))
        ) : (
          // Idle animation
          Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="w-1 bg-white/50 dark:bg-gray-400/50 rounded-full animate-pulse"
              style={{
                height: `${6 + Math.abs(i - 3) * 3}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}