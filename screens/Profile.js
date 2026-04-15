import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, Text, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <Text style={styles.regularText}>Avatar</Text>
      <View>
        <FontAwesome5 name="user-circle" size={32} color="#333333" />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 20,
  },
  regularText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});
