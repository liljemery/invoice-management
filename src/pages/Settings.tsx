import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Globe, 
  Bell, 
  Save, 
  RotateCcw,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Clock,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { preferencesManager, UserPreferences } from '../lib/preferences';

const Settings: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(preferencesManager.getPreferences());
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Apply preferences on component mount
    preferencesManager.applyPreferences();
  }, []);

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    // Update preferences to include language
    handlePreferenceChange('language', languageCode);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      preferencesManager.updatePreferences(preferences);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      preferencesManager.resetPreferences();
      setPreferences(preferencesManager.getPreferences());
      setCurrentLanguage('en');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getThemeLabel = () => {
    switch (preferences.theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your application preferences and settings
          </p>
        </div>
        {showSuccess && (
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2">
            <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-600 dark:text-green-400">
              Settings saved successfully
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette size={20} className="text-blue-600" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant={preferences.theme === 'light' ? 'primary' : 'outline'}
                    onClick={() => handlePreferenceChange('theme', 'light')}
                    leftIcon={<Sun size={16} />}
                  >
                    Light
                  </Button>
                  <Button
                    variant={preferences.theme === 'dark' ? 'primary' : 'outline'}
                    onClick={() => handlePreferenceChange('theme', 'dark')}
                    leftIcon={<Moon size={16} />}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={preferences.theme === 'system' ? 'primary' : 'outline'}
                    onClick={() => handlePreferenceChange('theme', 'system')}
                    leftIcon={<Monitor size={16} />}
                  >
                    System
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Current: {getThemeLabel()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Language & Regional */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe size={20} className="text-green-600" />
                <span>Language</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Language
                </label>
                <Select
                  value={currentLanguage}
                  onChange={handleLanguageChange}
                  options={[
                    { value: 'en', label: '🇺🇸 English' },
                    { value: 'es', label: '🇪🇸 Español' },
                    { value: 'fr', label: '🇫🇷 Français' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency
                  </label>
                  <Select
                    value={preferences.currency}
                    onChange={(value) => handlePreferenceChange('currency', value)}
                    options={[
                      { value: 'USD', label: '🇺🇸 USD - US Dollar' },
                      { value: 'EUR', label: '🇪🇺 EUR - Euro' },
                      { value: 'GBP', label: '🇬🇧 GBP - British Pound' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Format
                  </label>
                  <Select
                    value={preferences.dateFormat}
                    onChange={(value) => handlePreferenceChange('dateFormat', value)}
                    options={[
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Format
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant={preferences.timeFormat === '12h' ? 'primary' : 'outline'}
                    onClick={() => handlePreferenceChange('timeFormat', '12h')}
                    leftIcon={<Clock size={16} />}
                  >
                    12-hour
                  </Button>
                  <Button
                    variant={preferences.timeFormat === '24h' ? 'primary' : 'outline'}
                    onClick={() => handlePreferenceChange('timeFormat', '24h')}
                    leftIcon={<Clock size={16} />}
                  >
                    24-hour
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell size={20} className="text-purple-600" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Notifications
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive notifications for important events
                  </p>
                </div>
                <Button
                  variant={preferences.notifications ? 'primary' : 'outline'}
                  onClick={() => handlePreferenceChange('notifications', !preferences.notifications)}
                >
                  {preferences.notifications ? 'Yes' : 'No'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield size={20} className="text-orange-600" />
                <span>Advanced</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auto Save
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Automatically save changes as you work
                  </p>
                </div>
                <Button
                  variant={preferences.autoSave ? 'primary' : 'outline'}
                  onClick={() => handlePreferenceChange('autoSave', !preferences.autoSave)}
                >
                  {preferences.autoSave ? 'Yes' : 'No'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Settings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Theme:</span>
                <span className="font-medium">{getThemeLabel()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Language:</span>
                <span className="font-medium">English</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Currency:</span>
                <span className="font-medium">{preferences.currency}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Date Format:</span>
                <span className="font-medium">{preferences.dateFormat}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Time Format:</span>
                <span className="font-medium">{preferences.timeFormat}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                leftIcon={<Save size={16} />}
                className="w-full"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleReset}
                leftIcon={<RotateCcw size={16} />}
                className="w-full"
              >
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Version:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Storage:</span>
                <span>Local</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Sync:</span>
                <span>Now</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
