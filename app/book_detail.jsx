import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, ActivityIndicator, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        // ใช้ Google Books API แทน
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        
        const data = await response.json();
        
        // แปลงข้อมูลให้ตรงกับ structure เดิม
        const formattedBook = {
          _id: data.id,
          title: data.volumeInfo.title || 'No Title',
          author: data.volumeInfo.authors ? data.volumeInfo.authors.join(', ') : 'Unknown Author',
          description: data.volumeInfo.description || 'No description available.',
          category: data.volumeInfo.categories ? data.volumeInfo.categories[0] : 'General',
          publishedDate: data.volumeInfo.publishedDate || 'Unknown',
          pageCount: data.volumeInfo.pageCount || 'Unknown',
          publisher: data.volumeInfo.publisher || 'Unknown',
          imageLinks: data.volumeInfo.imageLinks
        };
        
        setBook(formattedBook);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Could not load book details. Please try again.");
        
        // ใช้ mock data ชั่วคราว
        setBook({
          _id: id,
          title: 'Sample Book',
          author: 'Sample Author',
          description: 'This is a sample book description for demonstration purposes.',
          category: 'Fiction',
          publishedDate: '2024',
          pageCount: '250',
          publisher: 'Sample Publisher'
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // Google Books API ไม่รองรับการลบข้อมูล เราจะซ่อนปุ่ม Delete หรือเปลี่ยนเป็น mock function
  const handleDelete = async () => {
    Alert.alert(
      "Demo Feature", 
      "Delete functionality is not available with Google Books API. In a real app, this would delete the book from your database.",
      [
        { text: "OK", onPress: () => router.push("/book") }
      ]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Demo Feature",
      "This is a demo. Books from Google Books API cannot be deleted.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Simulate Delete", 
          onPress: handleDelete, 
          style: "destructive" 
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5271FF" />
        <Text style={styles.loaderText}>Loading book details...</Text>
      </View>
    );
  }

  if (error && !book) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={60} color="#FF5252" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/book")}
        >
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const bookCover = book?.imageLinks?.thumbnail || 
                   book?.imageLinks?.smallThumbnail || 
                   "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
    
      
      <ScrollView style={styles.scrollContainer}>
        {/* Book Cover */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: bookCover }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.bookTitle}>{book?.title}</Text>
          <Text style={styles.bookAuthor}>by {book?.author}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{book?.category}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Published</Text>
              <Text style={styles.detailValue}>{book?.publishedDate}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pages</Text>
              <Text style={styles.detailValue}>{book?.pageCount}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Publisher</Text>
              <Text style={styles.detailValue}>{book?.publisher}</Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>
              {book?.description || "No description available."}
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.demoNotice}>
        <Ionicons name="information-circle" size={16} color="#666" />
        <Text style={styles.demoNoticeText}>
          Using Google Books API - Read Only
        </Text>
      </View>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => router.push(`/book_edit?id=${book?._id}`)}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Edit details</Text>
        </TouchableOpacity>
                
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={confirmDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Demo Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetail;

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
  scrollContainer: {
    flex: 1,
  },
  coverContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,
  },
  coverImage: {
    width: 180,
    height: 270,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 3,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
    textAlign: "justify",
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
  actionContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#5271FF",
  },
  deleteButton: {
    backgroundColor: "#FF5252",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
  },
  loaderText: {
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
  button: {
    backgroundColor: "#5271FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});