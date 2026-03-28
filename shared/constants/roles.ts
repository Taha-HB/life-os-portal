export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export enum Permission {
  // User permissions
  VIEW_DASHBOARD = 'view_dashboard',
  MANAGE_EVENTS = 'manage_events',
  MANAGE_NOTES = 'manage_notes',
  VIEW_REPORTS = 'view_reports',
  MANAGE_SETTINGS = 'manage_settings',
  
  // Admin permissions
  VIEW_ALL_USERS = 'view_all_users',
  MANAGE_USERS = 'manage_users',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_ANNOUNCEMENTS = 'manage_announcements',
  MANAGE_SYSTEM_SETTINGS = 'manage_system_settings',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
  MANAGE_BACKUPS = 'manage_backups',
  
  // Super Admin permissions
  MANAGE_ADMINS = 'manage_admins',
  VIEW_ALL_LOGS = 'view_all_logs',
  SYSTEM_MAINTENANCE = 'system_maintenance'
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_EVENTS,
    Permission.MANAGE_NOTES,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_SETTINGS
  ],
  [UserRole.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_EVENTS,
    Permission.MANAGE_NOTES,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_ANNOUNCEMENTS,
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_AUDIT_LOGS
  ],
  [UserRole.SUPER_ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_EVENTS,
    Permission.MANAGE_NOTES,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_ANNOUNCEMENTS,
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_AUDIT_LOGS,
    Permission.MANAGE_BACKUPS,
    Permission.MANAGE_ADMINS,
    Permission.VIEW_ALL_LOGS,
    Permission.SYSTEM_MAINTENANCE
  ]
};  ],
  [UserRole.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_EVENTS,
    Permission.MANAGE_NOTES,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_ANNOUNCEMENTS,
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_AUDIT_LOGS
  ],
  [UserRole.SUPER_ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_EVENTS,
    Permission.MANAGE_NOTES,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_ANNOUNCEMENTS,
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_AUDIT_LOGS,
    Permission.MANAGE_BACKUPS,
    Permission.MANAGE_ADMINS,
    Permission.VIEW_ALL_LOGS,
    Permission.SYSTEM_MAINTENANCE
  ]
};
