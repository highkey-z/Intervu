# Groq API Setup Guide

## Step 1: Get Your Free Groq API Key

1. Go to [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to "API Keys" in the dashboard
4. Click "Create API Key"
5. Copy your API key

## Step 2: Add to Environment Variables

Add this line to your `.env.local` file:

```
GROQ_API_KEY=your_groq_api_key_here
```

## Step 3: Restart Your Development Server

```bash
npm run dev
```

## Benefits of Groq API

- ✅ **Completely FREE** with generous limits
- ✅ **Fast responses** (optimized for speed)
- ✅ **Reliable** (no quota issues like ElevenLabs)
- ✅ **Good at structured output** (JSON responses)
- ✅ **Multiple model options** (Llama 3, Mixtral)

## Free Tier Limits

- **Rate Limit**: 30 requests per minute
- **Daily Limit**: 14,400 requests per day
- **Model**: Llama 3.1 8B (instant)

This should be more than enough for your interview application!
