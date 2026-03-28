import mongoose, { Schema, Document } from 'mongoose';
export interface IPrayer extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  hijriDate: string;
  prayers: {
    fajr: {
      time: Date;
      performed: boolean;
      performedAt?: Date;
      onTime: boolean;
      qadha: boolean;
      notes?: string;
    };
    dhuhr: {
      time: Date;
      performed: boolean;
      performedAt?: Date;
      onTime: boolean;
      qadha: boolean;
      notes?: string;
    };
    asr: {
      time: Date;
      performed: boolean;
      performedAt?: Date;
      onTime: boolean;
      qadha: boolean;
      notes?: string;
    };
    maghrib: {
      time: Date;
      performed: boolean;
      performedAt?: Date;
      onTime: boolean;
      qadha: boolean;
      notes?: string;
    };
    isha: {
      time: Date;
      performed: boolean;
      performedAt?: Date;
      onTime: boolean;
      qadha: boolean;
      notes?: string;
    };
  };
  additionalPrayers: {
    tahajjud: { performed: boolean; notes?: string };
    duha: { performed: boolean; notes?: string };
    witr: { performed: boolean; notes?: string };
  };
  dhikr: {
    count: number;
    goal: number;
    completed: boolean;
    notes?: string;
  };
  quran: {
    pagesRead: number;
    goal: number;
    surah?: string;
    ayah?: string;
    notes?: string;
  };
  fasting: {
    type: 'obligatory' | 'voluntary' | 'none';
    performed: boolean;
    notes?: string;
  };
  charity: {
    amount: number;
    description?: string;
  };
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const PrayerSchema = new Schema<IPrayer>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  hijriDate: String,
  prayers: {
    fajr: {
      time: Date,
      performed: { type: Boolean, default: false },
      performedAt: Date,
      onTime: { type: Boolean, default: false },
      qadha: { type: Boolean, default: false },
      notes: String
    },
    dhuhr: {
      time: Date,
      performed: { type: Boolean, default: false },
      performedAt: Date,
      onTime: { type: Boolean, default: false },
      qadha: { type: Boolean, default: false },
      notes: String
    },
    asr: {
      time: Date,
      performed: { type: Boolean, default: false },
      performedAt: Date,
      onTime: { type: Boolean, default: false },
      qadha: { type: Boolean, default: false },
      notes: String
    },
    maghrib: {
      time: Date,
      performed: { type: Boolean, default: false },
      performedAt: Date,
      onTime: { type: Boolean, default: false },
      qadha: { type: Boolean, default: false },
      notes: String
    },
    isha: {
      time: Date,
      performed: { type: Boolean, default: false },
      performedAt: Date,
      onTime: { type: Boolean, default: false },
      qadha: { type: Boolean, default: false },
      notes: String
    }
  },
  additionalPrayers: {
    tahajjud: {
      performed: { type: Boolean, default: false },
      notes: String
    },
    duha: {
      performed: { type: Boolean, default: false },
      notes: String
    },
    witr: {
      performed: { type: Boolean, default: false },
      notes: String
    }
  },
  dhikr: {
    count: { type: Number, default: 0 },
    goal: { type: Number, default: 100 },
    completed: { type: Boolean, default: false },
    notes: String
  },
  quran: {
    pagesRead: { type: Number, default: 0 },
    goal: { type: Number, default: 1 },
    surah: String,
    ayah: String,
    notes: String
  },
  fasting: {
    type: {
      type: String,
      enum: ['obligatory', 'voluntary', 'none'],
      default: 'none'
    },
    performed: { type: Boolean, default: false },
    notes: String
  },
  charity: {
    amount: { type: Number, default: 0 },
    description: String
  },
  notes: String
}, {
  timestamps: true
});

PrayerSchema.index({ userId: 1, date: -1 }, { unique: true });

export const Prayer = mongoose.model<IPrayer>('Prayer', PrayerSchema);
