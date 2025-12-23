import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';

// Cálculo para exibir 2 posts por linha com espaçamento
const { width } = Dimensions.get('window');
const POST_WIDTH = (width - 60) / 2; 

interface FeedPostProps {
  imageSource: any;
  title: string;
  tag?: string; // Ex: "Video" ou "Short Video"
  onLike: () => void;
  onComment: () => void;
}

export default function FeedPost({ 
  imageSource, 
  title, 
  tag, 
  onLike, 
  onComment 
}) {
  return (
    <View style={styles.card}>
      {/* Imagem do Post */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.postImage} />
        {tag && (
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
      </View>

      {/* Conteúdo de Texto */}
      <View style={styles.content}>
        <Text style={styles.postTitle} numberOfLines={2}>
          {title}
        </Text>
        
        {/* Rodapé do Card com Ações */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={onLike}>
            <Text style={styles.actionText}>Curtir</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onComment}>
            <Text style={styles.actionText}>Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: POST_WIDTH,
    backgroundColor: '#1E1E1E', // Fundo cinza escuro conforme a imagem do feed
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tagBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  postTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    height: 36, // Garante alinhamento mesmo com 1 ou 2 linhas
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
    paddingTop: 8,
  },
  actionText: {
    color: '#888',
    fontSize: 11,
  },
});
