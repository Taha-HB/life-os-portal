import React, { useState, useEffect } from 'react'
import AIChat from './components/AIChat'
import './styles/globals.css'

interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category: 'academic' | 'spiritual' | 'personal'
}

interface PrayerTime {
  name: string
  time: string
  performed: boolean
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete Quran reading', completed: false, priority: 'high', category: 'spiritual' },
    { id: 2, title: 'Study for exam', completed: false, priority: 'high', category: 'academic' },
    { id: 3, title: 'Exercise 30 minutes', completed: false, priority: 'medium', category: 'personal' },
    { id: 4, title: 'Dhikr 100 times', completed: false, priority: 'high', category: 'spiritual' },
    { id: 5, title: 'Review notes', completed: false, priority: 'medium', category: 'academic' },
  ])
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '05:30 AM', performed: false },
    { name: 'Dhuhr', time: '12:30 PM', performed: false },
    { name: 'Asr', time: '03:45 PM', performed: false },
    { name: 'Maghrib', time: '06:30 PM', performed: false },
    { name: 'Isha', time: '08:00 PM', performed: false },
  ])
  
  const [showAIChat, setShowAIChat] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [productivityScore, setProductivityScore] = useState(0)
  const [motivationMessage, setMotivationMessage] = useState('')
  const [studyStreak, setStudyStreak] = useState(5)
  const [dailyGoal, setDailyGoal] = useState('Complete 3 tasks today')
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    calculateProductivityScore()
    generateMotivationMessage()
    
    return () => clearInterval(timer)
  }, [tasks, prayerTimes])
  
  const calculateProductivityScore = () => {
    const completedTasks = tasks.filter(t => t.completed).length
    const completedPrayers = prayerTimes.filter(p => p.performed).length
    const score = Math.round(((completedTasks / tasks.length) * 0.6 + (completedPrayers / prayerTimes.length) * 0.4) * 100)
    setProductivityScore(score || 0)
  }
  
  const generateMotivationMessage = () => {
    const messages = [
      "🌟 You're doing great! Keep pushing forward!",
      "📚 Every study session brings you closer to your goals!",
      "🕌 Your prayers are building a strong connection with Allah!",
      "💪 Consistency is key! You're building amazing habits!",
      "🎯 Stay focused on your goals. Success is near!",
      "✨ Small steps every day lead to big achievements!",
      "🌙 Don't give up! Your dedication is inspiring!",
      "📖 Knowledge is power. Keep learning and growing!"
    ]
    setMotivationMessage(messages[Math.floor(Math.random() * messages.length)])
  }
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }
  
  const togglePrayer = (index: number) => {
    const newPrayerTimes = [...prayerTimes]
    newPrayerTimes[index].performed = !newPrayerTimes[index].performed
    setPrayerTimes(newPrayerTimes)
  }
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'academic': return '📚'
      case 'spiritual': return '🕌'
      case 'personal': return '💪'
      default: return '📝'
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Life OS Portal</h1>
              <p className="text-white/90 mt-1">Your AI-Powered Personal Assistant</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Productivity Score */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Today's Productivity Score</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{motivationMessage}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FE5823]">{productivityScore}%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">🔥 {studyStreak} day streak</p>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] h-3 rounded-full transition-all duration-500"
              style={{ width: `${productivityScore}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="mr-2">📋</span> Today's Tasks
              </h2>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      task.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700/50'
                    } animate-slideIn`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 rounded border-gray-300 text-[#FE5823] focus:ring-[#FE5823]"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                        {task.title}
                      </span>
                      <span className="text-sm px-2 py-1 rounded-full" style={{ backgroundColor: getPriorityColor(task.priority) + '20', color: getPriorityColor(task.priority) }}>
                        {task.priority}
                      </span>
                      <span className="text-xl">{getCategoryIcon(task.category)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-[#FE5823] hover:text-[#FE5823] transition-colors">
                + Add New Task
              </button>
            </div>
            
            {/* Daily Goal */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-2">🎯 Daily Goal</h2>
              <p className="text-lg">{dailyGoal}</p>
              <p className="text-sm mt-2 opacity-90">You're 65% of the way there!</p>
              <div className="mt-3 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Prayer Times */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="mr-2">🕌</span> Prayer Times
              </h2>
              <div className="space-y-3">
                {prayerTimes.map((prayer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{prayer.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{prayer.time}</span>
                    <button
                      onClick={() => togglePrayer(idx)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        prayer.performed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {prayer.performed ? '✓ Performed' : '⭘ Not Yet'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📊 Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tasks Completed:</span>
                  <span className="font-bold text-[#FE5823]">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prayers Completed:</span>
                  <span className="font-bold text-[#8AC4C7]">{prayerTimes.filter(p => p.performed).length}/{prayerTimes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Study Streak:</span>
                  <span className="font-bold text-purple-500">{studyStreak} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* AI Chat Button */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      
      {/* AI Chat Modal */}
      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}
    </div>
  )
}

export default App
