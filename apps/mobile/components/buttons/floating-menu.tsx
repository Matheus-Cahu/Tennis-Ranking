import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Plus, Calendar, Sword } from 'lucide-react-native'; // Ícones para as ações

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  // Estilos de animação para as opções que sobem
  const getOptionStyle = (index: number) => ({
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70 * index], // Sobe 70px por item
        }),
      },
    ],
    opacity: animation,
  });

  return (
    <View style={styles.container}>
      {/* Opção: Desafiar Tenista */}
      <Animated.View style={[styles.optionContainer, getOptionStyle(2)]}>
        <Text style={styles.optionLabel}>Desafiar tenista</Text>
        <TouchableOpacity style={[styles.miniButton, { backgroundColor: '#FF7A21' }]}>
          <Sword color="#FFF" size={20} />
        </TouchableOpacity>
      </Animated.View>

      {/* Opção: Agendar Jogo */}
      <Animated.View style={[styles.optionContainer, getOptionStyle(1)]}>
        <Text style={styles.optionLabel}>Agendar jogo</Text>
        <TouchableOpacity style={[styles.miniButton, { backgroundColor: '#FF7A21' }]}>
          <Calendar color="#FFF" size={20} />
        </TouchableOpacity>
      </Animated.View>

      {/* Botão Principal (+) */}
      <TouchableOpacity 
        style={styles.mainButton} 
        onPress={toggleMenu} 
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })}] }}>
          <Plus color="#FFF" size={30} strokeWidth={3} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100, // Acima da barra de navegação
    right: 30,
    alignItems: 'flex-end',
  },
  mainButton: {
    backgroundColor: '#FF7A21', // Laranja oficial
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  optionContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 5,
  },
  optionLabel: {
    color: '#FFF',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 15,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
  miniButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});
