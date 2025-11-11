import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = ({ plants = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '🌿 Hi! I\'m your plant assistant. I can help you find the perfect plant, answer questions about plant care, or discuss anything from our collection!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create context about available plants
  const createPlantContext = () => {
    if (!plants || plants.length === 0) {
      return "Currently, there are no plants available in the store.";
    }

    const plantsInfo = plants.map(plant => {
      return `- ${plant.name} (${plant.scientificName || 'N/A'}): ${plant.description || 'No description'}. Price: $${plant.price}. Category: ${plant.category || 'N/A'}. Stock: ${plant.stock > 0 ? 'In Stock' : 'Out of Stock'}.`;
    }).join('\n');

    return `Available Plants in Store:\n${plantsInfo}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

      // Create context-aware prompt
      const plantContext = createPlantContext();
      const systemPrompt = `You are a helpful plant store assistant. You have knowledge about plants and can help customers.
      
${plantContext}

Instructions:
- Be friendly, helpful, and enthusiastic about plants
- Use the plant information above to answer questions about available plants
- Provide plant care tips and recommendations
- If asked about a specific plant not in the list, you can still provide general knowledge about that plant type
- Keep responses concise but informative (2-4 sentences typically)
- Use emojis occasionally to be friendly 🌱
- If someone asks to buy or add to cart, kindly tell them to browse the store and click on the plant they're interested in

User's question: ${userMessage}`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (!process.env.REACT_APP_GEMINI_API_KEY) {
        errorMessage += 'The Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.';
      } else {
        errorMessage += 'Please try again later.';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label="Open plant assistant chat"
      >
        <FaRobot />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container" ref={chatRef}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <FaRobot className="chatbot-header-icon" />
              <div>
                <h3>Plant Assistant</h3>
                <span className="chatbot-status">Online</span>
              </div>
            </div>
            <button 
              className="chatbot-close-btn"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chatbot-message ${message.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="chatbot-message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message assistant">
                <div className="chatbot-message-content">
                  <div className="chatbot-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about plants..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button 
              className="chatbot-send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
