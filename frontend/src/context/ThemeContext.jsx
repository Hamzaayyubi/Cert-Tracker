import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

/**
 * ThemeProvider manages dark/light mode.
 * - Persists user preference in localStorage
 * - Applies the "dark" class to <html> for Tailwind's class-based dark mode
 * - Respects system preference on first visit
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // 2. Respect system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
