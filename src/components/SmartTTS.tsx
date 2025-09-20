'use client';

import { useState, useEffect } from 'react';
import ElevenLabsTTS from './ElevenLabsTTS';
import OpenAITTS from './OpenAITTS';
import GoogleTTS from './GoogleTTS';
import AzureTTS from './AzureTTS';
import HumanTTS from './HumanTTS';
import TextToSpeech from './TextToSpeech';

interface SmartTTSProps {
  text: string;
  className?: string;
  autoSpeak?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
}

export default function SmartTTS({ text, className = '', autoSpeak = true, onPlay, onStop }: SmartTTSProps) {
  const [hasElevenLabsKey, setHasElevenLabsKey] = useState(false);
  const [hasOpenAIKey, setHasOpenAIKey] = useState(false);
  const [hasGoogleKey, setHasGoogleKey] = useState(false);
  const [hasAzureKey, setHasAzureKey] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check which TTS services are available
    const checkApiKeys = async () => {
      // Check ElevenLabs
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: 'test', voiceId: 'matilda' })
        });
        
        const result = await response.json();
        
        if (result.success && result.audioUrl) {
          setHasElevenLabsKey(true);
        } else if (result.error && (
          result.error.includes('not configured') || 
          result.error.includes('quota_exceeded') ||
          result.error.includes('401') ||
          result.error.includes('credits')
        )) {
          setHasElevenLabsKey(false);
        } else {
          setHasElevenLabsKey(false);
        }
      } catch (error) {
        setHasElevenLabsKey(false);
      }

      // Check OpenAI
      setHasOpenAIKey(!!process.env.NEXT_PUBLIC_OPENAI_API_KEY);
      
      // Check Google Cloud
      setHasGoogleKey(!!process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY);
      
      // Check Azure Speech
      setHasAzureKey(!!process.env.NEXT_PUBLIC_AZURE_SPEECH_API_KEY);
      
      setIsChecking(false);
    };

    checkApiKeys();
  }, []);

  if (isChecking) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 animate-spin">⏳</span>
            <span className="text-sm text-gray-600">Loading TTS...</span>
          </div>
        </div>
      </div>
    );
  }

  // Use HumanTTS for immediate human-like voices - TOP PRIORITY
  return (
    <HumanTTS 
      text={text}
      className={className}
      autoSpeak={autoSpeak}
      onPlay={onPlay}
      onStop={onStop}
    />
  );
}
