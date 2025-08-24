import React, { useState, useRef, useEffect } from 'react';

function Chatbot({ news, activeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your news assistant. I can help you find articles, explain categories, and answer questions about the latest news. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({ lastTopic: null, userPreferences: [] });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const categories = [
    { id: 'home', name: 'Home', description: 'Top stories and breaking news' },
    { id: 'health', name: 'Health', description: 'Health, medical, and wellness news' },
    { id: 'technology', name: 'Technology', description: 'Tech industry, gadgets, and innovation' },
    { id: 'business', name: 'Business', description: 'Business, economy, and financial news' },
    { id: 'science', name: 'Science', description: 'Scientific discoveries and research' },
    { id: 'sports', name: 'Sports', description: 'Sports news and athletic events' }
  ];

  const getTrendingTopics = () => {
    const topics = {};
    news.forEach(article => {
      const words = article.title.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3 && !['the', 'and', 'for', 'with', 'this', 'that', 'have', 'been', 'from', 'they', 'said', 'will', 'more', 'news', 'time', 'year', 'week'].includes(word)) {
          topics[word] = (topics[word] || 0) + 1;
        }
      });
    });
    return Object.entries(topics)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic]) => topic);
  };

  const getArticleRecommendations = (userInterests) => {
    const recommendations = news.filter(article => 
      userInterests.some(interest => 
        article.title.toLowerCase().includes(interest.toLowerCase()) ||
        article.abstract.toLowerCase().includes(interest.toLowerCase())
      )
    );
    return recommendations.slice(0, 3);
  };

  const generateResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let newContext = { ...context };

    // Greeting patterns
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = "Hello! 👋 How can I help you with the news today? I can search for articles, explain categories, or recommend stories based on your interests.";
    }
    // Help patterns
    else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      response = `I'm your AI news assistant! Here's what I can do:

🔍 **Search & Find**
• Find articles by topic or keyword
• Search within current category
• Get article recommendations

📰 **News Information**
• Explain news categories
• Show trending topics
• Summarize recent news
• Count articles by category

💡 **Smart Features**
• Remember your interests
• Provide personalized recommendations
• Answer questions about current events
• Help you discover new topics

Just ask me anything about the news!`;
    }
    // Category questions
    else if (lowerMessage.includes('category') || lowerMessage.includes('categories')) {
      response = `Here are all the available news categories:

${categories.map(cat => `📰 **${cat.name}**: ${cat.description}`).join('\n')}

Which category interests you? I can help you explore any of these topics!`;
    }
    // Current category
    else if (lowerMessage.includes('current') || lowerMessage.includes('now') || lowerMessage.includes('what') && lowerMessage.includes('showing')) {
      const currentCat = categories.find(cat => cat.id === activeCategory);
      response = `Currently showing: **${currentCat?.name}** news\n\n${currentCat?.description}\n\nThere are ${news.length} articles in this category.`;
    }
    // Article count
    else if (lowerMessage.includes('how many') || lowerMessage.includes('count') || lowerMessage.includes('articles')) {
      const currentCat = categories.find(cat => cat.id === activeCategory);
      response = `There are currently **${news.length} articles** in the ${currentCat?.name} category.`;
    }
    // Trending topics
    else if (lowerMessage.includes('trending') || lowerMessage.includes('popular') || lowerMessage.includes('hot')) {
      const trendingTopics = getTrendingTopics();
      response = `Here are the trending topics in current news:\n\n${trendingTopics.map(topic => `🔥 ${topic}`).join('\n')}\n\nWould you like me to find articles about any of these topics?`;
    }
    // Search for specific topics
    else if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('about')) {
      const searchTerms = userMessage.replace(/find|search|about/gi, '').trim();
      if (searchTerms) {
        const matchingArticles = news.filter(article =>
          article.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
          article.abstract.toLowerCase().includes(searchTerms.toLowerCase())
        );
        
        if (matchingArticles.length > 0) {
          response = `I found **${matchingArticles.length} article(s)** about "${searchTerms}":\n\n${matchingArticles.slice(0, 3).map(article => 
            `📰 ${article.title}`
          ).join('\n')}${matchingArticles.length > 3 ? '\n\n...and more! Would you like to see all results?' : ''}`;
          
          newContext.lastTopic = searchTerms;
        } else {
          response = `I couldn't find any articles about "${searchTerms}" in the current category. Try searching for a different topic or switching categories.`;
        }
      } else {
        response = "What topic would you like me to search for? Just tell me what interests you!";
      }
    }
    // Latest news
    else if (lowerMessage.includes('latest') || lowerMessage.includes('recent') || lowerMessage.includes('new')) {
      const recentArticles = news.slice(0, 3);
      response = `Here are the latest articles:\n\n${recentArticles.map(article => 
        `📰 **${article.title}**\n   ${new Date(article.published_date).toLocaleDateString()}`
      ).join('\n\n')}`;
    }
    // Recommendations
    else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('interesting')) {
      if (context.userPreferences.length > 0) {
        const recommendations = getArticleRecommendations(context.userPreferences);
        if (recommendations.length > 0) {
          response = `Based on your interests, here are some articles you might like:\n\n${recommendations.map(article => 
            `📰 **${article.title}**\n   ${article.abstract.substring(0, 100)}...`
          ).join('\n\n')}`;
        } else {
          response = "I don't have specific recommendations right now, but I can help you explore trending topics or search for articles you're interested in!";
        }
      } else {
        response = "I'd love to recommend articles for you! What topics interest you? For example, you could say 'I'm interested in technology' or 'I like sports news'.";
      }
    }
    // User preferences
    else if (lowerMessage.includes('interested in') || lowerMessage.includes('like') || lowerMessage.includes('prefer')) {
      const interests = userMessage.match(/(?:interested in|like|prefer)\s+(.+)/i);
      if (interests) {
        const interest = interests[1].trim();
        newContext.userPreferences = [...new Set([...context.userPreferences, interest])];
        response = `Great! I'll remember that you're interested in **${interest}**. I'll use this to provide better recommendations for you.`;
      }
    }
    // Weather (mock response)
    else if (lowerMessage.includes('weather')) {
      response = "I'm focused on news content, but I can help you find weather-related news articles! Would you like me to search for weather news?";
    }
    // Thank you
    else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      response = "You're welcome! 😊 I'm here to help you stay informed. Is there anything else you'd like to know about the news?";
    }
    // Goodbye
    else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      response = "Goodbye! 👋 Feel free to chat with me anytime you need help with the news. Stay informed!";
    }
    // Default response with context
    else {
      if (context.lastTopic) {
        response = `I'm here to help with news-related questions! Since you were asking about "${context.lastTopic}", would you like me to search for more articles on that topic, or is there something else I can help you with?`;
      } else {
        response = "I'm here to help with news-related questions! You can ask me about articles, categories, trending topics, or search for specific subjects. What would you like to know?";
      }
    }

    setContext(newContext);
    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    const botResponse = await generateResponse(userMessage);
    
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your news assistant. I can help you find articles, explain categories, and answer questions about the latest news. How can I help you today?",
        timestamp: new Date()
      }
    ]);
    setContext({ lastTopic: null, userPreferences: [] });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">News Assistant</h3>
                <p className="text-xs text-blue-100">AI-Powered • Smart Responses</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                title="Clear chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about the news..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
