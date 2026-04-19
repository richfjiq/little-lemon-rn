import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({
  text,
  onPress,
  variant,
  width = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
}) => {
  let buttonStyle = styles.containerYellow;
  let buttonText = styles.blackText;

  switch (variant) {
    case 'outline':
      buttonStyle = styles.containerOutline;
      buttonText = styles.blackText;
      break;
    case 'green':
      buttonStyle = styles.containerGreen;
      buttonText = styles.whiteText;
      break;
    default:
      buttonStyle = styles.containerYellow;
      buttonText = styles.blackText;
      break;
  }
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        width !== 0 ? { width } : {},
        { marginBottom, marginTop, marginLeft, marginRight },
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={buttonText}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerYellow: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F4CE14',
  },
  containerGreen: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#495E57',
  },
  containerOutline: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#495E57',
  },
  whiteText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  blackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});
