import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/app/providers/ThemeProvider';

const ThemeToggler = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggler" onClick={toggleTheme}>
      {
        isDarkMode ? (
          <>
            <p>{!isDarkMode ? 'Mode nuit' : 'Mode jour'}</p>
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className={isDarkMode ? 'light-mode' : 'dark-mode'}
              size="xl"
            />
          </>) : (
          <>
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className={isDarkMode ? 'light-mode' : 'dark-mode'}
              size="xl"
            />
            <p>{!isDarkMode ? 'Mode nuit' : 'Mode jour'}</p>
          </>
        )

      }
    </div>
  );
};

export default ThemeToggler;
