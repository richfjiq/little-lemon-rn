import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Animated from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomTextInput = ({
  marginBottom = 0,
  marginTop = 0,
  value,
  onChangeText,
  error,
  label = '',
  masked = false,
  search = false,
  openInput = false,
  setInputOpen = () => {},
  placeholder = '',
  ...res
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  console.log('++++++++ openInput', openInput);
  console.log('isFocus +++++', isFocus);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeSearch = () => {
    setInputOpen(false);
    setIsFocus(false);
    onChangeText('');
    setShowPlaceholder(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (openInput) {
      setIsFocus(true);
      focusInput();
      setTimeout(() => {
        setShowPlaceholder(true);
      }, 300);
    }
  }, [openInput]);

  useEffect(() => {
    const keyboard = Keyboard.addListener('keyboardWillHide', () => {
      setIsFocus(false);
      setInputOpen(false);
      setShowPlaceholder(false);
    });

    () => {
      return keyboard.remove();
    };
  }, []);

  if (search) {
    return (
      <View style={{ marginBottom, marginTop }}>
        <Animated.View
          style={[
            styles.searchInputWrapper,
            {
              width: isFocus ? '100%' : 48,
              paddingHorizontal: isFocus ? 50 : 0,
              transitionProperty: ['width', 'paddingHorizontal'],
              transitionDuration: [300, 300],
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.iconContainer,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={() => {
              setInputOpen(true);
            }}
            disabled={openInput}
          >
            <FontAwesome5 name="search" size={24} color="black" />
          </Pressable>
          <TextInput
            style={[styles.inputSearch, error ? styles.inputError : {}]}
            value={value}
            onChangeText={onChangeText}
            ref={inputRef}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            placeholder={showPlaceholder ? placeholder : ''}
            {...res}
          />
          {value.length > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.iconContainerRight,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={closeSearch}
            >
              <AntDesign name="close-circle" size={24} color="black" />
            </Pressable>
          )}
        </Animated.View>
      </View>
    );
  }
  return (
    <View style={{ marginBottom, marginTop }}>
      {label.length > 0 && <Text style={styles.label}>{label}</Text>}
      {masked ? (
        <MaskedTextInput
          style={[styles.input, error ? styles.inputError : {}]}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          mask="999-999-9999"
          {...res}
        />
      ) : (
        <TextInput
          style={[styles.input, error ? styles.inputError : {}]}
          value={value}
          onChangeText={onChangeText}
          {...res}
        />
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputSearch: {
    height: 48,
    backgroundColor: '#EDEFEE',
    borderRadius: 48,
    fontSize: 16,
    flex: 1,
    // paddingHorizontal: 0,
  },
  inputError: {
    borderColor: '#FF3737',
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerRight: {
    position: 'absolute',
    zIndex: 10,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  searchInputWrapper: {
    height: 48,
    width: 48,
    backgroundColor: '#EDEFEE',
    borderRadius: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
