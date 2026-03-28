import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin' | 'super_admin';
  isActive: boolean;
  isEmailVerified: boolean;
  profilePicture?: string;
  phone?: string;
  location: {
    city: string;
    country: string;
    timezone: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  settings: any;
  spiritualStats: any;
  academicStats: any;
  portfolio: any;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  passwordChangedAt: Date;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    sparse: true
  },
  location: {
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    timezone: { type: String, default: 'UTC' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  settings: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    animations: { type: Boolean, default: true },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      telegram: { type: Boolean, default: false },
      desktop: { type: Boolean, default: true }
    },
    reminders: {
      prayer: { type: Boolean, default: true },
      dhikr: { type: Boolean, default: true },
      study: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      dailyReport: { type: Boolean, default: true }
    },
    donotDisturb: {
      enabled: { type: Boolean, default: false },
      startTime: { type: String, default: '22:00' },
      endTime: { type: String, default: '06:00' },
      daysOfWeek: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] }
    },
    telegram: {
      enabled: { type: Boolean, default: false },
      chatId: String,
      notifications: { type: Boolean, default: true }
    },
    portfolioVisibility: {
      showPersonalInfo: { type: Boolean, default: true },
      showEducation: { type: Boolean, default: true },
      showExperience: { type: Boolean, default: true },
      showSkills: { type: Boolean, default: true },
      showProjects: { type: Boolean, default: true },
      showAchievements: { type: Boolean, default: true },
      showCertifications: { type: Boolean, default: true },
      showLanguages: { type: Boolean, default: true }
    },
    privacy: {
      showOnlineStatus: { type: Boolean, default: true },
      showActivityLog: { type: Boolean, default: false },
      allowMessages: { type: Boolean, default: true }
    },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
    dateFormat: { type: String, default: 'YYYY-MM-DD' },
    weekStart: { type: Number, default: 0 }
  },
  spiritualStats: {
    prayerStreak: { type: Number, default: 0 },
    longestPrayerStreak: { type: Number, default: 0 },
    lastPrayerDate: Date,
    totalPrayers: { type: Number, default: 0 },
    onTimePrayers: { type: Number, default: 0 },
    missedPrayers: { type: Number, default: 0 },
    qadhaPrayers: { type: Number, default: 0 },
    dhikrCount: { type: Number, default: 0 },
    dailyDhikrGoal: { type: Number, default: 100 },
    quranPagesRead: { type: Number, default: 0 },
    quranPagesGoal: { type: Number, default: 1 },
    fastingDays: { type: Number, default: 0 },
    charityAmount: { type: Number, default: 0 },
    spiritualGoals: [{
      type: String,
      target: Number,
      current: Number,
      deadline: Date
    }]
  },
  academicStats: {
    studyHours: { type: Number, default: 0 },
    studySessions: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    pendingTasks: { type: Number, default: 0 },
    currentGPA: Number,
    courses: [{
      id: String,
      name: String,
      progress: Number
    }],
    achievements: [{
      id: String,
      title: String,
      date: Date,
      type: String
    }]
  },
  portfolio: {
    personalInfo: {
      fullName: String,
      title: String,
      bio: String,
      location: String,
      email: String,
      phone: String,
      website: String,
      socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        instagram: String
      }
    },
    education: [{
      id: { type: String, required: true },
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
      achievements: [String]
    }],
    experience: [{
      id: { type: String, required: true },
      company: String,
      position: String,
      location: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
      achievements: [String]
    }],
    skills: [{
      category: String,
      items: [{
        name: String,
        level: Number,
        yearsOfExperience: Number
      }]
    }],
    projects: [{
      id: { type: String, required: true },
      name: String,
      description: String,
      technologies: [String],
      link: String,
      github: String,
      image: String,
      startDate: Date,
      endDate: Date,
      featured: Boolean
    }],
    certifications: [{
      id: { type: String, required: true },
      name: String,
      issuer: String,
      date: Date,
      expiryDate: Date,
      credentialId: String,
      url: String
    }],
    languages: [{
      name: String,
      proficiency: {
        type: String,
        enum: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic']
      }
    }],
    achievements: [{
      id: { type: String, required: true },
      title: String,
      description: String,
      date: Date,
      issuer: String
    }]
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  passwordChangedAt: Date,
  refreshToken: String
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChangedAt = new Date();
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if password changed after JWT issued
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export const User = mongoose.model<IUser>('User', UserSchema);    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    sparse: true
  },
  location: {
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    timezone: { type: String, default: 'UTC' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  settings: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    animations: { type: Boolean, default: true },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      telegram: { type: Boolean, default: false },
      desktop: { type: Boolean, default: true }
    },
    reminders: {
      prayer: { type: Boolean, default: true },
      dhikr: { type: Boolean, default: true },
      study: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      dailyReport: { type: Boolean, default: true }
    },
    donotDisturb: {
      enabled: { type: Boolean, default: false },
      startTime: { type: String, default: '22:00' },
      endTime: { type: String, default: '06:00' },
      daysOfWeek: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] }
    },
    telegram: {
      enabled: { type: Boolean, default: false },
      chatId: String,
      notifications: { type: Boolean, default: true }
    },
    portfolioVisibility: {
      showPersonalInfo: { type: Boolean, default: true },
      showEducation: { type: Boolean, default: true },
      showExperience: { type: Boolean, default: true },
      showSkills: { type: Boolean, default: true },
      showProjects: { type: Boolean, default: true },
      showAchievements: { type: Boolean, default: true },
      showCertifications: { type: Boolean, default: true },
      showLanguages: { type: Boolean, default: true }
    },
    privacy: {
      showOnlineStatus: { type: Boolean, default: true },
      showActivityLog: { type: Boolean, default: false },
      allowMessages: { type: Boolean, default: true }
    },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
    dateFormat: { type: String, default: 'YYYY-MM-DD' },
    weekStart: { type: Number, default: 0 }
  },
  spiritualStats: {
    prayerStreak: { type: Number, default: 0 },
    longestPrayerStreak: { type: Number, default: 0 },
    lastPrayerDate: Date,
    totalPrayers: { type: Number, default: 0 },
    onTimePrayers: { type: Number, default: 0 },
    missedPrayers: { type: Number, default: 0 },
    qadhaPrayers: { type: Number, default: 0 },
    dhikrCount: { type: Number, default: 0 },
    dailyDhikrGoal: { type: Number, default: 100 },
    quranPagesRead: { type: Number, default: 0 },
    quranPagesGoal: { type: Number, default: 1 },
    fastingDays: { type: Number, default: 0 },
    charityAmount: { type: Number, default: 0 },
    spiritualGoals: [{
      type: String,
      target: Number,
      current: Number,
      deadline: Date
    }]
  },
  academicStats: {
    studyHours: { type: Number, default: 0 },
    studySessions: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    pendingTasks: { type: Number, default: 0 },
    currentGPA: Number,
    courses: [{
      id: String,
      name: String,
      progress: Number
    }],
    achievements: [{
      id: String,
      title: String,
      date: Date,
      type: String
    }]
  },
  portfolio: {
    personalInfo: {
      fullName: String,
      title: String,
      bio: String,
      location: String,
      email: String,
      phone: String,
      website: String,
      socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        instagram: String
      }
    },
    education: [{
      id: { type: String, required: true },
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
      achievements: [String]
    }],
    experience: [{
      id: { type: String, required: true },
      company: String,
      position: String,
      location: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
      achievements: [String]
    }],
    skills: [{
      category: String,
      items: [{
        name: String,
        level: Number,
        yearsOfExperience: Number
      }]
    }],
    projects: [{
      id: { type: String, required: true },
      name: String,
      description: String,
      technologies: [String],
      link: String,
      github: String,
      image: String,
      startDate: Date,
      endDate: Date,
      featured: Boolean
    }],
    certifications: [{
      id: { type: String, required: true },
      name: String,
      issuer: String,
      date: Date,
      expiryDate: Date,
      credentialId: String,
      url: String
    }],
    languages: [{
      name: String,
      proficiency: {
        type: String,
        enum: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic']
      }
    }],
    achievements: [{
      id: { type: String, required: true },
      title: String,
      description: String,
      date: Date,
      issuer: String
    }]
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  passwordChangedAt: Date,
  refreshToken: String
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChangedAt = new Date();
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if password changed after JWT issued
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export const User = mongoose.model<IUser>('User', UserSchema);
