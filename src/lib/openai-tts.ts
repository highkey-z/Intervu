// OpenAI TTS integration
export interface OpenAIVoice {
  id: string;
  name: string;
  description: string;
  gender: 'male' | 'female';
  language: string;
}

export const OPENAI_VOICES: OpenAIVoice[] = [
  {
    id: 'alloy',
    name: 'Alloy',
    description: 'Neutral, balanced voice',
    gender: 'female',
    language: 'en'
  },
  {
    id: 'echo',
    name: 'Echo',
    description: 'Clear, confident voice',
    gender: 'male',
    language: 'en'
  },
  {
    id: 'fable',
    name: 'Fable',
    description: 'Warm, storytelling voice',
    gender: 'male',
    language: 'en'
  },
  {
    id: 'onyx',
    name: 'Onyx',
    description: 'Deep, authoritative voice',
    gender: 'male',
    language: 'en'
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'Bright, energetic voice',
    gender: 'female',
    language: 'en'
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Soft, gentle voice',
    gender: 'female',
    language: 'en'
  }
];

export interface OpenAITTSRequest {
  text: string;
  voiceId: string;
  model?: string;
  speed?: number;
}

export interface OpenAITTSResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

export async function generateOpenAITTS({
  text,
  voiceId,
  model = 'tts-1',
  speed = 1.0
}: OpenAITTSRequest): Promise<OpenAITTSResponse> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured'
      };
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        input: text,
        voice: voiceId,
        speed
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      success: true,
      audioUrl
    };
  } catch (error) {
    console.error('OpenAI TTS Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function getOpenAIVoiceById(voiceId: string): OpenAIVoice | undefined {
  return OPENAI_VOICES.find(voice => voice.id === voiceId);
}

export function getAllOpenAIVoices(): OpenAIVoice[] {
  return OPENAI_VOICES;
}

