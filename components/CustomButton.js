import { View, Text, StyleSheet } from 'react-native';

const CustomButton = ({ text, onPress, variant }) => {
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
    <View style={buttonStyle}>
      <Text style={buttonText}>{text}</Text>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerYellow: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F4CE14',
  },
  containerGreen: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#495E57',
  },
  containerOutline: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
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
