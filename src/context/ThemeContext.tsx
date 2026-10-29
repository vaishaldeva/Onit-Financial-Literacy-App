import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'modern' | 'retro';

interface ThemeContextValue {
  theme: ThemeMode;
  isModern: boolean;
  isRetro: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'onit_theme_mode_v2';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'modern' || saved === 'retro') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'modern';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.remove('theme-modern', 'theme-retro');
    document.body.classList.add(theme === 'modern' ? 'theme-modern' : 'theme-retro');
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'modern' ? 'retro' : 'modern'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isModern: theme === 'modern',
        isRetro: theme === 'retro',
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
