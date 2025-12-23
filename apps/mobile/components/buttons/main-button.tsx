import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const MainButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF7A21', // Laranja extraído da imagem
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8, // Bordas levemente arredondadas conforme a splash
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // Sombra para iOS e Android
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});

export default MainButton;
