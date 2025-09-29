import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const BookEdit = () => {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setFetching(true);
        // ใช้ Google Books API แทน
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch book data");
        }
        
        const data = await res.json();
        
        // แปลงข้อมูลจาก Google Books API
        setTitle(data.volumeInfo?.title || "");
        setAuthor(data.volumeInfo?.authors?.join(', ') || "");
        setDescription(data.volumeInfo?.description || "");
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(err.message);
        
        // ใช้ mock data ชั่วคราว
        setTitle("Sample Book Title");
        setAuthor("Sample Author");
        setDescription("This is a sample book description for demonstration purposes.");
      } finally {
        setFetching(false);
      }
    };
    
    if (id) fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    // Google Books API ไม่อนุญาตให้แก้ไขข้อมูล
    Alert.alert(
      "Demo Feature",
      "This is a demo. Books from Google Books API cannot be edited.\n\nConsider implementing your own backend API or using a service like Firebase to enable editing functionality.",
      [
        { text: "OK" }
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  if (fetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5271FF" />
        <Text style={styles.loadingText}>Loading book data...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        
        {/* Demo Notice */}
        <View style={styles.demoNotice}>
          <Ionicons name="information-circle" size={16} color="#666" />
          <Text style={styles.demoNoticeText}>
            Using Google Books API - Read Only
          </Text>
        </View>

        <ScrollView style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              value={title}
              onChangeText={setTitle}
              placeholder="Book title"
              placeholderTextColor="#999"
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Author</Text>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              value={author}
              onChangeText={setAuthor}
              placeholder="Author name"
              placeholderTextColor="#999"
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, styles.readOnlyInput]}
              value={description}
              onChangeText={setDescription}
              placeholder="Book description"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              numberOfLines={6}
              editable={false}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.saveButton, styles.disabledButton]}
            onPress={handleUpdate}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.saveButtonText}>View Only</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BookEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "#333",
  },
  demoNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff3cd",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 8,
  },
  demoNoticeText: {
    fontSize: 12,
    color: "#856404",
    marginLeft: 5,
    fontStyle: "italic",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  readOnlyInput: {
    backgroundColor: "#f9f9f9",
    color: "#666",
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#6c757d",
    marginLeft: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: "#f5f5f7",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f7",
  },
  errorText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#5271FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});