import React, { useState, useEffect } from 'react'

// TypeScript interfaces
interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

interface PrayerTime {
  name: string
  time: string
  performed: boolean
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

// Main App Component
const App: React.FC = () => {
  // State declarations
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete Quran Reading', completed: false, priority: 'high' },
    { id: 2, title: 'Study for Exam', completed: false, priority: 'high' },
    { id: 3, title: 'Dhikr 100 Times', completed: false, priority: 'medium' },
    { id: 4, title: 'Exercise 30 Minutes', completed: false, priority: 'low' },
    { id: 5, title: 'Review Notes', completed: false, priority: 'medium' },
  ])
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '05:30 AM', performed: false },
    { name: 'Dhuhr', time: '12:30 PM', performed: false },
    { name: 'Asr', time: '03:45 PM', performed: false },
    { name: 'Maghrib', time: '06:30 PM', performed: false },
    { name: 'Isha', time: '08:00 PM', performed: false },
  ])
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Assalamu Alaikum! 🌟 I'm your AI Productivity Coach. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  
  const [inputMessage, setInputMessage] = useState<string>('')
  const [showChat, setShowChat] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [productivityScore, setProductivityScore] = useState<number>(0)
  const [motivationMessage, setMotivationMessage] = useState<string>('')
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  // Calculate productivity score
  useEffect(() => {
    const completedTasks = tasks.filter(t => t.completed).length
    const completedPrayers = prayerTimes.filter(p => p.performed).length
    const taskScore = (completedTasks / tasks.length) * 50
    const prayerScore = (completedPrayers / prayerTimes.length) * 50
    const score = Math.round(taskScore + prayerScore)
    setProductivityScore(score || 0)
    
    // Set motivation message based on score
    if (score >= 80) {
      setMotivationMessage("🌟 Excellent! You're doing amazing! Keep up the great work!")
    } else if (score >= 50) {
      setMotivationMessage("💪 Good job! You're making progress. Stay consistent!")
    } else if (score >= 30) {
      setMotivationMessage("📈 You're on your way! Focus on completing your tasks today.")
    } else {
      setMotivationMessage("🎯 Let's get started! Complete your first task to build momentum.")
    }
  }, [tasks, prayerTimes])
  
  // Toggle task completion
  const toggleTask = (id: number): void => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }
  
  // Toggle prayer completion
  const togglePrayer = (index: number): void => {
    const newPrayerTimes = [...prayerTimes]
    newPrayerTimes[index].performed = !newPrayerTimes[index].performed
    setPrayerTimes(newPrayerTimes)
  }
  
  // Add new task
  const addTask = (): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: 'New Task',
      completed: false,
      priority: 'medium'
    }
    setTasks([...tasks, newTask])
  }
  
  // Handle sending message
  const handleSendMessage = (): void => {
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
    
    // Simulate AI response
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
  
  // Generate AI response
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('study') || input.includes('exam') || input.includes('homework')) {
      return "📚 **Study Tips**:\n\n• Use Pomodoro: 25 min study, 5 min break\n• Active recall: Test yourself\n• Teach others to reinforce learning\n• Stay hydrated and take breaks\n\nWhat subject are you studying? I can give more specific tips! 🎯"
    }
    
    if (input.includes('prayer') || input.includes('quran') || input.includes('dhikr')) {
      return "🕌 **Spiritual Growth Tips**:\n\n• Set reminders for each prayer\n• Read 1 page of Quran with translation daily\n• Start with 10-15 minutes of dhikr\n• Make dua for barakah in your time\n\nRemember: Consistency is better than intensity. Start small! 🌙"
    }
    
    if (input.includes('motivation') || input.includes('tired') || input.includes('give up')) {
      return "💪 **Stay Strong!**\n\n\"Indeed, with hardship comes ease.\" (Quran 94:6)\n\n• Take a deep breath\n• Break your task into smaller steps\n• Start with just 5 minutes\n• You've got this! 🚀\n\nWhat's one small thing you can do right now?"
    }
    
    if (input.includes('time') || input.includes('schedule') || input.includes('procrastinate')) {
      return "⏰ **Time Management**:\n\n• Prioritize: Do important tasks first\n• Time block your day\n• 2-Minute Rule: Do small tasks immediately\n• Remove distractions\n\nWant me to help you create a schedule? 📅"
    }
    
    if (input.includes('productivity')) {
      return "🎯 **Productivity Boosters**:\n\n• Clear workspace = clear mind\n• Put phone away while working\n• Focus on one task at a time\n• Take movement breaks every hour\n\nYou're capable of amazing things! 💫"
    }
    
    return "🌟 I'm here to help! Here's what I can assist with:\n\n• 📚 Study tips and exam preparation\n• 🕌 Spiritual growth and prayer consistency\n• 💪 Motivation when you feel stuck\n• ⏰ Time management strategies\n• 🎯 Productivity hacks\n\nWhat would you like help with today? 🤗"
  }
  
  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }
  
  // Calculate statistics
  const completedTasks = tasks.filter(t => t.completed).length
  const completedPrayers = prayerTimes.filter(p => p.performed).length
  const totalTasks = tasks.length
  const totalPrayers = prayerTimes.length
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🕌</div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px'
          }}>
            Life OS Portal
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
            Your AI-Powered Personal Productivity Assistant
          </p>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'monospace'
          }}>
            {currentTime.toLocaleTimeString()}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        
        {/* Productivity Score Section */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px'
          }}>
            Today's Productivity Score
          </h2>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#FE5823',
            marginBottom: '8px'
          }}>
            {productivityScore}%
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            height: '12px',
            marginBottom: '16px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${productivityScore}%`,
              height: '100%',
              background: '#FE5823',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>
            {motivationMessage}
          </p>
        </div>
        
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Tasks Section */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px'
            }}>
              📋 Today's Tasks ({completedTasks}/{totalTasks})
            </h2>
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '12px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  flex: 1,
                  color: 'white',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1
                }}>
                  {task.title}
                </span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  background: getPriorityColor(task.priority) + '20',
                  color: getPriorityColor(task.priority)
                }}>
                  {task.priority}
                </span>
              </div>
            ))}
            <button
              onClick={addTask}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '12px',
                background: 'rgba(255,255,255,0.1)',
                border: '2px dashed rgba(255,255,255,0.3)',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              + Add New Task
            </button>
          </div>
          
          {/* Prayer Times Section */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px'
            }}>
              🕌 Prayer Times ({completedPrayers}/{totalPrayers})
            </h2>
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px'
                }}
              >
                <span style={{ color: 'white', fontWeight: 'bold' }}>{prayer.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{prayer.time}</span>
                <button
                  onClick={() => togglePrayer(index)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    background: prayer.performed ? '#10b981' : 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  {prayer.performed ? '✓ Performed' : '⭘ Mark'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#FE5823' }}>
              {Math.round((completedTasks / totalTasks) * 100) || 0}%
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Tasks Complete</div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
              {Math.round((completedPrayers / totalPrayers) * 100) || 0}%
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Prayers Complete</div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
              {tasks.filter(t => t.completed).length}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Tasks Completed</div>
          </div>
        </div>
        
        {/* Motivational Quote */}
        <div style={{
          background: 'rgba(254,88,35,0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px',
          border: '1px solid rgba(254,88,35,0.3)'
        }}>
          <p style={{ color: 'white', fontSize: '14px', fontStyle: 'italic' }}>
            "The best among you are those who learn the Qur'an and teach it."
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '8px' }}>
            - Prophet Muhammad (PBUH)
          </p>
        </div>
      </div>
      
      {/* Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#FE5823',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s',
          zIndex: 999
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        💬
      </button>
      
      {/* Chat Modal */}
      {showChat && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '500px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Chat Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>🤖 AI Productivity Coach</h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Always here to help</p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>
            
            {/* Chat Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px',
                    borderRadius: '16px',
                    background: message.sender === 'user' ? '#FE5823' : '#f0f0f0',
                    color: message.sender === 'user' ? 'white' : '#333',
                    whiteSpace: 'pre-wrap'
                  }}>
                    <div style={{ fontSize: '14px' }}>{message.text}</div>
                    <div style={{
                      fontSize: '10px',
                      marginTop: '4px',
                      opacity: 0.7,
                      textAlign: 'right'
                    }}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '12px',
                    borderRadius: '16px',
                    background: '#f0f0f0',
                    color: '#666'
                  }}>
                    <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>Typing...</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Actions */}
            <div style={{
              padding: '12px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto'
            }}>
              {['Study tips 📚', 'Prayer help 🕌', 'Motivation 💪', 'Time management ⏰'].map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(action)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid #ddd',
                    background: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
            
            {/* Chat Input */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask for advice, motivation, or help..."
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '24px',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '12px 24px',
                  background: '#FE5823',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add animation style */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default App
