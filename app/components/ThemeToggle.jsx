import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, color } = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.surface,
      padding: 8,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: color.border,
    },
    text: {
      color: color.text,
      fontWeight: 'bold',
      marginLeft: 5,
      fontFamily: 'Prompt-Medium',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Ionicons 
        name={isDarkMode ? "sunny" : "moon"} 
        size={16} 
        color={isDarkMode ? "#FFD700" : "#7F7FBF"} 
      />
      <Text style={styles.text}>
        {isDarkMode ? "สว่าง" : "มืด"}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeToggle;