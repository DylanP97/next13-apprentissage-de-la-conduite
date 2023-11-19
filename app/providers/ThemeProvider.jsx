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
    root.style.setProperty('--60color', isDarkMode ? '#030213' : '#FFFFFF');
    root.style.setProperty('--30color', isDarkMode ? '#FFFFFF' : '#030213');
    root.style.setProperty('--10color', isDarkMode ? '#91e5f6' : '#6ab9cc');
    root.style.setProperty('--10biscolor', isDarkMode ? '#118ba3' : '#118ba3');
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
