import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = ({ route }) => {
  const { source } = route.params;
  if (!source || !source.uri) {
    // Handle the case when source or source.uri is null
    console.error('Invalid source:', source);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily: 'Roboto_300Light',
            fontSize: 16,
            color: 'blue',
          }}>
          The Pdf for this book was not found
        </Text>
      </View>
    );
  }

  console.log('source', source.uri);
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        style={{ flex: 1 }}
        source={{ uri: source.uri, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PdfViewer;
