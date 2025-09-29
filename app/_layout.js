import { Stack } from "expo-router";
import ThemeToggle from "./components/ThemeToggle"; 
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function AuthScreen() {
  const { authenticate, isLoading, isBiometricSupported } = useAuth();
  const { color } = useTheme();

  const handleAuthenticate = async () => {
    await authenticate();
  };

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={[styles.loadingText, { color: color.text }]}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.centerContainer, { backgroundColor: color.background }]}>
      <Text style={[styles.title, { color: color.text }]}>Book Library</Text>
      <Text style={[styles.subtitle, { color: color.textSecondary }]}>Secure Access</Text>
      
      <TouchableOpacity 
        style={[styles.authButton, { backgroundColor: color.primary }]} 
        onPress={handleAuthenticate}
      >
        <Ionicons name={isBiometricSupported ? "finger-print" : "lock-closed"} size={24} color="#fff" />
        <Text style={styles.authButtonText}>
          {isBiometricSupported ? "Authenticate to Continue" : "Enter with Passcode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ThemedStack() {
  const { color } = useTheme();
  const { logout } = useAuth();
  
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
          title: "หน้าหลัก", 
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemeToggle />
              <TouchableOpacity 
                onPress={logout} 
                style={{ marginLeft: 15, padding: 5 }}
              >
                <Ionicons name="log-out-outline" size={24} color={color.text} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="book"
        options={{ 
          title: "หนังสือ", 
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemeToggle />
              <TouchableOpacity 
                onPress={logout} 
                style={{ marginLeft: 15, padding: 5 }}
              >
                <Ionicons name="log-out-outline" size={24} color={color.text} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="book_detail"
        options={{ 
          title: "เกี่ยวกับหนังสือ", 
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemeToggle />
              <TouchableOpacity 
                onPress={logout} 
                style={{ marginLeft: 15, padding: 5 }}
              >
                <Ionicons name="log-out-outline" size={24} color={color.text} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="book_edit"
        options={{ 
          title: "แก้ไขหนังสือ", 
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemeToggle />
              <TouchableOpacity 
                onPress={logout} 
                style={{ marginLeft: 15, padding: 5 }}
              >
                <Ionicons name="log-out-outline" size={24} color={color.text} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="book_new"
        options={{ 
          title: "เพิ่มหนังสือ", 
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemeToggle />
              <TouchableOpacity 
                onPress={logout} 
                style={{ marginLeft: 15, padding: 5 }}
              >
                <Ionicons name="log-out-outline" size={24} color={color.text} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack>
  );
}

// Main Layout Component
function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { color } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return isAuthenticated ? <ThemedStack /> : <AuthScreen />;
}

// Export default Layout
export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  authButton: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});