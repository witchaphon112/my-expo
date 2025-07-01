import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#4e8cff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Prompt-Bold',
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'Prompt-Regular',
    textAlign: 'center',
  },
  idNumber: {
    fontSize: 14,
    color: '#4e8cff',
    marginBottom: 5,
    fontFamily: 'Prompt-Medium',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    fontFamily: 'Prompt-SemiBold',
    borderBottomWidth: 2,
    borderBottomColor: '#4e8cff',
    paddingBottom: 5,
    
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillTag: {
    backgroundColor: '#e3f2ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  skillText: {
    color: '#1a73e8',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  educationCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Prompt-Medium',
  },
  educationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'Prompt-Regular',
  },
  educationDate: {
    fontSize: 13,
    color: '#4e8cff',
    marginBottom: 8,
    fontFamily: 'Prompt-Medium',
  },
  educationDetail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Prompt-Regular',
  },
  aboutMeText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    fontFamily: 'Prompt-Regular',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0e6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#ff8c41',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Prompt-Medium',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#555',
    fontFamily: 'Prompt-Regular',
  },
});

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>วิชญ์พล ยืนยง</Text>
        <Text style={styles.bio}>สาขาวิชาวิทยาการคอมพิวเตอร์และสารสนเทศ</Text>
        <Text style={styles.idNumber}>รหัสนักศึกษา: 653450103-3</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>เกี่ยวกับฉัน</Text>
        <Text style={styles.aboutMeText}>
          นักศึกษาคอมพิวเตอร์ที่หลงใหลในการพัฒนาซอฟต์แวร์และการเขียนโค้ด มีความสนใจในด้านปัญญาประดิษฐ์และการพัฒนาเว็บแอปพลิเคชัน 
          ชอบเรียนรู้เทคโนโลยีใหม่ๆ และทำงานร่วมกับทีมเพื่อสร้างนวัตกรรม
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ทักษะความสามารถ</Text>
        <View style={styles.skillsContainer}>
          {['JavaScript', 'React', 'Python', 'Java', 'SQL', 'Git', 'HTML/CSS', 'Node.js', 'Flutter', 'Docker'].map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>การศึกษา</Text>
        <View style={styles.educationCard}>
          <Text style={styles.educationTitle}>วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์</Text>
          <Text style={styles.educationSubtitle}>มหาวิทยาลัยขอนแก่น</Text>
          <Text style={styles.educationDate}>2565 - ปัจจุบัน</Text>
          <Text style={styles.educationDetail}>คณะสหวิทยาการ</Text>
          <Text style={styles.educationDetail}>เกรดเฉลี่ยสะสม: 4.00</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ความสนใจ</Text>
        <View style={styles.interestsContainer}>
          <View style={styles.interestItem}>
            <Ionicons name="code" size={16} color="#ff8c41" />
            <Text style={styles.interestText}>การเขียนโค้ด</Text>
          </View>
          <View style={styles.interestItem}>
            <Ionicons name="hardware-chip" size={16} color="#ff8c41" />
            <Text style={styles.interestText}>AI & ML</Text>
          </View>
          <View style={styles.interestItem}>
            <Ionicons name="headset" size={16} color="#ff8c41" />
            <Text style={styles.interestText}>ดนตรี</Text>
          </View>
          <View style={styles.interestItem}>
            <Ionicons name="football" size={16} color="#ff8c41" />
            <Text style={styles.interestText}>กีฬา</Text>
          </View>
          <View style={styles.interestItem}>
            <Ionicons name="book" size={16} color="#ff8c41" />
            <Text style={styles.interestText}>การอ่าน</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ติดต่อ</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={20} color="#4e8cff" />
          <Text style={styles.contactText}>witchaphon.y@kkumail.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call" size={20} color="#4e8cff" />
          <Text style={styles.contactText}>095-704-4551</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="logo-github" size={20} color="#4e8cff" />
          <Text style={styles.contactText}>https://github.com/witchaphon112</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;