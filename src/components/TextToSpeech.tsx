'use client';

import { useState, useEffect, useRef } from 'react';

interface TextToSpeechProps {
  text: string;
  className?: string;
  autoSpeak?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
}

// Human-like voice configurations with advanced natural speech patterns
const NATURAL_VOICES = [
  {
    id: 'matilda',
    name: 'Matilda - Premium Female',
    description: 'Professional, clear, and engaging interviewer voice',
    settings: { 
      rate: 0.8, 
      pitch: 1.1, 
      volume: 0.9, 
      lang: 'en-US',
      // Advanced human-like parameters
      pauseMultiplier: 1.25,
      emphasisWords: ['important', 'key', 'crucial', 'significant'],
      breathingPattern: true
    },
    voiceNames: ['Samantha', 'Karen', 'Microsoft Zira Desktop', 'Google US English Female', 'Tessa']
  },
  {
    id: 'alex',
    name: 'Alex - Human Male',
    description: 'Natural, conversational, like a real interviewer',
    settings: { 
      rate: 0.75, 
      pitch: 1.0, 
      volume: 0.85, 
      lang: 'en-US',
      // Advanced human-like parameters
      pauseMultiplier: 1.3,
      emphasisWords: ['important', 'key', 'crucial', 'significant'],
      breathingPattern: true
    },
    voiceNames: ['Alex', 'Daniel', 'Microsoft David Desktop', 'Google US English Male', 'Veena']
  },
  {
    id: 'samantha',
    name: 'Samantha - Human Female',
    description: 'Warm, natural, like talking to a friend',
    settings: { 
      rate: 0.8, 
      pitch: 1.1, 
      volume: 0.9, 
      lang: 'en-US',
      pauseMultiplier: 1.2,
      emphasisWords: ['great', 'excellent', 'wonderful', 'amazing'],
      breathingPattern: true
    },
    voiceNames: ['Samantha', 'Karen', 'Microsoft Zira Desktop', 'Google US English Female', 'Tessa']
  },
  {
    id: 'victoria',
    name: 'Victoria - Professional Human',
    description: 'Confident but natural, like a senior manager',
    settings: { 
      rate: 0.7, 
      pitch: 1.05, 
      volume: 0.9, 
      lang: 'en-US',
      pauseMultiplier: 1.4,
      emphasisWords: ['leadership', 'strategy', 'vision', 'results'],
      breathingPattern: true
    },
    voiceNames: ['Victoria', 'Moira', 'Microsoft Hazel Desktop', 'Google UK English Female', 'Susan']
  },
  {
    id: 'daniel',
    name: 'Daniel - Casual Human',
    description: 'Relaxed, natural, like a startup founder',
    settings: { 
      rate: 0.85, 
      pitch: 1.15, 
      volume: 0.8, 
      lang: 'en-US',
      pauseMultiplier: 1.1,
      emphasisWords: ['cool', 'awesome', 'interesting', 'exciting'],
      breathingPattern: true
    },
    voiceNames: ['Daniel', 'Alex', 'Microsoft David Desktop', 'Google UK English Male', 'Rishi']
  },
  {
    id: 'fiona',
    name: 'Fiona - Articulate Human',
    description: 'Clear, natural, like a skilled communicator',
    settings: { 
      rate: 0.78, 
      pitch: 1.08, 
      volume: 0.88, 
      lang: 'en-US',
      pauseMultiplier: 1.25,
      emphasisWords: ['precisely', 'exactly', 'specifically', 'clearly'],
      breathingPattern: true
    },
    voiceNames: ['Fiona', 'Tessa', 'Veena', 'Microsoft Susan Desktop', 'Karen']
  }
];

export default function TextToSpeech({ text, className = '', autoSpeak = true, onPlay, onStop }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState('matilda'); // Default to Matilda
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    // Load voices when they become available
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Voices are loaded
        return;
      }
    };
    
    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (autoSpeak && isSupported && text) {
      // Small delay to ensure the component is ready
      const timer = setTimeout(() => {
        speak();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [text, autoSpeak, isSupported]);

  // Advanced human-like text processing
  const processTextForHumanSpeech = (text: string, voiceConfig: any): string => {
    let processedText = text;
    
    // 1. Add natural breathing pauses (like humans do)
    processedText = processedText
      .replace(/(\w+)\s+(\w+)\s+(\w+)/g, '$1 $2 $3') // Natural word spacing
      .replace(/,/g, ', ') // Pause after commas
      .replace(/\./g, '. ') // Longer pause after periods
      .replace(/\?/g, '? ') // Pause after questions
      .replace(/!/g, '! ') // Pause after exclamations
      .replace(/:/g, ': ') // Pause after colons
      .replace(/;/g, '; ') // Pause after semicolons
      .replace(/\s+/g, ' '); // Clean up spaces
    
    // 2. Add emphasis to important words (human-like stress)
    voiceConfig.settings.emphasisWords.forEach((word: string) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      processedText = processedText.replace(regex, `*${word}*`); // Mark for emphasis
    });
    
    // 3. Add natural speech rhythm variations
    processedText = processedText
      .replace(/\b(well|so|um|you know|actually|basically)\b/gi, '$1... ') // Natural fillers
      .replace(/\b(and|but|or)\b/gi, '$1 ') // Natural connectors
      .replace(/\b(this|that|these|those)\b/gi, '$1 ') // Natural demonstratives
    
    // 4. Add breathing patterns (subtle pauses)
    if (voiceConfig.settings.breathingPattern) {
      processedText = processedText
        .replace(/(\w{4,})\s+(\w{4,})\s+(\w{4,})/g, '$1 $2 $3 ') // Add micro-pauses
        .replace(/(\w+)\s+(\w+)\s+(\w+)\s+(\w+)\s+(\w+)/g, '$1 $2 $3 $4 $5 '); // Longer phrases
    }
    
    return processedText;
  };

  const speak = () => {
    if (!isSupported || !text) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get the selected voice configuration
    const selectedVoiceConfig = NATURAL_VOICES.find(v => v.id === selectedVoiceId) || NATURAL_VOICES[0];
    
    // Get available voices and select the best match
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;
    
    // Try to find a voice that matches the selected configuration
    for (const voiceName of selectedVoiceConfig.voiceNames) {
      const voice = voices.find(v => v.name === voiceName);
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    // If no exact match, find the best available English voice
    if (!selectedVoice) {
      const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
      
      // Prioritize high-quality voices
      const priorityVoices = englishVoices.filter(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Fiona')
      );
      
      if (priorityVoices.length > 0) {
        selectedVoice = priorityVoices[0];
      } else if (englishVoices.length > 0) {
        selectedVoice = englishVoices[0];
      }
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Apply human-like voice settings
    utterance.rate = selectedVoiceConfig.settings.rate;
    utterance.pitch = selectedVoiceConfig.settings.pitch;
    utterance.volume = selectedVoiceConfig.settings.volume;
    utterance.lang = selectedVoiceConfig.settings.lang;
    
    // Process text for natural human speech
    const humanText = processTextForHumanSpeech(text, selectedVoiceConfig);
    utterance.text = humanText;

    // Add natural speech variations
    utterance.onstart = () => {
      setIsPlaying(true);
      onPlay?.(); // Call the onPlay callback
      // Add subtle pitch variation during speech (like humans do)
      if (utterance.voice) {
        const originalPitch = utterance.pitch;
        // Simulate natural pitch variation
        setTimeout(() => {
          utterance.pitch = originalPitch * 1.05; // Slight pitch up
        }, 1000);
        setTimeout(() => {
          utterance.pitch = originalPitch * 0.95; // Slight pitch down
        }, 2000);
        setTimeout(() => {
          utterance.pitch = originalPitch; // Back to normal
        }, 3000);
      }
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      onStop?.(); // Call the onStop callback
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      onStop?.(); // Call the onStop callback
    };

    utteranceRef.current = utterance;
    
    // Add a small delay before speaking (like humans do)
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    onStop?.(); // Call the onStop callback
  };

  const repeat = () => {
    speak();
  };

  if (!isSupported) {
    return (
      <div className={`text-sm text-gray-500 text-center ${className}`}>
        Text-to-speech not supported in this browser
      </div>
    );
  }

  const selectedVoice = NATURAL_VOICES.find(v => v.id === selectedVoiceId) || NATURAL_VOICES[0];

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {/* Voice Selector */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowVoiceSelector(!showVoiceSelector)}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
          title="Select voice"
        >
          <span className="text-lg">🎤</span>
          <span className="font-medium">{selectedVoice.name}</span>
          <span className="text-xs">{showVoiceSelector ? '▲' : '▼'}</span>
        </button>
        
        {isPlaying ? (
          <button
            onClick={stop}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            title="Stop speaking"
          >
            <span className="text-lg">⏹️</span>
            <span className="text-sm font-medium">Stop</span>
          </button>
        ) : (
          <button
            onClick={repeat}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            title="Repeat question"
          >
            <span className="text-lg">🔊</span>
            <span className="text-sm font-medium">Repeat</span>
          </button>
        )}
      </div>

      {/* Voice Options Dropdown */}
      {showVoiceSelector && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-2">
          <h4 className="font-medium text-gray-900 mb-2">🎭 Choose Your Human Voice:</h4>
          <p className="text-xs text-gray-500 mb-3">These voices are designed to sound like real people, not robots!</p>
          {NATURAL_VOICES.map((voice) => (
            <button
              key={voice.id}
              onClick={() => {
                setSelectedVoiceId(voice.id);
                setShowVoiceSelector(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedVoiceId === voice.id
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="font-medium text-gray-900">{voice.name}</div>
              <div className="text-sm text-gray-600">{voice.description}</div>
              <div className="text-xs text-green-600 mt-1">✨ Human-like speech patterns</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
