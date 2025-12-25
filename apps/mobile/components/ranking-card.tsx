import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native'; // Para o ícone lateral

interface RankingCardProps {
  name: string;
  position: number;
  bracket: string;
  imageUrl?: string;
  onPress?: () => void;
}

export default function RankingCard({ name, position, bracket, imageUrl, onPress }: RankingCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.leftContent}>
        {/* Foto de Perfil com borda circular conforme o design */}
        <Image 
          source={imageUrl ? { uri: imageUrl } : require('@/assets/images/default-avatar.jpg')} 
          style={styles.avatar} 
        />
        
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.rankingText}>#{position} - Chave {bracket}</Text>
        </View>
      </View>

      {/* Ícone de seta lateral */}
      <ChevronRight color="#888" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E', // Fundo cinza escuro do card
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF7A21', // Laranja da marca para destaque na foto
  },
  infoContainer: {
    marginLeft: 15,
  },
  nameText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  rankingText: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 2,
  },
});
