import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MessageCircle, Trophy, Target, Users, Percent } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

export default function PlayerProfile() {
  const { id, name, bracket } = useLocalSearchParams(); // Recebe os dados do ranking
  const router = useRouter();

  // Dados mockados (Em produção, você faria um fetch usando o 'id')
  const stats = [
    { label: 'Total de Jogos', value: '158', icon: <Trophy color="#888" size={18} /> },
    { label: 'Vitórias', value: '224', icon: <Target color="#888" size={18} /> },
    { label: 'Derrotas', value: '344', icon: <Users color="#888" size={18} /> },
    { label: '% Aproveitamento', value: '78%', icon: <Percent color="#888" size={18} /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil do Jogador</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Principal */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=' + id }} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={styles.playerName}>{name || 'Carlos S'}</Text>
            <Text style={styles.playerRank}>#1 - {bracket || 'Chave A'}</Text>
          </View>
        </View>

        {/* Botão WhatsApp */}
        <TouchableOpacity 
          style={styles.whatsappButton}
          onPress={() => Linking.openURL('https://wa.me/5511999999999')}
        >
          <MessageCircle color="#FFF" size={20} />
          <Text style={styles.whatsappText}>Conversar no WhatsApp</Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>Disponível apenas por tenistas na {bracket || 'Chave A'}</Text>

        {/* Grid de Estatísticas */}
        <View style={styles.statsGrid}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              {item.icon}
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Gráfico de Evolução */}
        <Text style={styles.sectionTitle}>Evolução de Ranking</Text>
        <View style={styles.chartContainer}>
           {/* Reutilize a configuração de LineChart das páginas anteriores */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  profileHeader: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#FF7A21' },
  nameContainer: { marginLeft: 15 },
  playerName: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  playerRank: { color: '#888', fontSize: 14 },
  whatsappButton: { 
    backgroundColor: '#FF7A21', 
    flexDirection: 'row', 
    marginHorizontal: 20, 
    height: 50, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 10 
  },
  whatsappText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  disclaimer: { color: '#666', fontSize: 12, textAlign: 'center', marginTop: 10 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, justifyContent: 'space-between' },
  statCard: { backgroundColor: '#111', width: '23%', padding: 10, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  statLabel: { color: '#888', fontSize: 8, textAlign: 'center', marginTop: 5 },
  statValue: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginLeft: 20, marginTop: 10 },
});
