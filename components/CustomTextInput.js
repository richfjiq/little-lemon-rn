import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { MaskedTextInput } from 'react-native-mask-text';

const CustomTextInput = ({
  marginBottom = 0,
  marginTop = 0,
  value,
  onChangeText,
  error,
  label = '',
  masked = false,
  ...res
}) => {
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
  inputError: {
    borderColor: '#FF3737',
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
});
