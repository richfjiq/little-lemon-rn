import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Onboarding = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  console.log('(regex.test(email) ----', regex.test(email));
  const isDisabled = useCallback(() => {
    if (name.length === 0 || !isValidEmail || email.length === 0) {
      return true;
    } else {
      return false;
    }
  }, [email, name, isValidEmail]);
  console.log('isDisabled +++++', isDisabled());

  useEffect(() => {
    setIsValidEmail(regex.test(email));
  }, [email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Text style={styles.title}>Let us get to know ypu</Text>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                email.length > 0 && !isValidEmail ? styles.inputError : {},
              ]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              style={({ pressed }) => [
                isDisabled() ? styles.buttonDisabled : styles.button,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              disabled={isDisabled()}
            >
              <Text style={styles.btnText}>Next</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: '#333333',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 24,
  },
  label: {
    color: '#333333',
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonWrapper: {
    alignItems: 'flex-end',
    paddingBottom: 50,
  },
  button: {
    width: 100,
    backgroundColor: '#F4CE14',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonDisabled: {
    width: 100,
    backgroundColor: '#BFC6C4',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  btnText: {
    color: '#333333',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3737',
  },
});
