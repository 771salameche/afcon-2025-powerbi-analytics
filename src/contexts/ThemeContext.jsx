import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Attempt to get theme from localStorage, default to 'dark' if not found
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Add or remove 'dark' class on <html> element
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Store preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Set the initial class based on the theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('transition-colors', 'duration-300', 'ease-in-out'); // Smooth transition for theme changes
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
