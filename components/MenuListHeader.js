import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { memo } from 'react';
import CustomTextInput from './CustomTextInput';
import { images } from '../assets';

const MenuListHeader = ({
  searchString,
  setSearchString,
  openInput,
  setOpenInput,
  onCategoryPress,
  activeCategory,
}) => {
  return (
    <View>
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
      <View style={styles.categoriesContainer}>
        <Text style={styles.title}>ORDER FOR DELIVERY</Text>
        <View style={styles.categoriesRow}>
          <Pressable
            onPress={() => onCategoryPress('starters')}
            style={({ pressed }) => [
              activeCategory.starters
                ? styles.categoryButtonActive
                : styles.categoryButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text
              style={
                activeCategory.starters
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              Starters
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onCategoryPress('mains')}
            style={({ pressed }) => [
              activeCategory.mains
                ? styles.categoryButtonActive
                : styles.categoryButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text
              style={
                activeCategory.mains
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              Mains
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onCategoryPress('desserts')}
            style={({ pressed }) => [
              activeCategory.desserts
                ? styles.categoryButtonActive
                : styles.categoryButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text
              style={
                activeCategory.desserts
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              Desserts
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default memo(MenuListHeader);

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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51,51,51,0.2)',
  },
  title: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 26,
    color: '#333333',
    fontWeight: '600',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  categoryButton: {
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 14,
    color: '#495E57',
    fontWeight: '600',
  },
  categoryTextActive: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
});
