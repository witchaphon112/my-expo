import { Stack } from "expo-router";
import ThemeToggle from "./components/ThemeToggle"; 
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function ThemedStack() {
  const { color } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: color.surface,
        },
        headerTintColor: color.text,
        headerTitleStyle: {
          color: color.text,
          fontWeight: 'bold',
          fontFamily: 'Prompt-SemiBold',
        },
        headerShadowVisible: true,
        contentStyle: {
          backgroundColor: color.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ 
          title: "ประวัติส่วนตัว", 
          headerRight: () => <ThemeToggle />
        }}
      />
      <Stack.Screen
        name="about"
        options={{ 
          title: "เกี่ยวกับรายวิชา", 
          headerRight: () => <ThemeToggle />
        }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}