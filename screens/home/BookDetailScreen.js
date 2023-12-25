import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rh, rw } from '../../responsive';
import * as FileSystem from 'expo-file-system';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation();

  console.log('books param', book);

  const handleReadBook = () => {
    try {
      // Assume 'book.formats["application/pdf"]' is the PDF URL
      const pdfUrl = book.formats['application/pdf'];

      console.log('PDF URL:', pdfUrl);

      const source = { uri: pdfUrl, cache: true };
      // Navigate to PdfViewer screen with the PDF URL
      navigation.navigate('PdfViewer', { source });
    } catch (error) {
      console.error('Error opening PDF:', error);
      Alert.alert('Error', 'Could not open PDF');
    }
  };

  const handleSaveForLater = async () => {
    try {
      // Convert book object to JSON string
      const bookData = JSON.stringify(book);

      // Create a file with a unique name (you may use book ID or another unique identifier)
      const fileName = `book_${book.id}.json`;

      // Get the directory for storing offline data (you may customize the directory)
      const directory = `${FileSystem.documentDirectory}books/`;

      // Create the directory if it doesn't exist
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Write the book data to the file
      await FileSystem.writeAsStringAsync(`${directory}${fileName}`, bookData);

      // Show an alert or perform any other action to indicate success
      Alert.alert('Success', 'Book saved for offline reading.');
    } catch (error) {
      console.error('Error saving book:', error);
      Alert.alert('Error', 'Could not save book for offline reading.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <FontAwesome
              name="arrow-left"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Book Details</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: book.image }}
            style={styles.bookImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.authors}>
            {book.authors.map((author) => author.name).join(', ')}
          </Text>
          <Text style={styles.downloadCount}>
            Downloads: {book.downloadCount}
          </Text>
          <Text style={styles.languages}>
            Languages: {book.languages.join(', ')}
          </Text>
          <Text style={styles.subjects}>
            Subjects: {book.subjects.join(', ')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.readButton}
          onPress={handleReadBook}>
          <Text style={styles.readButtonText}>Read Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={handleSaveForLater}>
          <Text style={styles.previewButtonText}>Save for later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  backButton: {
    marginLeft: 10,
  },
  imageContainer: {
    height: rh(230),
    overflow: 'hidden',
    margin: 10,
    borderRadius: 20,
  },
  bookImage: {
    flex: 1,
  },
  readButton: {
    backgroundColor: '#6997FF',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  readButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  previewButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookDetails: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212330',
    marginBottom: rh(10),
  },
  authors: {
    fontSize: 18,
    color: '#373F78',
    marginBottom: rh(10),
  },
  downloadCount: {
    fontSize: 16,
    color: '#373F78',
    marginBottom: rh(10),
  },
  languages: {
    fontSize: 16,
    color: '#373F78',
    marginBottom: rh(10),
  },
  subjects: {
    fontSize: 16,
    color: '#373F78',
    marginBottom: rh(10),
  },
});

export default BookDetailScreen;
