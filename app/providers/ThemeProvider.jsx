"use client"

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--60color', isDarkMode ? '#0e0d29' : '#e4e3ff');
    root.style.setProperty('--30color', isDarkMode ? '#ffffff' : '#000000');
    root.style.setProperty('--10color', isDarkMode ? '#91e5f6' : '#3f5c63');
    root.style.setProperty('--10biscolor', isDarkMode ? '#3893a6' : '#2c7585');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
