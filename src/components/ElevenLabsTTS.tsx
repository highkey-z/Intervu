'use client';

import { useState, useEffect, useRef } from 'react';
import { generateSpeech, getCachedAudioUrl, setCachedAudioUrl, getAllVoices, getVoiceById } from '@/lib/elevenlabs-tts';
import AudioVisualizer from './AudioVisualizer';

interface ElevenLabsTTSProps {
  text: string;
  className?: string;
  autoSpeak?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
}

export default function ElevenLabsTTS({ text, className = '', autoSpeak = true, onPlay, onStop }: ElevenLabsTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState('matilda'); // Default to Matilda
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);

  const voices = getAllVoices();

  useEffect(() => {
    // We don't need to check for API key here since SmartTTS already verified it
    setHasApiKey(true);
  }, []);

  useEffect(() => {
    if (autoSpeak && text && hasApiKey) {
      // Clear any existing audio when text or voice changes
      setAudioUrl(null);
      setError(null);
      setIsPlaying(false);
      
      const timer = setTimeout(() => {
        generateAndPlayAudio();
      }, 1000); // Increased delay to ensure everything is ready
      return () => clearTimeout(timer);
    }
  }, [text, autoSpeak, hasApiKey, selectedVoiceId]);

  const generateAndPlayAudio = async () => {
    if (!text || !hasApiKey) return;

    setIsLoading(true);
    setError(null);
    setHasAttemptedPlay(false);

    try {
      // Generate new audio (don't use cache for voice switching to ensure fresh audio)
      const voice = getVoiceById(selectedVoiceId);
      if (!voice) {
        setError('Invalid voice selected');
        setIsLoading(false);
        return;
      }

      const result = await generateSpeech({
        text,
        voiceId: selectedVoiceId, // This will be resolved by the helper function
        modelId: 'eleven_multilingual_v2',
        voiceSettings: {
          stability: 0.5,
          similarityBoost: 0.8,
          style: 0.2,
          useSpeakerBoost: true
        }
      });

      if (result.success && result.audioUrl) {
        setAudioUrl(result.audioUrl);
        setCachedAudioUrl(text, selectedVoiceId, result.audioUrl);
        // Clear any previous errors before playing
        setError(null);
        setHasAttemptedPlay(true);
        // Auto-play the audio immediately after generation
        playAudio(result.audioUrl);
      } else {
        setError(result.error || 'Failed to generate speech');
      }
    } catch (err) {
      console.error('TTS Error:', err);
      if (err instanceof Error && err.message.includes('quota_exceeded')) {
        setError('ElevenLabs quota exceeded. Please try again later or use browser TTS.');
      } else {
        setError('Failed to generate speech');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onplay = () => {
      setIsPlaying(true);
      setError(null); // Clear any previous errors when audio starts playing
      onPlay?.();
    };
    audio.onended = () => {
      setIsPlaying(false);
      onStop?.();
    };
    audio.onerror = () => {
      setIsPlaying(false);
      // Only show error if we actually attempted to play and it was supposed to auto-play
      if (hasAttemptedPlay && autoSpeak) {
        setError('Failed to play audio');
      }
    };

    audio.play().catch(err => {
      console.error('Audio play error:', err);
      // Only show error if we actually attempted to play and it was supposed to auto-play
      if (hasAttemptedPlay && autoSpeak) {
        setError('Failed to play audio');
      }
      setIsPlaying(false);
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      onStop?.();
    }
  };

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoiceId(voiceId);
    setShowVoiceSelector(false);
    
    // Clear current audio and let useEffect handle the new voice generation
    setAudioUrl(null);
    setError(null);
    setIsPlaying(false);
    setHasAttemptedPlay(false);
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (!hasApiKey) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">⚠️</span>
            <div>
              <p className="text-sm font-medium text-yellow-800">Premium TTS Not Available</p>
              <p className="text-xs text-yellow-700">Add ELEVENLABS_API_KEY to enable high-quality voices</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedVoice = getVoiceById(selectedVoiceId) || voices[0];

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {/* Voice Selector and Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowVoiceSelector(!showVoiceSelector)}
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors text-sm border border-gray-200 dark:border-gray-600"
          title="Select voice"
        >
          <span className="font-medium">{selectedVoice.name}</span>
          <span className="text-xs">{showVoiceSelector ? '▲' : '▼'}</span>
        </button>
        
        {isLoading ? (
          <button
            disabled
            className="flex items-center space-x-2 bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-not-allowed"
          >
            <span className="text-lg animate-spin">⏳</span>
            <span className="text-sm font-medium">Generating...</span>
          </button>
        ) : isPlaying ? (
          <button
            onClick={stopAudio}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            title="Stop speaking"
          >
            <span className="text-lg">⏹️</span>
            <span className="text-sm font-medium">Stop</span>
          </button>
        ) : (
          <button
            onClick={generateAndPlayAudio}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            title="Generate and play speech"
          >
            <span className="text-lg">🎵</span>
            <span className="text-sm font-medium">Speak</span>
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-red-600">❌</span>
            <div className="flex-1">
              <p className="text-sm text-red-800">{error}</p>
              {error.includes('quota_exceeded') && (
                <p className="text-xs text-red-700 mt-1">
                  The system will automatically fall back to browser TTS for the next question.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Voice Options Dropdown */}
      {showVoiceSelector && (
        <div className="bg-surface border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 space-y-2 max-h-80 overflow-y-auto">
          <h4 className="font-medium text-primary mb-2">Choose Your Voice:</h4>
          <p className="text-xs text-secondary mb-3">Powered by ElevenLabs</p>
          
          <div className="grid grid-cols-1 gap-2">
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => handleVoiceChange(voice.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedVoiceId === voice.id
                    ? 'bg-purple-50 dark:bg-purple-900 border-2 border-purple-200 dark:border-purple-700'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-primary">{voice.name}</div>
                    <div className="text-sm text-secondary">{voice.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {voice.accent} • {voice.gender}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Audio Visualizer */}
      <AudioVisualizer
        isPlaying={isPlaying}
        audioElement={audioRef.current}
        className="mt-2"
      />

      {/* Hidden Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="none"
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
}
