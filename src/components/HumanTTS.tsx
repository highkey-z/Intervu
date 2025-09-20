'use client';

import { useState, useEffect, useRef } from 'react';
import AudioVisualizer from './AudioVisualizer';

interface HumanTTSProps {
  text: string;
  className?: string;
  autoSpeak?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
}

export default function HumanTTS({ text, className = '', autoSpeak = true, onPlay, onStop }: HumanTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Get available voices
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      setAllVoices(availableVoices);
      
      // Debug: Log all available voices
      console.log('All available voices:', availableVoices.map(v => v.name));
      
      // Set Google US English as default
      const targetVoices = availableVoices.filter(voice => 
        voice.name === 'Google US English' ||
        voice.name === 'Google UK English Female' ||
        voice.name === 'Google UK English Male'
      );
      
      if (targetVoices.length > 0) {
        const googleUS = targetVoices.find(voice => voice.name === 'Google US English');
        if (googleUS) {
          setSelectedVoice(googleUS.name);
        } else {
          setSelectedVoice(targetVoices[0].name);
        }
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    
    // Load voices when they become available
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    if (autoSpeak && text && selectedVoice) {
      const timer = setTimeout(() => {
        speakText();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [text, autoSpeak, selectedVoice]);

  const speakText = () => {
    if (!text || !selectedVoice) return;

    setIsLoading(true);
    setError(null);

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Find the selected voice
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    // Configure for most human-like speech
    utterance.rate = 0.9; // Slightly slower for more natural speech
    utterance.pitch = 1.1; // Slightly higher pitch for more human-like sound
    utterance.volume = 0.9; // Good volume level

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
      onPlay?.();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onStop?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsLoading(false);
      onStop?.();
    };

    try {
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
      setIsLoading(false);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    onStop?.();
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    setShowVoiceSelector(false);
  };

  // Show ONLY the 3 specific voices from the image
  const humanVoices = voices.filter(voice => 
    voice.name === 'Google US English' ||
    voice.name === 'Google UK English Female' ||
    voice.name === 'Google UK English Male'
  );

  const selectedVoiceObj = voices.find(v => v.name === selectedVoice);

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {/* Voice Selector and Controls */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setShowVoiceSelector(!showVoiceSelector)}
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors text-sm border border-gray-200 dark:border-gray-600"
          title="Select voice"
        >
          <span className="font-medium">{selectedVoiceObj?.name || 'Select Voice'}</span>
          <span className="text-xs">{showVoiceSelector ? '▲' : '▼'}</span>
        </button>
        
        {isLoading ? (
          <button
            disabled
            className="flex items-center space-x-2 bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-not-allowed"
          >
            <span className="text-lg animate-spin">⏳</span>
            <span className="text-sm font-medium">Speaking...</span>
          </button>
        ) : isPlaying ? (
          <button
            onClick={stopSpeaking}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-300 dark:hover:bg-gray-400 text-white dark:text-gray-800 px-4 py-2 rounded-lg transition-colors"
            title="Stop speaking"
          >
            <span className="text-sm font-medium">Stop</span>
          </button>
        ) : (
          <button
            onClick={speakText}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-800 px-4 py-2 rounded-lg transition-colors"
            title="Speak text"
          >
            <span className="text-sm font-medium">Speak</span>
          </button>
        )}
      </div>

      {/* Error Display - REMOVED */}

      {/* Voice Options Dropdown */}
      {showVoiceSelector && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 space-y-2 max-h-80 overflow-y-auto">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Choose Your Voice:</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Google US English, Google UK English Female, or Google UK English Male</p>
          
          <div className="grid grid-cols-1 gap-2">
            {humanVoices.length > 0 ? humanVoices.map((voice) => (
              <button
                key={voice.name}
                onClick={() => handleVoiceChange(voice.name)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedVoice === voice.name
                    ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{voice.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{voice.lang}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {voice.default ? 'Default' : 'Available'}
                    </div>
                  </div>
                </div>
              </button>
            )) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                Google voices not found. Using default voice.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio Visualizer */}
      <AudioVisualizer
        isPlaying={isPlaying}
        className="mt-2"
      />
    </div>
  );
}
