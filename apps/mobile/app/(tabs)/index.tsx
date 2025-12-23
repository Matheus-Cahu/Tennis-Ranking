import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  SafeAreaView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
// Importação dos ícones da Lucide
import { Chrome, Facebook } from 'lucide-react-native'; 
import MainButton from '@/components/buttons/main-button';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../../assets/images/splash.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        {/* Logo e Nome do App */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/android-icon-background.png')} 
            style={styles.logo} 
          />
          <Text style={styles.logoText}>TENNIS RANK</Text>
        </View>

        {/* Texto de Boas-Vindas */}
        <View style={styles.content}>
          <Text style={styles.headline}># Domine as Quadras.{"\n"}Suba no Ranking.</Text>
          <Text style={styles.subtext}>
            Conecte-se a tenistas, monitore sua evolução e participe de chaves competitivas da sua cidade. 
          </Text>
        </View>

        {/* Ações de Acesso */}
        <View style={styles.footer}>
          <View style={styles.primaryActions}>
            <MainButton 
              title="Cadastre-se" 
              onPress={() => router.push('/register')} 
            />
            
            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginLinkText}>
                Já sou tenista. <Text style={styles.underline}>Entrar</Text> 
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divisor Social [cite: 14] */}
          <Text style={styles.socialDivider}>Ou continue com:</Text>
          
          <View style={styles.socialButtons}>
            {/* Botão Google com Ícone Lucide */}
            <TouchableOpacity style={styles.socialBtnGoogle}>
               <Chrome color="#000" size={20} strokeWidth={2.5} />
               <Text style={styles.socialBtnText}>Login com Google</Text>
            </TouchableOpacity>
            
            {/* Botão Facebook com Ícone Lucide */}
            <TouchableOpacity style={styles.socialBtnFB}>
               <Facebook color="#FFF" size={24} fill="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)', 
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
    letterSpacing: 2,
  },
  content: {
    marginBottom: 20,
  },
  headline: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtext: {
    color: '#CCC',
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
  footer: {
    marginBottom: 40,
  },
  primaryActions: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  loginLink: {
    marginTop: 15,
  },
  loginLinkText: {
    color: '#FFF',
    fontSize: 14,
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  socialDivider: {
    color: '#888',
    fontSize: 12,
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialBtnGoogle: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  socialBtnFB: {
    backgroundColor: '#3b5998',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  }
});
