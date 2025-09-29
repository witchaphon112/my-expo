import { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "./context/ThemeContext";

const HomeScreen = () => {
  const router = useRouter();
  const { color } = useTheme();

  const navigateToBooks = () => {
    router.push("/book");
  };

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.surface} />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: color.text }]}>
            ยินดีต้อนรับ
          </Text>
          <Text style={[styles.subtitle, { color: color.textSecondary }]}>
            ห้องสมุดส่วนตัวของคุณ
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: color.primary }]}
            onPress={navigateToBooks}
          >
            <Ionicons name="book-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>จัดการหนังสือ</Text>
            <Text style={styles.actionSubtext}>ดูและแก้ไขหนังสือทั้งหมด</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: color.secondary }]}
            onPress={() => router.push("/book_new")}
          >
            <Ionicons name="add-circle-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>เพิ่มหนังสือใหม่</Text>
            <Text style={styles.actionSubtext}>เพิ่มหนังสือเล่มใหม่</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: color.text }]}>
            กิจกรรมล่าสุด
          </Text>
          {/* เพิ่ม component แสดงกิจกรรมล่าสุดที่นี่ */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 40,
  },
  actionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  actionSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
});