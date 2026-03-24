import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import Layout from '../../components/layout/Layout';
import { 
  CalendarIcon, 
  ClockIcon, 
  ChartBarIcon, 
  HeartIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const MainDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, prayerRes, tasksRes] = await Promise.all([
        axios.get('/api/users/stats'),
        axios.get('/api/prayer/times'),
        axios.get('/api/events/today')
      ]);
      setStats(statsRes.data);
      setPrayerTimes(prayerRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const studyData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 6 },
    { day: 'Fri', hours: 4 },
    { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 3 },
  ];

  const prayerData = [
    { name: 'Completed', value: 4 },
    { name: 'Missed', value: 1 },
  ];

  const COLORS = ['#10b981', '#ef4444'];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FE5823]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#FE5823] to-[#8AC4C7] rounded-2xl p-8 text-white"
        >
          <h1 className="text-3xl font-bold mb-2">{greeting()}, {user?.name}!</h1>
          <p className="text-white/90">Here's your productivity overview for today</p>
          <div className="mt-4 flex space-x-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm">Productivity Score</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm">Tasks Completed</p>
              <p className="text-2xl font-bold">12/15</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm">Study Streak</p>
              <p className="text-2xl font-bold">7 days</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Study Hours"
            value={`${stats?.studyHours || 0}h`}
            change="+12%"
            icon={AcademicCapIcon}
            color="blue"
          />
          <StatCard
            title="Prayer Streak"
            value={`${stats?.prayerStreak || 0} days`}
            change="+3%"
            icon={HeartIcon}
            color="green"
          />
          <StatCard
            title="Tasks Completed"
            value={stats?.completedTasks || 0}
            change="+8%"
            icon={CheckCircleIcon}
            color="orange"
          />
          <StatCard
            title="Pending Tasks"
            value={stats?.pendingTasks || 0}
            change="-5%"
            icon={ExclamationTriangleIcon}
            color="red"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Study Hours Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Study Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#FE5823" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Prayer Completion Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Prayer Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={prayerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prayerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Prayer Times & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prayer Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Prayer Times</h3>
            <div className="space-y-3">
              {prayerTimes && Object.entries(prayerTimes).map(([prayer, time]) => (
                <div key={prayer} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="capitalize text-gray-700 dark:text-gray-300">{prayer}</span>
                  <span className="font-mono text-gray-900 dark:text-white">{time as string}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Tasks</h3>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#FE5823]" />
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center"
        >
          <p className="text-lg font-semibold">"The best among you are those who learn the Qur'an and teach it."</p>
          <p className="text-sm mt-2 opacity-90">- Prophet Muhammad (PBUH)</p>
        </motion.div>
      </div>
    </Layout>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-600',
    green: 'bg-green-500/10 text-green-600',
    orange: 'bg-orange-500/10 text-orange-600',
    red: 'bg-red-500/10 text-red-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={`text-sm font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </motion.div>
  );
};

export default MainDashboard;
