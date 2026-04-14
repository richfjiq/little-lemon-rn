import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { images } from '../assets';

const HeaderScreen = ({ logo = false }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={styles.headerContainer}>
        {logo && <Image source={images.headerLogo} />}
      </View>
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
