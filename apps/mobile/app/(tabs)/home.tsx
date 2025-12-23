import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  Image, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Stack } from 'expo-router';
import FeedPost from '@/components/feed-post';

// Dados fictícios baseados no seu planejamento [cite: 24]
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Vitória! Você vence João S. por 6-2, 6-4',
    tag: 'Video',
    image: require('../../assets/images/player1.png'),
  },
  {
    id: '2',
    title: 'Renata Mestre: Ansiedade 6-2, 6-4',
    tag: 'Short Video',
    image: require('../../assets/images/player2.png'),
  },
  {
    id: '3',
    title: 'Reportar Resultados por 2, 6-4',
    tag: 'Short Video',
    image: require('../../assets/images/player1.png'),
  },
  {
    id: '4',
    title: 'Reportar Resultados por 6, 6-4',
    tag: 'Short Video',
    image: require('../../assets/images/player2.png'),
  },
];

// Categorias de filtros [cite: 26]
const FILTERS = ['Meus Jogos', 'Minha Chave', 'Amigos', 'Geral'];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('Meus Jogos');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header com Logo */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/android-icon-background.png')} 
          style={styles.logo} 
        />
        <Text style={styles.logoText}>TENNIS RANK</Text>
      </View>

      {/* Barra de Filtros */}
      <View style={styles.filterContainer}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                activeFilter === item && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === item && styles.filterTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Feed de Notícias em Grid */}
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.feedContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <FeedPost 
            title={item.title}
            tag={item.tag}
            imageSource={item.image}
            onLike={() => console.log('Curtiu:', item.id)}
            onComment={() => console.log('Comentou:', item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro padrão [cite: 138]
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 4,
  },
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#FF7A21', // Laranja da marca
  },
  filterText: {
    color: '#AAA',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF',
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
