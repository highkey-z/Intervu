// Azure Cognitive Services TTS integration with ultra-natural voices
export interface AzureVoice {
  id: string;
  name: string;
  description: string;
  gender: 'male' | 'female';
  language: string;
  languageCode: string;
  locale: string;
}

export const AZURE_VOICES: AzureVoice[] = [
  // Neural voices (most natural)
  {
    id: 'en-US-AriaNeural',
    name: 'Aria',
    description: 'Ultra-natural female voice, warm and expressive',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-DavisNeural',
    name: 'Davis',
    description: 'Ultra-natural male voice, confident and professional',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny',
    description: 'Ultra-natural female voice, friendly and approachable',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy',
    description: 'Ultra-natural male voice, warm and trustworthy',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-AmberNeural',
    name: 'Amber',
    description: 'Ultra-natural female voice, calm and soothing',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-BrandonNeural',
    name: 'Brandon',
    description: 'Ultra-natural male voice, energetic and engaging',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-SaraNeural',
    name: 'Sara',
    description: 'Ultra-natural female voice, bright and cheerful',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  },
  {
    id: 'en-US-TonyNeural',
    name: 'Tony',
    description: 'Ultra-natural male voice, deep and resonant',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    locale: 'en-US'
  }
];

export interface AzureTTSRequest {
  text: string;
  voiceId: string;
  languageCode?: string;
  locale?: string;
  speakingRate?: number;
  pitch?: number;
  volume?: number;
}

export interface AzureTTSResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

export async function generateAzureTTS({
  text,
  voiceId,
  languageCode = 'en-US',
  locale = 'en-US',
  speakingRate = 0.95,
  pitch = 2.0,
  volume = 2.0
}: AzureTTSRequest): Promise<AzureTTSResponse> {
  try {
    const apiKey = process.env.AZURE_SPEECH_API_KEY;
    const region = process.env.AZURE_SPEECH_REGION || 'eastus';
    
    if (!apiKey) {
      return {
        success: false,
        error: 'Azure Speech API key not configured'
      };
    }

    // Create SSML for more natural speech
    const ssml = createNaturalSSML(text, voiceId, speakingRate, pitch, volume);

    const response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'Intervu-TTS'
      },
      body: ssml
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`
      };
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      success: true,
      audioUrl
    };
  } catch (error) {
    console.error('Azure TTS Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function createNaturalSSML(text: string, voiceId: string, speakingRate: number, pitch: number, volume: number): string {
  // Enhance text with natural pauses and emphasis
  let enhanced = text
    // Add natural pauses
    .replace(/\?/g, '?<break time="0.5s"/>')
    .replace(/\./g, '.<break time="0.3s"/>')
    .replace(/,/g, ',<break time="0.2s"/>')
    // Add emphasis to important words
    .replace(/\b(experience|skills|strengths|weaknesses|challenges|achievements|goals|teamwork|leadership|problem-solving|communication)\b/gi, '<emphasis level="strong">$1</emphasis>')
    .replace(/\b(what|how|why|when|where|tell me|describe|explain|give me)\b/gi, '<emphasis level="moderate">$1</emphasis>')
    // Add natural breathing
    .replace(/\b(and|but|however|therefore|furthermore|additionally)\b/gi, '<break time="0.1s"/>$1<break time="0.1s"/>');

  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="${voiceId}">
      <prosody rate="${speakingRate}" pitch="${pitch > 0 ? '+' : ''}${pitch}%" volume="${volume}">
        ${enhanced}
      </prosody>
    </voice>
  </speak>`;
}

export function getAzureVoiceById(voiceId: string): AzureVoice | undefined {
  return AZURE_VOICES.find(voice => voice.id === voiceId);
}

export function getAllAzureVoices(): AzureVoice[] {
  return AZURE_VOICES;
}

