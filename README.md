# AI Personal Interview Coach

A full-stack web application that simulates job interviews using AI-powered feedback. Built with Next.js, TypeScript, TailwindCSS, and OpenAI API.

## Features

- 🎯 **Personalized Questions**: AI-generated interview questions tailored to specific roles and experience levels
- 🎤 **Voice & Text Input**: Answer questions using voice recognition or text input
- 🔊 **Text-to-Speech**: Listen to questions being read aloud
- 📊 **Real-time Feedback**: Instant feedback on relevance, clarity, and confidence
- 📈 **Progress Tracking**: Visual progress indicator throughout the interview
- 📋 **Detailed Results**: Comprehensive performance summary with question-by-question analysis
- 💾 **Export Results**: Download interview results as JSON

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Voice**: Web Speech API (Speech Recognition & Synthesis)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key (optional - app works with fallback questions if quota exceeded)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-interview-coach
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional)**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   
   **Note**: If you don't have an OpenAI API key or have exceeded your quota, the app will automatically use fallback questions and basic feedback analysis.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Start an Interview**
   - Enter the position you're interviewing for
   - Select your experience level
   - Click "Start Interview Practice"

2. **Answer Questions**
   - Read or listen to each question
   - Answer using voice recording or text input
   - Submit your answer to receive feedback

3. **Review Feedback**
   - Get scores for relevance, clarity, and confidence
   - Read specific feedback points
   - See overall assessment

4. **View Results**
   - Complete all 5 questions
   - Review your overall performance
   - Export results for future reference

## API Endpoints

### `/api/question`
Generates personalized interview questions.

**Request:**
```json
{
  "position": "Software Engineer",
  "experience": "mid-level",
  "questionNumber": 1,
  "previousQuestions": []
}
```

**Response:**
```json
{
  "id": "q_1234567890_abc123",
  "question": "Tell me about a challenging project you worked on...",
  "category": "Behavioral",
  "difficulty": "medium"
}
```

### `/api/feedback`
Provides structured feedback on interview answers.

**Request:**
```json
{
  "question": "Tell me about yourself",
  "answer": "I am a software engineer with 5 years of experience...",
  "position": "Software Engineer"
}
```

**Response:**
```json
{
  "relevance": 8,
  "clarity": 7,
  "confidence": 9,
  "feedback": [
    "Good structure with clear examples",
    "Could provide more specific metrics",
    "Shows strong technical background"
  ],
  "overall": "Strong answer that demonstrates relevant experience..."
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Browser Compatibility

- **Voice Recognition**: Chrome, Edge, Safari (desktop)
- **Text-to-Speech**: All modern browsers
- **General**: Chrome, Firefox, Safari, Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue or contact the development team.

---

Built with ❤️ for the hackathon community
