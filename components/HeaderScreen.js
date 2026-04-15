import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { images } from '../assets';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const HeaderScreen = ({
  logo = false,
  backButton = false,
  avatar = false,
  onBack = () => {},
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={styles.headerContainer}>
        {backButton && (
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            hitSlop={20}
          >
            <Ionicons name="arrow-back-circle" size={38} color="#495E57" />
          </Pressable>
        )}
        {logo && <Image source={images.headerLogo} />}
        {avatar && (
          <View style={styles.avatar}>
            <FontAwesome5 name="user-circle" size={32} color="#333333" />
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51,51,51,0.2)',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  avatar: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
});
