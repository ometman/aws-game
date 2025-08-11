import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { UserPreferences } from '../types/user';

interface AccessibilityContextType {
  preferences: UserPreferences;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

interface AccessibilityProviderProps {
  children: ReactNode;
  preferences: UserPreferences;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ 
  children, 
  preferences 
}) => {
  useEffect(() => {
    // Apply accessibility preferences to the document
    applyAccessibilitySettings(preferences);
  }, [preferences]);

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const contextValue: AccessibilityContextType = {
    preferences,
    announceToScreenReader
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

const applyAccessibilitySettings = (preferences: UserPreferences) => {
  const root = document.documentElement;
  
  // Apply theme
  root.setAttribute('data-theme', preferences.theme);
  
  // Apply font size
  root.setAttribute('data-font-size', preferences.fontSize);
  
  // Apply high contrast
  if (preferences.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }
  
  // Apply reduced motion
  if (preferences.reducedMotion) {
    root.classList.add('reduced-motion');
  } else {
    root.classList.remove('reduced-motion');
  }
  
  // Set CSS custom properties for dynamic theming
  if (preferences.theme === 'light') {
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f8fafc');
    root.style.setProperty('--text-primary', '#1e293b');
    root.style.setProperty('--text-secondary', '#64748b');
  } else {
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--bg-secondary', '#1e293b');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#cbd5e1');
  }
  
  // Font size scaling
  const fontSizeMap = {
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem'
  };
  root.style.setProperty('--font-size-base', fontSizeMap[preferences.fontSize]);
};