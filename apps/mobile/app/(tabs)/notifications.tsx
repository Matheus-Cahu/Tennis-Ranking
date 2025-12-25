import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Switch 
} from 'react-native';
import { Trophy, Calendar, MessageSquare, Tag, PlayCircle, ChevronRight } from 'lucide-react-native';

// Tipagem para os itens de notificação baseada no design
interface NotificationItem {
  id: string;
  type: 'challenge' | 'result' | 'social' | 'system' | 'promo';
  title: string;
  subtitle?: string;
  isActionable?: boolean;
}

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState('Todas');
  const [socialFilter, setSocialFilter] = useState('Todas');
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const mainFilters = ['Todas', 'Meus Jogos', 'Grupos', 'Sistema'];
  const socialFilters = ['Todas', 'Social', 'Social'];

  const notifications: NotificationItem[] = [
    { id: '1', type: 'challenge', title: 'Novo desafio de jogo de João S.', subtitle: 'Aceitar/Recusar', isActionable: true },
    { id: '2', type: 'result', title: 'Resultado: Você venceu seu jogo contra Mara R por 6-2-6-4.' },
    { id: '3', type: 'social', title: 'Carlos F. curtiu e comentou em sua publicação: "Que partida!"' },
    { id: '4', type: 'promo', title: 'Novos classificados: Raquete Head Radical Pro', subtitle: 'às 18:00' },
    { id: '5', type: 'system', title: 'Promoção exclusiva: 15% OFF na corda Kirshbaum' },
  ];

  const getIcon = (type: string) => {
    const props = { color: "#FFF", size: 22 };
    switch (type) {
      case 'challenge': return <PlayCircle {...props} />;
      case 'result': return <Trophy {...props} />;
      case 'social': return <MessageSquare {...props} />;
      case 'promo': return <Tag {...props} />;
      default: return <Calendar {...props} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
      </View>

      {/* Primeiro Nível de Filtros */}
      <View style={styles.filterSection}>
        <FlatList
          data={mainFilters}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.chip, activeTab === item && styles.chipActive]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[styles.chipText, activeTab === item && styles.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Segundo Nível de Filtros com Switch */}
      <View style={styles.subFilterRow}>
        <View style={styles.subFilterContainer}>
          {socialFilters.map((filter, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.subChip, socialFilter === filter && index === 0 && styles.subChipActive]}
              onPress={() => setSocialFilter(filter)}
            >
              <Text style={styles.subChipText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Switch 
          value={isSwitchOn} 
          onValueChange={setIsSwitchOn}
          trackColor={{ false: "#333", true: "#FF7A21" }}
        />
      </View>

      <Text style={styles.searchLabel}>Buscar / Tenistas</Text>

      {/* Lista de Notificações */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              {getIcon(item.type)}
            </View>
            
            <View style={styles.contentContainer}>
              <Text style={styles.notifTitle}>{item.title}</Text>
              {item.subtitle && <Text style={styles.notifSubtitle}>{item.subtitle}</Text>}
            </View>

            {item.isActionable ? (
              <TouchableOpacity style={styles.commentButton}>
                <Text style={styles.commentText}>Comentar</Text>
              </TouchableOpacity>
            ) : (
              <ChevronRight color="#444" size={20} />
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 20 },
  title: { color: '#FFF', fontSize: 32, fontWeight: '900' },
  
  filterSection: { paddingLeft: 20, marginBottom: 15 },
  chip: { backgroundColor: '#222', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, marginRight: 10 },
  chipActive: { backgroundColor: '#FF7A21' },
  chipText: { color: '#888', fontWeight: '600' },
  chipTextActive: { color: '#FFF' },

  subFilterRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 5
  },
  subFilterContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#1A1A1A', 
    borderRadius: 12, 
    padding: 4,
    flex: 0.9
  },
  subChip: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  subChipActive: { backgroundColor: '#FF7A21' },
  subChipText: { color: '#FFF', fontSize: 13, fontWeight: '600' },

  searchLabel: { color: '#555', fontSize: 12, marginLeft: 20, marginTop: 15, marginBottom: 10 },

  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  notificationCard: { 
    flexDirection: 'row', 
    backgroundColor: '#111', 
    borderRadius: 16, 
    padding: 15, 
    alignItems: 'center', 
    marginBottom: 12 
  },
  iconContainer: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#222', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 15
  },
  contentContainer: { flex: 1 },
  notifTitle: { color: '#EEE', fontSize: 14, fontWeight: '500', lineHeight: 20 },
  notifSubtitle: { color: '#888', fontSize: 13, marginTop: 2 },
  
  commentButton: { backgroundColor: '#FF7A21', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  commentText: { color: '#FFF', fontSize: 12, fontWeight: '700' }
});
