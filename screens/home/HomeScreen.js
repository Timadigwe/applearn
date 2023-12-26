import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { rh, rw } from '../../responsive';
import { fetchBooks } from '../../utils/helpers';
import Carousel from 'react-native-snap-carousel';
import NetInfo from '@react-native-community/netinfo';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const courseAreas = [
  {
    name: 'Psychology',
    color: '#D2DFFF',
    textColor: '#4E67A8',
  },
  {
    name: 'Mathematics',
    color: '#E1FFBB',
    textColor: '#68893F',
  },
  {
    name: 'Economics',
    color: '#FFE4BB',
    textColor: '#AA8957',
  },
  {
    name: 'Engineering',
    color: '#D2DFFF',
    textColor: '#4E67A8',
  },
  {
    name: 'Banking',
    color: '#E1FFBB',
    textColor: '#68893F',
  },
  {
    name: 'Medicine',
    color: '#FFE4BB',
    textColor: '#AA8957',
  },
  {
    name: 'Finance',
    color: '#FF3636',
    textColor: 'white',
  },
];

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // Show an alert if the search query is empty
      Alert.alert('Error', 'Please enter a search query.');
      return;
    }
    // Navigate to SearchScreen with the searchQuery
    navigation.navigate('SearchScreen', { searchQuery });
    setSearchQuery('');
  };

  useEffect(() => {
    const searchTerm = ''; // Replace with your desired search term
    fetchBooks(searchTerm).then((data) => {
      setBooks(data);
      setLoading(false);
    });
    // .catch((error) => console.error('Error fetching books:', error));
  }, [loading]);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const netInfoState = await NetInfo.fetch();

      if (!netInfoState.isConnected) {
        // Navigate to the offline screen
        navigation.navigate('Offline Mode');
      }
    };

    // Subscribe to network status changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        // Navigate to the offline screen
        navigation.navigate('Offline Mode');
      }
    });

    // Initial check
    checkNetworkStatus();

    // Cleanup subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu navigation={navigation} />
      <SearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <View
        style={{
          marginVertical: rh(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SkeletonContent
          isLoading={loading}
          containerStyle={{ width: '100%' }}
          layout={[
            {
              key: 'someId',
              width: '80%',
              height: 340,
              marginBottom: 6,
              borderRadius: 20,
            },
            {
              key: 'someOtherId',
              width: '70%',
              height: 20,
              marginBottom: 6,
              borderRadius: 10,
              marginLeft: rw(10),
            },
          ]}>
          <Carousel
            data={books}
            renderItem={({ item }) => renderItem({ item, navigation, loading })}
            sliderWidth={rw(400)}
            itemWidth={rw(325)}
          />
        </SkeletonContent>
      </View>
      <View style={styles.courseAreas}>
        <Text style={styles.text}>Course Areas</Text>
        <Image
          source={require('../../assets/filter.png')}
          style={{ width: 24, height: 18 }}
        />
      </View>
      <View style={{ paddingVertical: 20 }}>
        <FlatList
          data={courseAreas}
          renderItem={({ item }) => renderCourseItem({ item, navigation })}
          keyExtractor={(item) => item.name}
          horizontal
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// Custom header component with a menu icon
const HeaderMenu = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openDrawer}>
        <Image
          source={require('../../assets/Union.png')}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Books</Text>
      <FontAwesome
        name="bell"
        size={24}
      />
    </View>
  );
};

// Search component
const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={handleSearch}>
        <FontAwesome
          name="search"
          size={18}
          color={'#373F7899'}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Search Books"
        style={styles.searchText}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const renderItem = ({ item, navigation, loading }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetailScreen', { book: item })}
      style={styles.carousel}>
      <Image
        source={{ uri: item.image }}
        style={{ width: '80%', height: 340, borderRadius: 20 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title.slice(0, 50)}...</Text>
    </TouchableOpacity>
  );
};

const renderCourseItem = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('SearchScreen', { searchQuery: item.name });
    }}>
    <View style={[styles.courseItem, { backgroundColor: item.color }]}>
      <Text style={[styles.itemText, { color: item.textColor }]}>
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: rw(20),
  },
  headerContainer: {
    marginVertical: rh(20),
    marginRight: rw(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#212330',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Roboto_700Bold',
    marginLeft: rw(-120),
  },
  searchContainer: {
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: rh(20),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    color: '#373F7899',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  carousel: {
    width: '100%',
  },
  title: {
    width: '80%',
    color: '#212330',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto_400Regular',
  },
  courseAreas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: rh(20),
  },
  text: {
    color: '#212330',
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  courseItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: rh(50),
    marginRight: rh(20),
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto_700Bold',
  },
});
