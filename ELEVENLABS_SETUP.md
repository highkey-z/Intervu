# 🎭 ElevenLabs Premium TTS Setup Guide

## 🚀 Upgrade Your Interview Experience with Premium AI Voices

Your interview coach now supports **ElevenLabs** - the most advanced AI voice synthesis technology available! Get natural, human-like voices that sound like real interviewers.

## 🎯 What You Get

- **15 Premium Voices** - Professional male and female voices
- **Natural Speech Patterns** - No more robotic sounds!
- **Multiple Accents** - American, British, Nordic options
- **Audio Caching** - Fast playback after first generation
- **Fallback System** - Automatically uses browser TTS if API key isn't configured

## 🔧 Setup Instructions

### Step 1: Get Your ElevenLabs API Key

1. Go to [ElevenLabs.io](https://elevenlabs.io)
2. Sign up for a free account (includes free credits)
3. Navigate to your profile/settings
4. Copy your API key

### Step 2: Add API Key to Environment

Create or update your `.env.local` file in the project root:

```bash
# ElevenLabs API Key (for premium AI voices)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### Step 3: Restart Your Development Server

```bash
npm run dev
```

## 🎤 Available Premium Voices

### Professional Voices
- **Matilda** - Professional, clear, and engaging interviewer voice (Default)
- **Bill** - Professional, clear, and confident interviewer voice
- **Alice** - Natural, warm, and engaging interviewer voice

### Voice Features
- **High-quality audio** - Professional studio-grade voice synthesis
- **Natural speech patterns** - Human-like intonation and pacing
- **Multiple accents** - American English voices for clear understanding
- **Gender diversity** - Both male and female voice options

## 💰 Pricing & Credits

- **Free Tier**: 10,000 characters per month
- **Starter**: $5/month for 30,000 characters
- **Creator**: $22/month for 100,000 characters
- **Pro**: $99/month for 500,000 characters

*Perfect for interview practice - each question is typically 50-100 characters*

## 🎯 How It Works

1. **Automatic Detection** - App detects if API key is available
2. **Smart Fallback** - Uses browser TTS if no API key
3. **Audio Caching** - Generates MP3 once, plays instantly after
4. **Voice Selection** - Choose from 15 premium voices
5. **Natural Quality** - Sounds like real human interviewers

## 🔧 Troubleshooting

### "Premium TTS Not Available" Message
- Check that `ELEVENLABS_API_KEY` is in your `.env.local` file
- Restart your development server
- Verify the API key is correct

### Audio Not Playing
- Check browser console for errors
- Ensure you have internet connection
- Try refreshing the page

### Voice Selection Not Working
- Clear browser cache
- Check that the API key has sufficient credits
- Try a different voice

## 🎉 Benefits Over Browser TTS

| Feature | Browser TTS | ElevenLabs |
|---------|-------------|------------|
| Voice Quality | Basic | Premium |
| Naturalness | Robotic | Human-like |
| Voice Options | Limited | 15+ Premium |
| Accents | System-dependent | Multiple |
| Caching | None | Automatic |
| Reliability | Varies | Consistent |

## 🚀 Ready to Experience Premium Voices?

1. Add your ElevenLabs API key to `.env.local`
2. Restart your development server
3. Start an interview and select your preferred voice
4. Enjoy natural, human-like AI voices!

**Note**: The system works perfectly without an API key using browser TTS, but ElevenLabs provides a significantly better experience.
