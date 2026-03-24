import cron from 'node-cron';
import { User } from '../models/User.js';
import { Prayer } from '../models/Prayer.js';
import { Event } from '../models/Event.js';
import { NotificationService } from '../services/notificationService.js';
import moment from 'moment';

const notificationService = NotificationService.getInstance();

// Run daily at 10:30 PM
cron.schedule('30 22 * * *', async () => {
  console.log('Generating daily reports...');
  
  try {
    const users = await User.find({ 'settings.reminders.dailyReport': true });
    
    for (const user of users) {
      const today = new Date();
      const startOfDay = moment(today).startOf('day').toDate();
      const endOfDay = moment(today).endOf('day').toDate();
      
      // Get today's prayer data
      const prayerData = await Prayer.findOne({
        userId: user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
      });
      
      // Get today's tasks
      const tasks = await Event.find({
        userId: user._id,
        startDate: { $gte: startOfDay, $lte: endOfDay },
        type: 'study'
      });
      
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const totalTasks = tasks.length;
      
      // Calculate productivity score
      const prayerScore = prayerData ? 
        Object.values(prayerData.prayers).filter(p => p.performed).length / 5 * 100 : 0;
      const taskScore = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 100;
      const productivityScore = Math.round((prayerScore + taskScore) / 2);
      
      // Generate recommendations
      let recommendations = [];
      
      if (prayerScore < 80) {
        recommendations.push('Set prayer reminders to improve consistency');
      }
      
      if (taskScore < 70) {
        recommendations.push('Break down tasks into smaller, manageable chunks');
      }
      
      if (user.spiritualStats.quranPagesRead === 0) {
        recommendations.push('Start with reading 1 page of Quran daily');
      }
      
      // Create report
      const report = {
        date: today,
        productivityScore,
        prayerScore,
        taskScore,
        completedTasks,
        totalTasks,
        prayersPerformed: prayerData ? 
          Object.values(prayerData.prayers).filter(p => p.performed).length : 0,
        totalPrayers: 5,
        quranPages: prayerData?.quran.pagesRead || 0,
        dhikrCount: prayerData?.dhikr.count || 0,
        recommendations,
        motivationalQuote: getMotivationalQuote(prayerScore, taskScore)
      };
      
      // Send notification
      await notificationService.sendNotification({
        userId: user._id,
        type: 'daily_report',
        title: 'Daily Report',
        message: `Your productivity score today: ${productivityScore}%`,
        data: report
      });
      
      // Store report
      // You can create a Report model to store historical reports
      
      console.log(`Report generated for user: ${user.email}`);
    }
    
    console.log('Daily reports generation completed');
  } catch (error) {
    console.error('Error generating daily reports:', error);
  }
});

function getMotivationalQuote(prayerScore: number, taskScore: number): string {
  const quotes = [
    "Every day is a new opportunity to grow closer to Allah and achieve your goals.",
    "Small consistent steps lead to great achievements. Keep going!",
    "Your dedication to prayer and studies is building a beautiful future.",
    "Remember: The most beloved deeds to Allah are those done consistently, even if small.",
    "Success is the sum of small efforts, repeated day in and day out."
  ];
  
  if (prayerScore > 80 && taskScore > 80) {
    return "Excellent day! You're making amazing progress. Keep up this momentum!";
  } else if (prayerScore > 80) {
    return "Great job on your prayers! Let's focus on your tasks tomorrow.";
  } else if (taskScore > 80) {
    return "Wonderful productivity! Remember to prioritize your prayers as well.";
  } else {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}
