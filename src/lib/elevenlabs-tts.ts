// ElevenLabs API configuration - we'll use fetch directly to avoid node.js dependencies
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Premium human-like voices from ElevenLabs
export const ELEVENLABS_VOICES = {
  'matilda': {
    id: 'XrExE9yKIg1WjnnlVkGX',
    name: 'Matilda - Premium Female',
    description: 'Professional, clear, and engaging interviewer voice',
    accent: 'American',
    gender: 'Female'
  },
  'bill': {
    id: 'pqHfZKP75CvOlQylNhV4',
    name: 'Bill - Professional Male',
    description: 'Professional, clear, and confident interviewer voice',
    accent: 'American',
    gender: 'Male'
  },
  'alice': {
    id: 'Xb7hH8MSUJpSbSDYk0k2',
    name: 'Alice - Natural Female',
    description: 'Natural, warm, and engaging interviewer voice',
    accent: 'American',
    gender: 'Female'
  }
};

// Helper function to get voice by ID (handles both voice keys and actual voice IDs)
export function getVoiceById(voiceId: string) {
  // First try to find by key
  if (ELEVENLABS_VOICES[voiceId as keyof typeof ELEVENLABS_VOICES]) {
    return ELEVENLABS_VOICES[voiceId as keyof typeof ELEVENLABS_VOICES];
  }
  
  // Then try to find by actual voice ID
  for (const [key, voice] of Object.entries(ELEVENLABS_VOICES)) {
    if (voice.id === voiceId) {
      return voice;
    }
  }
  
  return null;
}

export interface TTSOptions {
  voiceId: string;
  text: string;
  modelId?: string;
  voiceSettings?: {
    stability: number;
    similarityBoost: number;
    style?: number;
    useSpeakerBoost?: boolean;
  };
}

export interface TTSResult {
  success: boolean;
  audioUrl?: string;
  error?: string;
  voiceUsed?: string;
}

// Generate speech using ElevenLabs API
export async function generateSpeech(options: TTSOptions): Promise<TTSResult> {
  try {
    const {
      voiceId,
      text,
      modelId = 'eleven_multilingual_v2',
      voiceSettings = {
        stability: 0.5,
        similarityBoost: 0.8,
        style: 0.2,
        useSpeakerBoost: true
      }
    } = options;

    // Make API call to our server endpoint
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voiceId,
        text,
        modelId,
        voiceSettings
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Failed to generate speech'
      };
    }

    const result = await response.json();
    
    if (result.success && result.audioUrl) {
      return {
        success: true,
        audioUrl: result.audioUrl,
        voiceUsed: result.voiceUsed
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to generate speech'
      };
    }

  } catch (error) {
    console.error('ElevenLabs TTS Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Get voice information
export function getVoiceInfo(voiceId: string) {
  return ELEVENLABS_VOICES[voiceId as keyof typeof ELEVENLABS_VOICES];
}

// Get all available voices
export function getAllVoices() {
  return Object.entries(ELEVENLABS_VOICES).map(([key, voice]) => ({
    ...voice,
    id: key
  }));
}

// Cache for audio URLs to avoid regenerating the same text
const audioCache = new Map<string, string>();

export function getCachedAudioUrl(text: string, voiceId: string): string | null {
  const cacheKey = `${voiceId}:${text}`;
  return audioCache.get(cacheKey) || null;
}

export function setCachedAudioUrl(text: string, voiceId: string, audioUrl: string): void {
  const cacheKey = `${voiceId}:${text}`;
  audioCache.set(cacheKey, audioUrl);
}
