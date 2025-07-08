import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(deviceColorScheme === 'dark');
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    color: {
      background: isDarkMode ? "#121212" : "#f5f5f5",
      text: isDarkMode ? "#FFFFFF" : "#333333",
      textSecondary: isDarkMode ? "#B3B3B3" : "#666666",
      surface: isDarkMode ? "#1E1E1E" : "#FFFFFF",
      primary: isDarkMode ? "#90CAF9" : "#4e8cff",
      secondary: isDarkMode ? "#03DAC6" : "#03DAC5",
      error: isDarkMode ? "#CF6679" : "#B00020",
      border: isDarkMode ? "#333333" : "#e0e0e0",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};