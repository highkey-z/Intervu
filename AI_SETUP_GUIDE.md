# AI Integration Setup Guide

## Overview
Your AI Interview Coach now supports multiple AI providers for automatic question generation and feedback:

1. **OpenAI ChatGPT** (Primary) - Best quality, requires API key
2. **Google Gemini** (Fallback) - Good quality, requires API key
3. **Hugging Face** (Free tier) - Decent quality, optional API key
4. **Free AI Generation** (No API keys needed) - Template-based, always works
5. **Static Questions** (Final fallback) - 300+ curated questions

## Setup Instructions

### 1. OpenAI Setup
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

### 2. Google Gemini Setup
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 3. Hugging Face Setup (Optional - Free Tier Available)
1. Go to [Hugging Face](https://huggingface.co/settings/tokens)
2. Create an account or sign in
3. Go to Access Tokens
4. Create a new token
5. Copy the token

### 4. Environment Configuration
Create a `.env.local` file in your project root:

```bash
# OpenAI API Key (for ChatGPT) - Optional
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (for Gemini Pro) - Optional
GEMINI_API_KEY=your_gemini_api_key_here

# Hugging Face API Key - Optional (has free tier)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

**Note**: The system works completely without any API keys! It will use the free AI generation and static questions.

## How It Works

### Question Generation Flow:
1. **Try OpenAI first** - Uses GPT-3.5-turbo for dynamic questions
2. **Fallback to Gemini** - If OpenAI fails, uses Gemini Pro
3. **Try Hugging Face** - If Gemini fails, uses HF Inference API
4. **Free AI Generation** - If HF fails, uses template-based generation
5. **Final fallback** - Uses the 300+ static questions we created

### Feedback Generation Flow:
1. **Try OpenAI first** - Uses GPT-3.5-turbo for contextual feedback
2. **Fallback to Gemini** - If OpenAI fails, uses Gemini Pro
3. **Try Hugging Face** - If Gemini fails, uses HF Inference API
4. **Free AI Analysis** - If HF fails, uses heuristic-based analysis
5. **Final fallback** - Uses improved static feedback system

## Benefits

### Dynamic Question Generation:
- **Unlimited questions** for any job role (even roles not in our static database)
- **Context-aware** questions based on previous answers
- **Role-specific** questions tailored to each position
- **Experience-appropriate** difficulty levels
- **Works completely free** without any API keys

### Smart Feedback:
- **Question-specific** feedback (no more generic responses)
- **Contextual analysis** of your actual answer
- **Actionable suggestions** for improvement
- **Professional tone** appropriate for interviews
- **Multiple fallback layers** ensure it always works

## Cost Considerations

### OpenAI Pricing (GPT-3.5-turbo):
- ~$0.001-0.002 per question/feedback pair
- Very affordable for personal use

### Google Gemini Pricing:
- Free tier: 15 requests per minute
- Paid tier: Very competitive pricing

## Testing Your Setup

1. Add your API keys to `.env.local`
2. Restart your development server: `npm run dev`
3. Test with different job roles
4. Check the terminal for any API errors

## Troubleshooting

### Common Issues:
- **"API key not found"** - Check your `.env.local` file
- **"Quota exceeded"** - Add billing to your OpenAI/Gemini account
- **"Rate limit"** - The system automatically falls back to static questions

### Fallback System:
Even without ANY API keys, the system works with:
- **Free AI Generation** - Template-based question generation for any role
- **Smart Feedback Analysis** - Heuristic-based feedback using answer analysis
- **300+ static questions** across 15+ job roles
- **Improved feedback system** (fixed the generic feedback issue)
- **All the comprehensive question categories** we built

### Free Options Available:
1. **Hugging Face** - Has a generous free tier (no credit card required)
2. **Free AI Generation** - Works without any API keys using smart templates
3. **Static Questions** - Always available as final fallback

## Next Steps

1. **Set up your API keys** following the instructions above
2. **Test the system** with different job roles
3. **Monitor usage** to understand costs
4. **Customize prompts** in the AI files if needed

The system is now much more robust and will provide relevant, contextual feedback for any question!
