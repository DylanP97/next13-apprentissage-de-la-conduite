import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/app/providers/ThemeProvider';

const ThemeToggler = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggler" onClick={toggleTheme}>
      <FontAwesomeIcon
        icon={isDarkMode ? faSun : faMoon}
        className={isDarkMode ? 'light-mode' : 'dark-mode'}
        size="xl"
      />
    </div>
  );
};

export default ThemeToggler;
