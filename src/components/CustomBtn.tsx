import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

interface CustomBtnProps {
  onPress: () => void;
  loading?: boolean;
  title?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomBtn: React.FC<CustomBtnProps> = ({
  onPress,
  loading = false,
  title = '',
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.darkButton, buttonStyle]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  darkButton: {
    backgroundColor: '#00D563',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
