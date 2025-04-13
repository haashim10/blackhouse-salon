"use client";

import { useTheme } from "./theme-provider";

interface ThemeToggleProps {
  textColor?: string;
}

export default function ThemeToggle({ textColor }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  // Determine background color based on theme and provided text color
  const getBackgroundColor = () => {
    if (textColor) {
      return `${textColor}33`; // Use semi-transparent version of the text color
    }
    return theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
  };

  // Determine thumb color based on provided text color
  const getThumbColor = () => {
    if (textColor === '#ffffff' || textColor === '#fff') {
      return theme === 'dark' ? '#000000' : '#ffffff';
    }
    return theme === 'dark' ? '#000000' : '#ffffff';
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative inline-flex items-center p-1 rounded-full w-12 h-6 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ 
        backgroundColor: getBackgroundColor(),
        color: textColor || 'inherit',
        // Customize focus ring color if text color is provided
        '--tw-ring-color': textColor || (theme === 'dark' ? 'white' : 'black'),
      } as React.CSSProperties}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span 
        className={`absolute left-0.5 top-0.5 flex items-center justify-center w-5 h-5 rounded-full transform transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
        style={{ backgroundColor: getThumbColor() }}
      >
        {theme === 'light' ? (
          // Sun icon for light mode
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  );
}