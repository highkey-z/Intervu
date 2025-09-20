// Google Cloud TTS integration with human-like voices
export interface GoogleVoice {
  id: string;
  name: string;
  description: string;
  gender: 'male' | 'female';
  language: string;
  languageCode: string;
  ssmlGender: 'MALE' | 'FEMALE';
}

export const GOOGLE_VOICES: GoogleVoice[] = [
  // Ultra-realistic Neural2 voices (most human-like)
  {
    id: 'en-US-Neural2-A',
    name: 'Sarah',
    description: 'Ultra-realistic female voice, warm and professional',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Neural2-B',
    name: 'Michael',
    description: 'Ultra-realistic male voice, clear and confident',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  },
  {
    id: 'en-US-Neural2-C',
    name: 'Emma',
    description: 'Ultra-realistic female voice, friendly and approachable',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Neural2-D',
    name: 'James',
    description: 'Ultra-realistic male voice, authoritative and professional',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  },
  {
    id: 'en-US-Neural2-E',
    name: 'Sophia',
    description: 'Ultra-realistic female voice, calm and soothing',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Neural2-F',
    name: 'David',
    description: 'Ultra-realistic male voice, energetic and engaging',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  },
  {
    id: 'en-US-Neural2-G',
    name: 'Olivia',
    description: 'Ultra-realistic female voice, expressive and dynamic',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Neural2-H',
    name: 'Alexander',
    description: 'Ultra-realistic male voice, deep and resonant',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  },
  {
    id: 'en-US-Neural2-I',
    name: 'Isabella',
    description: 'Ultra-realistic female voice, bright and cheerful',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Neural2-J',
    name: 'Benjamin',
    description: 'Ultra-realistic male voice, warm and trustworthy',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  },
  // Studio voices (even more natural)
  {
    id: 'en-US-Standard-A',
    name: 'Lisa',
    description: 'Studio-quality female voice, crystal clear',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Standard-B',
    name: 'John',
    description: 'Studio-quality male voice, professional',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  },
  {
    id: 'en-US-Standard-C',
    name: 'Maria',
    description: 'Studio-quality female voice, warm and inviting',
    gender: 'female',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'FEMALE'
  },
  {
    id: 'en-US-Standard-D',
    name: 'Robert',
    description: 'Studio-quality male voice, authoritative',
    gender: 'male',
    language: 'English (US)',
    languageCode: 'en-US',
    ssmlGender: 'MALE'
  }
];

export interface GoogleTTSRequest {
  text: string;
  voiceId: string;
  languageCode?: string;
  ssmlGender?: 'MALE' | 'FEMALE';
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
}

export interface GoogleTTSResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

export async function generateGoogleTTS({
  text,
  voiceId,
  languageCode = 'en-US',
  ssmlGender = 'FEMALE',
  speakingRate = 0.95, // Slightly slower for more natural speech
  pitch = 2.0, // Slightly higher pitch for more human-like sound
  volumeGainDb = 2.0 // Slightly louder for better clarity
}: GoogleTTSRequest): Promise<GoogleTTSResponse> {
  try {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        error: 'Google Cloud API key not configured'
      };
    }

    // Enhance text with SSML for more natural speech
    const enhancedText = enhanceTextWithSSML(text);
    
    const requestBody = {
      input: { 
        ssml: enhancedText // Use SSML instead of plain text
      },
      voice: {
        languageCode,
        name: voiceId,
        ssmlGender
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate,
        pitch,
        volumeGainDb,
        effectsProfileId: ['telephony-class-application'] // Better for conversation
      }
    };

    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    const result = await response.json();
    
    if (result.audioContent) {
      // Convert base64 to blob
      const audioData = atob(result.audioContent);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioArray[i] = audioData.charCodeAt(i);
      }
      
      const audioBlob = new Blob([audioArray], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        success: true,
        audioUrl
      };
    } else {
      return {
        success: false,
        error: 'No audio content received'
      };
    }
  } catch (error) {
    console.error('Google TTS Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function getGoogleVoiceById(voiceId: string): GoogleVoice | undefined {
  return GOOGLE_VOICES.find(voice => voice.id === voiceId);
}

export function getAllGoogleVoices(): GoogleVoice[] {
  return GOOGLE_VOICES;
}

// Enhance text with SSML for more natural speech
function enhanceTextWithSSML(text: string): string {
  // Add natural pauses and emphasis
  let enhanced = text
    // Add pauses after question marks
    .replace(/\?/g, '?<break time="0.5s"/>')
    // Add pauses after periods
    .replace(/\./g, '.<break time="0.3s"/>')
    // Add pauses after commas
    .replace(/,/g, ',<break time="0.2s"/>')
    // Add emphasis to important words (interview-related terms)
    .replace(/\b(experience|skills|strengths|weaknesses|challenges|achievements|goals|teamwork|leadership|problem-solving|communication)\b/gi, '<emphasis level="strong">$1</emphasis>')
    // Add slight emphasis to question words
    .replace(/\b(what|how|why|when|where|tell me|describe|explain|give me)\b/gi, '<emphasis level="moderate">$1</emphasis>')
    // Add natural breathing pauses
    .replace(/\b(and|but|however|therefore|furthermore|additionally)\b/gi, '<break time="0.1s"/>$1<break time="0.1s"/>')
    // Add prosody for more natural rhythm
    .replace(/^(.+)$/, '<prosody rate="0.95" pitch="+2st" volume="+2dB">$1</prosody>');

  // Wrap in SSML
  return `<speak>${enhanced}</speak>`;
}
