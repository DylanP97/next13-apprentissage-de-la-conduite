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
    root.style.setProperty('--60color', isDarkMode ? '#0e0d29' : '#fafaff');
    root.style.setProperty('--30color', isDarkMode ? '#ffffff' : '#112222');
    root.style.setProperty('--10color', isDarkMode ? '#91e5f6' : '#6ab9cc');
    root.style.setProperty('--10biscolor', isDarkMode ? '#51d2ec' : '#49bbd6');
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
