import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  type: 'study' | 'prayer' | 'social' | 'personal' | 'reminder' | 'deadline';
  calendarType: 'gregorian' | 'hijri';
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  location?: string;
  color?: string;
  reminder: {
    enabled: boolean;
    minutesBefore: number[];
    notificationSent: boolean[];
  };
  recurrence?: {
    type: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
    interval: number;
    daysOfWeek?: number[];
    endDate?: Date;
    occurrences?: number;
  };
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'completed' | 'cancelled';
  userId: mongoose.Types.ObjectId;
  isPublic: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['study', 'prayer', 'social', 'personal', 'reminder', 'deadline'],
    required: true
  },
  calendarType: {
    type: String,
    enum: ['gregorian', 'hijri'],
    default: 'gregorian'
  },
  startDate: {
    type: Date,
    required: true,
    index: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  location: String,
  color: String,
  reminder: {
    enabled: { type: Boolean, default: false },
    minutesBefore: { type: [Number], default: [15, 60] },
    notificationSent: { type: [Boolean], default: [] }
  },
  recurrence: {
    type: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly', 'yearly', 'custom'],
      default: 'none'
    },
    interval: { type: Number, default: 1 },
    daysOfWeek: [Number],
    endDate: Date,
    occurrences: Number
  },
  tags: [{
    type: String,
    trim: true
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  completedAt: Date,
  notes: String
}, {
  timestamps: true
});

// Indexes for performance
EventSchema.index({ userId: 1, startDate: -1 });
EventSchema.index({ userId: 1, status: 1 });
EventSchema.index({ type: 1, startDate: -1 });

export const Event = mongoose.model<IEvent>('Event', EventSchema);
