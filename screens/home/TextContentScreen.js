import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

const TextContentScreen = ({ route }) => {
  const { textContent } = route.params;

  // Split the text content into pages (assuming pages are separated by some delimiter)
  const pages = textContent.split('\n\n'); // You might need to adjust the delimiter

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Function to navigate to the next page
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to navigate to the previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      {/* Display the current page content */}
      <Text>{pages[currentPage]}</Text>
    </ScrollView>
  );
};

export default TextContentScreen;
