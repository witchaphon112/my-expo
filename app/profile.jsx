import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Image,
  TextInput
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = async (query = 'programming') => {
    try {
      setError(null);
      
      // ใช้ Google Books API
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log("Books fetched successfully");
      
      // แปลงข้อมูลให้ตรงกับ structure เดิม
      const formattedBooks = data.items.map(item => ({
        _id: item.id,
        title: item.volumeInfo.title || 'No Title',
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
        description: item.volumeInfo.description || 'No description available',
        imageLinks: item.volumeInfo.imageLinks
      }));
      
      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError("Could not load books. Please try again later.");
      
      // ใช้ mock data เมื่อ API ล้มเหลว
      setBooks([
        {
          _id: '1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          description: 'A classic novel about the American Dream'
        },
        {
          _id: '2',
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          description: 'A story about racial injustice and moral growth'
        }
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBooks(searchQuery || 'programming');
  };

  const handleSearch = () => {
    setLoading(true);
    fetchBooks(searchQuery);
  };

  const handleBookSelect = (bookId) => {
    router.push(`/book_detail?id=${bookId}`);
  };

  const filteredBooks = searchQuery.trim() === '' 
    ? books 
    : books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const renderBookItem = ({ item }) => {
    const bookCover = item.imageLinks?.thumbnail || 
                     "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop";
    
    return (
      <TouchableOpacity
        style={styles.bookCard}
        onPress={() => handleBookSelect(item._id)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: bookCover }}
          style={styles.bookCover}
          resizeMode="cover"
        />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
          <Text style={styles.bookDescription} numberOfLines={2}>
            {item.description || "No description available"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#aaa" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f7" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#5271FF" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#5271FF" />
          <Text style={styles.loaderText}>Loading books...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#FF5252" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRefresh}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item._id}
          renderItem={renderBookItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#5271FF"]}
              tintColor="#5271FF"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>
                {searchQuery ? "No books match your search" : "No books available"}
              </Text>
            </View>
          }
        />
      )}
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/book_new")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// เพิ่ม Styles สำหรับ Search
const styles = StyleSheet.create({
  // ... existing styles ...
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  searchButton: {
    padding: 5,
  },
});

export default Book;