import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useTheme } from "./context/ThemeContext"; 
import { Ionicons } from "@expo/vector-icons";

const About = () => {
  const { color, isDarkMode } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    header: {
      alignItems: 'center',
      padding: 25,
      backgroundColor: color.surface,
      borderBottomWidth: 1,
      borderBottomColor: color.border,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: color.text,
      marginBottom: 15,
      fontFamily: 'Prompt-Bold',
    },
    courseImage: {
      width: 120,
      height: 120,
      marginBottom: 20,
    },
    section: {
      backgroundColor: color.surface,
      padding: 20,
      marginTop: 10,
      marginBottom: 15,
      marginHorizontal: 15,
      borderRadius: 10,
      shadowColor: isDarkMode ? '#000' : '#333',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: color.text,
      fontFamily: 'Prompt-SemiBold',
      borderBottomWidth: 2,
      borderBottomColor: color.primary,
      paddingBottom: 5,
    },
    text: {
      fontSize: 16,
      color: color.textSecondary,
      lineHeight: 24,
      marginBottom: 15,
      fontFamily: 'Prompt-Regular',
    },
    courseDetail: {
      fontSize: 16,
      color: color.text,
      marginBottom: 10,
      fontFamily: 'Prompt-Medium',
    },
    courseItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    courseText: {
      fontSize: 15,
      color: color.textSecondary,
      marginLeft: 10,
      fontFamily: 'Prompt-Regular',
    },
    highlightBox: {
      backgroundColor: isDarkMode ? '#2a3c57' : '#e3f2ff',
      padding: 15,
      borderRadius: 8,
      marginTop: 10,
    },
    highlightText: {
      color: isDarkMode ? '#90caf9' : '#1a73e8',
      fontSize: 15,
      fontFamily: 'Prompt-Medium',
      textAlign: 'center',
    },
    instructorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9',
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
    },
    instructorImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    instructorName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: color.text,
      marginBottom: 5,
      fontFamily: 'Prompt-SemiBold',
    },
    instructorDetail: {
      fontSize: 14,
      color: color.textSecondary,
      fontFamily: 'Prompt-Regular',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.title}>วิชาพัฒนาแอปพลิเคชันบนมือถือ</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>เกี่ยวกับรายวิชา</Text>
        <Text style={styles.text}>
          รายวิชานี้มุ่งเน้นการพัฒนาแอปพลิเคชันบนอุปกรณ์เคลื่อนที่ โดยใช้เทคโนโลยีและเครื่องมือที่ทันสมัย 
          นักศึกษาจะได้เรียนรู้การออกแบบส่วนติดต่อผู้ใช้ การจัดการข้อมูล และการทำงานกับคุณสมบัติต่างๆ ของอุปกรณ์มือถือ
        </Text>
        
        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>
            การเรียนรู้จากการลงมือปฏิบัติ ด้วยโปรเจคจริงและกรณีศึกษาที่หลากหลาย
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ข้อมูลรายวิชา</Text>
        
        <View style={styles.courseItem}>
          <Ionicons name="book" size={20} color={color.primary} />
          <Text style={styles.courseText}>รหัสวิชา: IN405109</Text>
        </View>
        
        <View style={styles.courseItem}>
          <Ionicons name="time" size={20} color={color.primary} />
          <Text style={styles.courseText}>ภาคการศึกษา: 1/2568</Text>
        </View>
        
        <View style={styles.courseItem}>
          <Ionicons name="calendar" size={20} color={color.primary} />
          <Text style={styles.courseText}>วัน-เวลาเรียน: วันอังคาร 8:30-12:00 น.</Text>
        </View>
        
        <View style={styles.courseItem}>
          <Ionicons name="location" size={20} color={color.primary} />
          <Text style={styles.courseText}>ห้องเรียน: NK2316</Text>
        </View>
        
        <View style={styles.courseItem}>
          <Ionicons name="school" size={20} color={color.primary} />
          <Text style={styles.courseText}>หน่วยกิต: 3(2-2-5)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ผู้สอน</Text>
        
        <View style={styles.instructorContainer}>

          <View>
            <Text style={styles.instructorName}>อ.ธนภัทร วงษ์คำจันทร์</Text>
            <Text style={styles.instructorDetail}>ภาควิชาวิทยาการคอมพิวเตอร์</Text>
            <Text style={styles.instructorDetail}>คณะวิทยาศาสตร์</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

export default About;