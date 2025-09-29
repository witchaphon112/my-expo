import { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

// สร้าง localStorage simulation
const myStorage = {
  getItem: async (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return null;
    } catch {
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
};

const BookNew = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert("Error", "Title and Author are required");
      return;
    }

    if (year && isNaN(Number(year))) {
      Alert.alert("Error", "Year must be a number");
      return;
    }

    if (price && isNaN(Number(price))) {
      Alert.alert("Error", "Price must be a number");
      return;
    }

    setLoading(true);

    try {
      const bookData = {
        _id: Date.now().toString(),
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
        genre: genre.trim(),
        year: year ? Number(year) : new Date().getFullYear(),
        price: price ? Number(price) : 0,
        available,
        createdAt: new Date().toISOString(),
      };

      const existingBooksJSON = await myStorage.getItem('userBooks');
      const existingBooks = existingBooksJSON ? JSON.parse(existingBooksJSON) : [];
      
      const updatedBooks = [...existingBooks, bookData];
      await myStorage.setItem('userBooks', JSON.stringify(updatedBooks));

      setTimeout(() => {
        Alert.alert(
          "Success", 
          "Book created successfully!",
          [
            { 
              text: "OK", 
              onPress: () => router.push("/book") 
            }
          ]
        );
      }, 100);
      
    } catch (err) {
      console.error("Error saving book:", err);
      Alert.alert("Error", "Failed to save book");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (title || author || description) {
      Alert.alert(
        "Confirm Cancel",
        "Are you sure you want to cancel? Any unsaved changes will be lost.",
        [
          { text: "Continue Editing", style: "cancel" },
          { text: "Discard Changes", onPress: () => router.back() }
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>


        <ScrollView style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="ป้อนชื่อผู้แต่ง"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Author *</Text>
            <TextInput
              style={styles.input}
              placeholder="ป้อนชื่อผู้แต่ง"
              value={author}
              onChangeText={setAuthor}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="ป้อนคำอธิบายหนังสือ"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Genre</Text>
            <TextInput
              style={styles.input}
              placeholder="เช่น นิยาย วิทยาศาสตร์ เป็นต้น"
              value={genre}
              onChangeText={setGenre}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                placeholder="ปีที่พิมพ์"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>มีให้ยืมไหม</Text>
            <Switch
              value={available}
              onValueChange={setAvailable}
              thumbColor={available ? "#5271FF" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.createButton, loading && styles.disabledButton]}
            onPress={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="add-circle-outline" size={20} color="#fff" />
                <Text style={styles.createButtonText}>Create Book</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BookNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: "#333",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
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
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  createButton: {
    backgroundColor: "#5271FF",
    marginLeft: 10,
  },
  createButtonText: {
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
});