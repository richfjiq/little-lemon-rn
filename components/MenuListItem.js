import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { images } from '../assets';

const ListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>{`$${item.price}`}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={images[item.image.split('.')[0]]} style={styles.image} />
      </View>
    </View>
  );
};

export default ListItem;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51,51,51,0.2)',
    paddingVertical: 16,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
  },
  header: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 8,
  },
  price: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
});
