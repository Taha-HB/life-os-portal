import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface AIChatProps {
  onClose: () => void
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Assalamu Alaikum! 🌟 I'm your AI Productivity Coach. I'm here to help you stay motivated, manage your time effectively, and achieve your goals. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Academic responses
    if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('homework')) {
      return "📚 **Study Tips**:\n\n" +
        "1. **Pomodoro Technique**: Study for 25 minutes, then take a 5-minute break\n" +
        "2. **Active Recall**: Test yourself instead of just re-reading\n" +
        "3. **Spaced Repetition**: Review material at increasing intervals\n" +
        "4. **Teach Others**: Explaining concepts helps solidify understanding\n\n" +
        "Remember: Consistency beats intensity! What subject are you studying? I can give more specific tips! 🎯"
    }
    
    // Spiritual responses
    if (lowerMessage.includes('prayer') || lowerMessage.includes('quran') || lowerMessage.includes('dhikr')) {
      return "🕌 **Spiritual Growth Tips**:\n\n" +
        "• **Pray on Time**: Set reminders for each prayer - consistency is key\n" +
        "• **Quality over Quantity**: Even 5 minutes of focused dhikr is valuable\n" +
        "• **Quran Connection**: Try reading 1 page with translation daily\n" +
        "• **Dua Power**: Make dua for focus and barakah in your time\n\n" +
        "Would you like a personalized spiritual routine? I can help you build sustainable habits! 🌙"
    }
    
    // Motivation responses
    if (lowerMessage.includes('motivation') || lowerMessage.includes('tired') || lowerMessage.includes('give up')) {
      const motivations = [
        "💪 **You've got this!** Remember why you started. Every small step counts!",
        "🌟 **Allah is with you**: 'Indeed, with hardship comes ease.' (Quran 94:6)",
        "📈 **Progress not perfection**: Look how far you've come already!",
        "🎯 **One day at a time**: Focus on what you can do TODAY",
        "🤲 **Make dua**: Ask Allah to make your efforts fruitful"
      ]
      return motivations[Math.floor(Math.random() * motivations.length)] + "\n\nWhat's one small thing you can do right now to move forward? 💫"
    }
    
    // Time management
    if (lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage.includes('procrastinate')) {
      return "⏰ **Time Management Strategies**:\n\n" +
        "1. **Eisenhower Matrix**: Prioritize tasks by urgency and importance\n" +
        "2. **Time Blocking**: Schedule specific times for specific tasks\n" +
        "3. **Eat That Frog**: Do your hardest task first thing in the morning\n" +
        "4. **2-Minute Rule**: If it takes <2 minutes, do it immediately\n\n" +
        "Want me to help you create a personalized schedule? 🗓️"
    }
    
    // Productivity tips
    if (lowerMessage.includes('productivity') || lowerMessage.includes('focus')) {
      return "🎯 **Productivity Boosters**:\n\n" +
        "• **Clear Workspace**: Tidy space = tidy mind\n" +
        "• **Phone Away**: Keep distractions out of sight\n" +
        "• **Single Tasking**: Focus on ONE thing at a time\n" +
        "• **Hydrate & Move**: Take breaks to refresh your mind\n\n" +
        "What's your biggest productivity challenge right now? Let's tackle it together! 💪"
    }
    
    // Default encouraging response
    return "🌟 **Thank you for reaching out!** 🌟\n\n" +
      "I'm here to support you in your journey. Here are some things we can explore:\n\n" +
      "• **Study Help** - Get tips for exams and learning\n" +
      "• **Spiritual Growth** - Build consistent prayer and Quran habits\n" +
      "• **Motivation** - Get encouragement when you feel stuck\n" +
      "• **Time Management** - Create effective schedules\n" +
      "• **Productivity** - Overcome procrastination\n\n" +
      "What would you like help with today? I'm here for you! 🤗"
  }
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const getQuickActions = () => {
    return [
      "Need study tips 📚",
      "Prayer motivation 🕌",
      "Feeling unmotivated 💪",
      "Time management ⏰",
      "Productivity hacks 🎯",
      "Daily encouragement 🌟"
    ]
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] rounded-t-2xl p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">AI Productivity Coach</h2>
              <p className="text-white/80 text-xs">Always here to help you grow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-md font-bold mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-slideIn">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {getQuickActions().map((action, idx) => (
              <button
                key={idx}
                onClick={() => setInputMessage(action)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE5823] dark:bg-gray-700 dark:text-white resize-none"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="px-4 bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            💡 Tip: Ask me about study tips, prayer motivation, time management, or just for encouragement!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIChat
