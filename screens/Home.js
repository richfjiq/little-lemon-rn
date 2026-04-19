import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { images } from '../assets';
import CustomTextInput from '../components/CustomTextInput';

const Home = () => {
  const [searchString, setSearchString] = useState('');
  const [openInput, setOpenInput] = useState(false);

  return (
    <View style={styles.containers}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Little Lemon</Text>
        <View style={styles.heroContainer}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.subHeader}>Chicago</Text>
            <Text style={styles.regularText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <View style={styles.heroImageContainer}>
            <Image source={images.homeHero} style={styles.heroImage} />
          </View>
        </View>
        <CustomTextInput
          value={searchString}
          onChangeText={setSearchString}
          marginTop={12}
          search
          openInput={openInput}
          setInputOpen={setOpenInput}
          placeholder="Search"
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#495E57',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Karla-Regular',
    fontSize: 48,
    color: '#F4CE14',
  },
  subHeader: {
    fontFamily: 'Karla-Regular',
    fontSize: 26,
    color: 'white',
  },
  heroContainer: {
    flexDirection: 'row',
  },
  heroImage: {
    width: '100%',
    // height: 90,
    resizeMode: 'contain',
  },
  heroTextContainer: {
    flex: 2 / 3,
  },
  heroImageContainer: {
    flex: 1 / 3,
    paddingLeft: 8,
  },
  regularText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    color: 'white',
    marginTop: 12,
  },
});
