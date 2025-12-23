import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

interface MainInputProps {
  placeholder?: string;
  icon?: any; // Para o ícone do lado direito ou esquerdo
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
}

const MainInput = ({ 
  placeholder, 
  icon, 
  onChangeText, 
  secureTextEntry = false, 
  value,
  keyboardType = 'default' 
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
      />
      {icon && (
        <Image source={icon} style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#666', // Ajusta a cor do ícone se necessário
    marginLeft: 10,
  },
});

export default MainInput;
