# Gemini AI Chatbot Integration

## Overview
A contextual AI chatbot powered by Google's Gemini AI that appears on the home screen with a floating action button. The chatbot has knowledge of all plants in the store and can help customers with plant recommendations, care tips, and general plant queries.

## Features
- 🤖 **AI-Powered**: Uses Google's Gemini Pro model for intelligent responses
- 🌿 **Context-Aware**: Has real-time access to your plant inventory
- 💬 **Conversational**: Natural, friendly chat interface
- 📱 **Responsive**: Works seamlessly on mobile and desktop
- ✨ **Smooth Animations**: Beautiful UI with floating action button

## Setup Instructions

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variable
1. Copy `.env.example` to `.env` in the project root
   ```bash
   cp .env.example .env
   ```

2. Add your Gemini API key to `.env`:
   ```env
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Restart Development Server
```bash
npm start
```

## How It Works

### Contextual Awareness
The chatbot receives information about all currently available plants, including:
- Plant names and scientific names
- Descriptions and care information
- Prices and stock availability
- Categories

### Example Conversations
- "What succulents do you have?"
- "I need a low-maintenance plant for my apartment"
- "How do I care for a monstera?"
- "What's the difference between the plants you have?"

### Privacy & Cost
- All conversations happen client-side
- API calls are made directly from the user's browser
- Free tier: 60 requests per minute
- No conversation data is stored on our servers

## Customization

### Changing Chatbot Appearance
Edit `src/components/Chatbot.css` to customize colors, sizes, and animations.

### Modifying AI Behavior
Edit the `systemPrompt` in `src/components/Chatbot.js` to change how the AI responds.

### Adjusting Position
Modify the floating action button position in `Chatbot.css`:
```css
.chatbot-fab {
  bottom: 30px;  /* Change vertical position */
  right: 30px;   /* Change horizontal position */
}
```

## Troubleshooting

### "API key is not configured" error
- Make sure `.env` file exists in the project root
- Verify `REACT_APP_GEMINI_API_KEY` is set correctly
- Restart the development server after adding the key

### Chatbot not responding
- Check browser console for errors
- Verify your API key is valid
- Ensure you haven't exceeded the free tier limits

### Chatbot doesn't show plant information
- The chatbot automatically receives plant data from the Home page
- If plants aren't loading, check your backend connection

## API Usage Limits
Google's Gemini API free tier includes:
- 60 requests per minute
- 1,500 requests per day
- Rate limits may vary by region

For production use, consider implementing:
- Rate limiting on the client side
- Caching common responses
- Upgrading to a paid plan if needed

## Files Modified/Created
- `src/components/Chatbot.js` - Main chatbot component
- `src/components/Chatbot.css` - Chatbot styling
- `src/pages/Home.js` - Integrated chatbot into home page
- `.env.example` - Added API key configuration

## Support
For issues with:
- **Gemini API**: Visit [Google AI Studio docs](https://ai.google.dev/docs)
- **This integration**: Check the code comments or open an issue
