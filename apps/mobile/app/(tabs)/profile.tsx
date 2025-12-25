import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LogOut, Edit3, Ruler, Weight, Target, Users } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
  const userData = {
    name: 'Carlos S',
    bracket: 'Chave A',
    position: '#1',
    info: {
      playStyle: 'Destro',
      backhand: '2 Mãos',
      height: '1.80m',
      weight: '75kg'
    },
    stats: [
      { label: 'Jogos', value: '758', icon: <Users color="#FF7A21" size={16} /> },
      { label: 'Vitórias', value: '1.5k', icon: <Target color="#FF7A21" size={16} /> },
      { label: 'Sets', value: '3.2k', icon: <Target color="#FF7A21" size={16} /> },
      { label: 'Games', value: '45k', icon: <Target color="#FF7A21" size={16} /> },
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header - Mais limpo e moderno */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300?u=carlos' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
              <Edit3 color="#FFF" size={14} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.badgeContainer}>
             <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{userData.bracket}</Text>
             </View>
             <Text style={styles.rankText}>{userData.position} do Ranking</Text>
          </View>
        </View>

        {/* Info Técnica em Cards Horizontais */}
        <View style={styles.techInfoBar}>
          <View style={styles.techItem}>
            <Ruler color="#888" size={18} />
            <Text style={styles.techValue}>{userData.info.height}</Text>
          </View>
          <View style={[styles.techItem, styles.techBorder]}>
            <Weight color="#888" size={18} />
            <Text style={styles.techValue}>{userData.info.weight}</Text>
          </View>
          <View style={styles.techItem}>
            <Target color="#888" size={18} />
            <Text style={styles.techValue}>{userData.info.playStyle}</Text>
          </View>
        </View>

        {/* Estatísticas com Design de Grid Elevado */}
        <Text style={styles.sectionTitle}>Estatísticas da Temporada</Text>
        <View style={styles.statsGrid}>
          {userData.stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statHeader}>
                {stat.icon}
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Evolução de Ranking - Gráfico Minimalista */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Evolução</Text>
          <Text style={styles.viewMore}>Últimos 6 meses</Text>
        </View>
        
        <View style={styles.chartWrapper}>
          <LineChart
            data={{
              labels: ["Set", "Out", "Nov", "Dez", "Jan", "Fev"],
              datasets: [{ data: [15, 45, 30, 65, 85, 99] }]
            }}
            width={screenWidth - 30}
            height={180}
            chartConfig={chartConfig}
            bezier
            withDots={true}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            style={styles.chartStyle}
          />
        </View>

        {/* Botão de Logout Minimalista */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <LogOut color="#FF4B4B" size={20} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#000",
  backgroundGradientTo: "#000",
  color: (opacity = 1) => `rgba(255, 122, 33, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
  strokeWidth: 3,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#FF7A21"
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  header: { alignItems: 'center', marginTop: 30, marginBottom: 20 },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 3,
    borderWidth: 2,
    borderColor: '#FF7A21',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FF7A21',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000'
  },
  name: { color: '#FFF', fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  categoryBadge: {
    backgroundColor: 'rgba(255, 122, 33, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 10
  },
  categoryText: { color: '#FF7A21', fontSize: 12, fontWeight: '700' },
  rankText: { color: '#888', fontSize: 13, fontWeight: '500' },
  
  techInfoBar: {
    flexDirection: 'row',
    backgroundColor: '#111',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#222'
  },
  techItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  techBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#222' },
  techValue: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10
  },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', paddingHorizontal: 20, marginBottom: 15 },
  viewMore: { color: '#888', fontSize: 12 },

  statsGrid: { 
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between', marginBottom: 20 
  },
  statCard: { 
    backgroundColor: '#111', 
    width: '47%', 
    padding: 18, 
    borderRadius: 20, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222'
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statLabel: { color: '#888', fontSize: 12, fontWeight: '500' },
  statValue: { color: '#FFF', fontSize: 24, fontWeight: '800' },

  chartWrapper: { alignItems: 'center', marginTop: 10 },
  chartStyle: { borderRadius: 16, paddingRight: 50, paddingLeft: 50 },

  logoutButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#300'
  },
  logoutText: { color: '#FF4B4B', fontSize: 15, fontWeight: '600' }
});
