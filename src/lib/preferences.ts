export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: boolean;
  autoSave: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'en',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  notifications: true,
  autoSave: true,
};

const PREFERENCES_KEY = 'invoice-management-preferences';

export class PreferencesManager {
  private static instance: PreferencesManager;
  private preferences: UserPreferences;

  private constructor() {
    this.preferences = this.loadPreferences();
  }

  public static getInstance(): PreferencesManager {
    if (!PreferencesManager.instance) {
      PreferencesManager.instance = new PreferencesManager();
    }
    return PreferencesManager.instance;
  }

  private loadPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  }

  private savePreferences(): void {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(this.preferences));
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
    }
  }

  public getPreferences(): UserPreferences {
    return { ...this.preferences };
  }

  public updatePreferences(updates: Partial<UserPreferences>): void {
    this.preferences = { ...this.preferences, ...updates };
    this.savePreferences();
    this.applyPreferences();
  }

  public resetPreferences(): void {
    this.preferences = { ...DEFAULT_PREFERENCES };
    this.savePreferences();
    this.applyPreferences();
  }

  public applyPreferences(): void {
    // Apply theme
    this.applyTheme();
    
    // Apply language
    this.applyLanguage();
    
    // Apply other preferences as needed
    document.documentElement.setAttribute('data-currency', this.preferences.currency);
    document.documentElement.setAttribute('data-date-format', this.preferences.dateFormat);
    document.documentElement.setAttribute('data-time-format', this.preferences.timeFormat);
  }

  private applyTheme(): void {
    const { theme } = this.preferences;
    let isDark = false;

    if (theme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = theme === 'dark';
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private applyLanguage(): void {
    document.documentElement.setAttribute('lang', this.preferences.language);
  }

  public getTheme(): 'light' | 'dark' {
    const { theme } = this.preferences;
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }

  public isDarkMode(): boolean {
    return this.getTheme() === 'dark';
  }
}

export const preferencesManager = PreferencesManager.getInstance();
