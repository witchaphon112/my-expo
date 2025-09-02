import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Switch, Alert } from "react-native";
import { useRouter } from "expo-router";

const BookNew = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);

  const handleCreate = async () => {
  if (!title || !author) {
    Alert.alert("Error", "Title and Author are required");
    return;
  }

  const y = Number(year);
  const p = Number(price);
  if (isNaN(y) || isNaN(p)) {
    Alert.alert("Error", "Year and Price must be numbers");
    return;
  }

  const bookData = {
    title,
    author,
    description,
    genre,
    year: y,
    price: p,
    available,
  };

  try {
    const res = await fetch("http://10.0.15.34:3000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    if (res.ok) {
      Alert.alert("Success", "Book created successfully");
      router.push("/book");
    } else {
      const errData = await res.json();
      Alert.alert("Error", errData.message || "Failed to create book");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Cannot connect to server");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Book</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput style={styles.input} placeholder="Genre" value={genre} onChangeText={setGenre} />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text>Available:</Text>
        <Switch value={available} onValueChange={setAvailable} />
      </View>

      <Button title="Create Book" onPress={handleCreate} />
    </View>
  );
};

export default BookNew;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
