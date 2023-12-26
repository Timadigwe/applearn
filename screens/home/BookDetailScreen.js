import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rh, rw } from '../../responsive';
import * as FileSystem from 'expo-file-system';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const [textContent, setTextContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const navigation = useNavigation();

  console.log('books param', book);

  const handleReadBook = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      if (book.formats && book.formats['application/pdf']) {
        // Handle PDF format
        const pdfUrl = book.formats['application/pdf'];
        //console.log('PDF URL:', pdfUrl);
        const source = { uri: pdfUrl };
        navigation.navigate('PdfViewer', { source });
      } else if (
        book.formats &&
        (book.formats['text/plain; charset=us-ascii'] ||
          book.formats['text/plain; charset=utf-8'])
      ) {
        // Handle text format
        const textUrl =
          book.formats['text/plain; charset=us-ascii'] ||
          book.formats['text/plain; charset=utf-8'];

        //console.log('Text URL:', textUrl);

        // Fetch the text content
        const response = await fetch(textUrl);
        const textContent = await response.text();
        setTextContent(textContent);

        // Navigate to a new screen and pass the text content as a parameter
        navigation.navigate('TextContentScreen', { textContent });
      } else {
        // Handle the case when neither PDF nor text format is available
        Alert.alert('Error', 'No supported format found for reading');
      }
    } catch (error) {
      console.error('Error opening book:', error);
      Alert.alert('Error', 'Could not open the book');
    } finally {
      setIsLoading(false); // Set loading state to false after completion
    }
  };

  const handleSaveForLater = async () => {
    setIsLoading2(true);
    try {
      let contentToSave;

      // Check if the PDF format is available
      if (book.formats && book.formats['application/pdf']) {
        const pdfUrl = book.formats['application/pdf'];
        contentToSave = { type: 'pdf', uri: pdfUrl };
      }
      // If PDF is not available, check for text format
      else if (
        book.formats &&
        (book.formats['text/plain; charset=us-ascii'] ||
          book.formats['text/plain; charset=utf-8'])
      ) {
        const textUrl =
          book.formats['text/plain; charset=us-ascii'] ||
          book.formats['text/plain; charset=utf-8'];

        // Fetch the text content
        const response = await fetch(textUrl);
        const textContent = await response.text();
        contentToSave = { type: 'text', content: textContent };
        setIsLoading2(false);
      } else {
        setIsLoading2(false);
        // If neither PDF nor text format is available
        Alert.alert('Error', 'No supported format found for offline reading');
        return;
      }

      // Convert book object to JSON string and add content information
      const bookData = JSON.stringify({
        ...book,
        content: contentToSave,
      });

      // Create a file with a unique name (you may use book ID or another unique identifier)
      const fileName = `book_${book.id}.json`;

      // Get the directory for storing offline data (you may customize the directory)
      const directory = `${FileSystem.documentDirectory}books/`;

      // Create the directory if it doesn't exist
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Write the book data to the file
      await FileSystem.writeAsStringAsync(`${directory}${fileName}`, bookData);

      setIsLoading2(false);
      // Show an alert or perform any other action to indicate success
      Alert.alert('Success', 'Book saved for offline reading.');
    } catch (error) {
      setIsLoading2(false);
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
          {!book.image ? (
            <Image
              source={require('../../assets/default.jpg')}
              style={styles.bookImage}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{ uri: book.image }}
              style={styles.bookImage}
              resizeMode="contain"
            />
          )}
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
          onPress={handleReadBook}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color="#fff"
            />
          ) : (
            <Text style={styles.readButtonText}>Read Book</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={handleSaveForLater}>
          {isLoading2 ? (
            <ActivityIndicator
              size="small"
              color="#fff"
            />
          ) : (
            <Text
              style={styles.previewButtonText}
              disabled={isLoading2}>
              Save for later
            </Text>
          )}
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
