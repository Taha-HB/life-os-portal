export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isActive: boolean;
  isEmailVerified: boolean;
  profilePicture?: string;
  phone?: string;
  location?: {
    city: string;
    country: string;
    timezone: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  settings: IUserSettings;
  spiritualStats: ISpiritualStats;
  academicStats: IAcademicStats;
  portfolio: IPortfolio;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  passwordChangedAt: Date;
}

export interface IUserSettings {
  theme: 'light' | 'dark' | 'system';
  animations: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    telegram: boolean;
    desktop: boolean;
  };
  reminders: {
    prayer: boolean;
    dhikr: boolean;
    study: boolean;
    events: boolean;
    dailyReport: boolean;
  };
  donotDisturb: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
  };
  telegram: {
    enabled: boolean;
    chatId?: string;
    notifications: boolean;
  };
  portfolioVisibility: {
    showPersonalInfo: boolean;
    showEducation: boolean;
    showExperience: boolean;
    showSkills: boolean;
    showProjects: boolean;
    showAchievements: boolean;
    showCertifications: boolean;
    showLanguages: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    showActivityLog: boolean;
    allowMessages: boolean;
  };
  language: string;
  timezone: string;
  dateFormat: string;
  weekStart: number;
}

export interface ISpiritualStats {
  prayerStreak: number;
  longestPrayerStreak: number;
  lastPrayerDate: Date;
  totalPrayers: number;
  onTimePrayers: number;
  missedPrayers: number;
  qadhaPrayers: number;
  dhikrCount: number;
  dailyDhikrGoal: number;
  quranPagesRead: number;
  quranPagesGoal: number;
  fastingDays: number;
  charityAmount: number;
  spiritualGoals: {
    type: string;
    target: number;
    current: number;
    deadline: Date;
  }[];
}

export interface IAcademicStats {
  studyHours: number;
  studySessions: number;
  completedTasks: number;
  pendingTasks: number;
  currentGPA?: number;
  courses: {
    id: string;
    name: string;
    progress: number;
  }[];
  achievements: {
    id: string;
    title: string;
    date: Date;
    type: string;
  }[];
}

export interface IPortfolio {
  personalInfo: {
    fullName: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    phone?: string;
    website?: string;
    socialLinks: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      instagram?: string;
    };
  };
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  experience: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      level: number;
      yearsOfExperience: number;
    }[];
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
    image?: string;
    startDate: Date;
    endDate?: Date;
    featured: boolean;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: Date;
    expiryDate?: Date;
    credentialId?: string;
    url?: string;
  }[];
  languages: {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: Date;
    issuer?: string;
  }[];
}  };
  reminders: {
    prayer: boolean;
    dhikr: boolean;
    study: boolean;
    events: boolean;
    dailyReport: boolean;
  };
  donotDisturb: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
  };
  telegram: {
    enabled: boolean;
    chatId?: string;
    notifications: boolean;
  };
  portfolioVisibility: {
    showPersonalInfo: boolean;
    showEducation: boolean;
    showExperience: boolean;
    showSkills: boolean;
    showProjects: boolean;
    showAchievements: boolean;
    showCertifications: boolean;
    showLanguages: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    showActivityLog: boolean;
    allowMessages: boolean;
  };
  language: string;
  timezone: string;
  dateFormat: string;
  weekStart: number;
}

export interface ISpiritualStats {
  prayerStreak: number;
  longestPrayerStreak: number;
  lastPrayerDate: Date;
  totalPrayers: number;
  onTimePrayers: number;
  missedPrayers: number;
  qadhaPrayers: number;
  dhikrCount: number;
  dailyDhikrGoal: number;
  quranPagesRead: number;
  quranPagesGoal: number;
  fastingDays: number;
  charityAmount: number;
  spiritualGoals: {
    type: string;
    target: number;
    current: number;
    deadline: Date;
  }[];
}

export interface IAcademicStats {
  studyHours: number;
  studySessions: number;
  completedTasks: number;
  pendingTasks: number;
  currentGPA?: number;
  courses: {
    id: string;
    name: string;
    progress: number;
  }[];
  achievements: {
    id: string;
    title: string;
    date: Date;
    type: string;
  }[];
}

export interface IPortfolio {
  personalInfo: {
    fullName: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    phone?: string;
    website?: string;
    socialLinks: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      instagram?: string;
    };
  };
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  experience: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      level: number;
      yearsOfExperience: number;
    }[];
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
    image?: string;
    startDate: Date;
    endDate?: Date;
    featured: boolean;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: Date;
    expiryDate?: Date;
    credentialId?: string;
    url?: string;
  }[];
  languages: {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: Date;
    issuer?: string;
  }[];
}
