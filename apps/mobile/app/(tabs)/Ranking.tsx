import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Switch
} from 'react-native';
import { Search } from 'lucide-react-native';
import RankingCard from '@/components/ranking-card';
// 1. Importe o novo componente
import FloatingMenu from '@/components/buttons/floating-menu';

export default function RankingScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Ranking Geral');
  const [isGenderFilterActive, setIsGenderFilterActive] = useState(false);

  const players = [
    { id: '1', name: 'Carlos S', position: 1, bracket: 'A', gender: 'Masculino', image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Rafael N', position: 2, bracket: 'A', gender: 'Masculino', image: 'https://i.pravatar.cc/150?u=3' },
    { id: '3', name: 'Roger F', position: 3, bracket: 'B', gender: 'Masculino', image: 'https://i.pravatar.cc/150?u=4' },
    { id: '4', name: 'Serena W', position: 1, bracket: 'A', gender: 'Feminino', image: 'https://i.pravatar.cc/150?u=8' },
    { id: '5', name: 'Iga S', position: 2, bracket: 'B', gender: 'Feminino', image: 'https://i.pravatar.cc/150?u=9' },
  ];

  const filters = ['Ranking Geral', 'Minha Chave / Grupos'];

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
      const genderToFilter = isGenderFilterActive ? 'Masculino' : 'Feminino';
      const matchesGender = player.gender === genderToFilter;
      const matchesCategory = activeFilter === 'Ranking Geral' || player.bracket === 'A';

      return matchesSearch && matchesGender && matchesCategory;
    });
  }, [search, isGenderFilterActive, activeFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ranking</Text>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
              onPress={() => setActiveFilter(item)}
            >
              <Text style={[styles.filterText, activeFilter === item && styles.filterTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search color="#AAA" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder={`${isGenderFilterActive ? 'Masculino' : 'Feminino'}...`}
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#FF7A21" }}
            thumbColor="#FFF"
            onValueChange={() => setIsGenderFilterActive(prev => !prev)}
            value={isGenderFilterActive}
          />
        </View>
        <Text style={styles.searchLabel}>Buscar / Tenistas</Text>
      </View>

      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RankingCard
            name={item.name}
            position={item.position}
            bracket={item.bracket}
            imageUrl={item.image}
            onPress={() => console.log(`Perfil: ${item.name}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum tenista encontrado.</Text>
        }
      />

      {/* 2. Adicione o menu flutuante aqui */}
      <FloatingMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 15 },
  title: { color: '#FFF', fontSize: 34, fontWeight: '900' },
  filterContainer: { paddingLeft: 20, marginBottom: 20 },
  filterChip: { backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#FF7A21' },
  filterText: { color: '#DDD', fontWeight: '600' },
  filterTextActive: { color: '#FFF' },
  searchSection: { paddingHorizontal: 20, marginBottom: 10 },
  searchBar: { backgroundColor: '#1E1E1E', flexDirection: 'row', alignItems: 'center', borderRadius: 25, paddingHorizontal: 15, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 16 },
  searchLabel: { color: '#888', fontSize: 14, marginTop: 15, marginBottom: 5 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
});
