import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NOTIFICATION_OPTIONS } from '../utils/constants';
import { MaskedTextInput } from 'react-native-mask-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [notificationOptions, setNotificationOptions] = useState({});
  console.log('phoneNumber ----', phoneNumber);
  const clearData = async () => {
    await AsyncStorage.clear();
    navigation.goBack();
  };
  console.log(notificationOptions);
  const saveUserInfo = async () => {
    try {
      await AsyncStorage.multiSet([
        ['@Avatar', avatar ?? ''],
        ['@Name', name],
        ['@LastName', lastName],
        ['@Email', email],
        ['@PhoneNumber', phoneNumber],
        ['@NotificationOptions', JSON.stringify(notificationOptions)],
      ]);
    } catch (error) {
      console.log('----- saveUserInfo error ------', error);
    }
  };

  const loadUserInfo = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        '@Avatar',
        '@Name',
        '@LastName',
        '@Email',
        '@PhoneNumber',
        '@NotificationOptions',
      ]);
      if (values[0][1] !== '') {
        setAvatar(values[0][1]);
      }
      setName(values[1][1] ?? '');
      setLastName(values[2][1] ?? '');
      setEmail(values[3][1] ?? '');
      setPhoneNumber(values[4][1] ?? '');
      if (values[5][1]) {
        setNotificationOptions(JSON.parse(values[5][1]));
      }
    } catch (error) {
      console.log('----- loadUserInfo error ------', error);
    }
  };

  const toggleNotification = (key) => {
    setNotificationOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderOptions = useCallback(
    (key) => {
      if (!notificationOptions) return null;
      if (notificationOptions[key]) {
        return <Ionicons name="checkbox" size={24} color="#495E57" />;
      } else {
        return (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="#495E57"
          />
        );
      }
    },
    [notificationOptions],
  );

  const pickImageFromLibrary = async () => {
    try {
      const pickedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
      });
      console.log('pickedImage ++++++', pickedImage);
      setAvatar(pickedImage.assets[0].uri);
    } catch (error) {
      console.log('+++++ pickImageFromLibrary error +++++', error);
    }
  };

  const removeImage = () => {
    setAvatar(null);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    NOTIFICATION_OPTIONS.forEach((option) => {
      setNotificationOptions((prev) => ({
        ...prev,
        [option.key]: false,
      }));
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollableContainer}>
          <Text style={styles.header}>Personal Information</Text>
          <Text style={styles.regularText}>Avatar</Text>
          <View style={styles.avatarContainer}>
            {avatar === null ? (
              <FontAwesome5
                style={styles.userAvatar}
                name="user-circle"
                size={80}
                color="#333333"
              />
            ) : (
              <Image source={{ uri: avatar }} style={styles.userAvatar} />
            )}

            <CustomButton
              variant="green"
              text="Change"
              onPress={pickImageFromLibrary}
              width={90}
              marginRight={16}
            />
            <CustomButton
              variant="outline"
              text="Remove"
              onPress={removeImage}
              width={90}
            />
          </View>
          <CustomTextInput
            label="First name"
            value={name}
            onChangeText={setName}
            marginTop={20}
          />
          <CustomTextInput
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            marginTop={20}
          />
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            marginTop={20}
            keyboardType="email-address"
          />
          <CustomTextInput
            label="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            marginTop={20}
            marginBottom={32}
            keyboardType="phone-pad"
            masked
          />
          <Text style={styles.header}>Email notifications</Text>
          {NOTIFICATION_OPTIONS.map((option) => {
            return (
              <View key={option.key} style={styles.rowOption}>
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                  onPress={() => {
                    toggleNotification(option.key);
                  }}
                  hitSlop={20}
                >
                  {renderOptions(option.key)}
                </Pressable>
                <Text style={styles.optionText}>{option.label}</Text>
              </View>
            );
          })}
          <CustomButton
            text="Log out"
            variant="yellow"
            marginTop={24}
            marginBottom={48}
            onPress={clearData}
          />
          <View style={styles.buttonsRow}>
            <View style={styles.halfWidth}>
              <CustomButton
                text="Discard changes"
                variant="outline"
                onPress={loadUserInfo}
              />
            </View>
            <View style={styles.halfWidth}>
              <CustomButton
                text="Save changes"
                variant="green"
                onPress={saveUserInfo}
              />
            </View>
          </View>
          <View style={styles.footer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContainer: {
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
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  userAvatar: {
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 12,
  },
  rowOption: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfWidth: {
    width: '48%',
  },
  footer: {
    height: 32,
  },
});
