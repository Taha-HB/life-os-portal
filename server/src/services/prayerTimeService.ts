import axios from 'axios';
import moment from 'moment';
import 'moment-hijri';

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export class PrayerTimeService {
  private static instance: PrayerTimeService;
  private cache: Map<string, PrayerTimes> = new Map();
  
  static getInstance(): PrayerTimeService {
    if (!PrayerTimeService.instance) {
      PrayerTimeService.instance = new PrayerTimeService();
    }
    return PrayerTimeService.instance;
  }
  
  async getPrayerTimes(latitude: number, longitude: number, date: Date = new Date()): Promise<PrayerTimes> {
    const cacheKey = `${latitude},${longitude},${date.toDateString()}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    try {
      const response = await axios.get('http://api.aladhan.com/v1/timings', {
        params: {
          latitude,
          longitude,
          method: 2,
          date: moment(date).format('DD-MM-YYYY')
        }
      });
      
      const timings = response.data.data.timings;
      const prayerTimes: PrayerTimes = {
        fajr: timings.Fajr,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha
      };
      
      this.cache.set(cacheKey, prayerTimes);
      return prayerTimes;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      // Return fallback times
      return this.getFallbackTimes();
    }
  }
  
  private getFallbackTimes(): PrayerTimes {
    const now = new Date();
    return {
      fajr: '05:30',
      dhuhr: '12:30',
      asr: '15:45',
      maghrib: '18:30',
      isha: '20:00'
    };
  }
  
  getHijriDate(date: Date = new Date()): string {
    return moment(date).format('iYYYY/iM/iD');
  }
  
  getNextPrayer(currentTime: Date, prayerTimes: PrayerTimes): { name: string; time: Date } | null {
    const prayers = [
      { name: 'Fajr', time: prayerTimes.fajr },
      { name: 'Dhuhr', time: prayerTimes.dhuhr },
      { name: 'Asr', time: prayerTimes.asr },
      { name: 'Maghrib', time: prayerTimes.maghrib },
      { name: 'Isha', time: prayerTimes.isha }
    ];
    
    const current = moment(currentTime);
    
    for (const prayer of prayers) {
      const prayerTime = moment(prayer.time, 'HH:mm');
      if (prayerTime.isAfter(current)) {
        return {
          name: prayer.name,
          time: prayerTime.toDate()
        };
      }
    }
    
    // Return first prayer of next day
    const firstPrayer = prayers[0];
    const nextDay = moment(currentTime).add(1, 'day');
    return {
      name: firstPrayer.name,
      time: moment(`${nextDay.format('YYYY-MM-DD')} ${firstPrayer.time}`, 'YYYY-MM-DD HH:mm').toDate()
    };
  }
}

export default PrayerTimeService.getInstance();
