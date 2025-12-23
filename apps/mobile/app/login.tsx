import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Chrome, Facebook, Apple } from 'lucide-react-native'; // Ícones Lucide
import MainInput from '@/components/inputs/main-input';
import MainButton from '@/components/buttons/main-button';

export default function LoginScreen() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    identifier: '', // E-mail ou CPF 
    password: '',
  });

  return (
    <ImageBackground 
      source={require('../assets/images/splash.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Logo Centralizada */}
            <View style={styles.header}>
              <Image 
                source={require('../assets/images/android-icon-background.png')} 
                style={styles.logo} 
              />
              <Text style={styles.logoText}>TENNIS RANK</Text>
            </View>

            {/* Mensagem de Boas-vindas */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.title}># Bem-vindo de volta.</Text>
              <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>
            </View>

            {/* Formulário de Login  */}
            <View style={styles.form}>
              <MainInput 
                placeholder="E-mail ou CPF" 
                onChangeText={(val) => setLoginData({...loginData, identifier: val})}
                keyboardType="email-address"
              />
              
              <MainInput 
                placeholder="Senha" 
                secureTextEntry={true}
                onChangeText={(val) => setLoginData({...loginData, password: val})} 
              />

              <TouchableOpacity 
                onPress={() => console.log('Esqueci minha senha')}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <View style={styles.buttonSpacer}>
                <MainButton 
                  title="Entrar" 
                  onPress={() => router.replace('/(tabs)/home')} // Redireciona para a área logada 
                />
              </View>
            </View>

            {/* Login Social  */}
            <View style={styles.socialFooter}>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialCircle}>
                  <Chrome color="#000" size={24} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialCircle, { backgroundColor: '#3b5998' }]}>
                  <Facebook color="#FFF" size={24} fill="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialCircle, { backgroundColor: '#000' }]}>
                  <Apple color="#FFF" size={24} fill="#FFF" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.registerLink}
                onPress={() => router.push('/register')}
              >
                <Text style={styles.registerLinkText}>
                  Não tem conta? <Text style={styles.underline}>Cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(0,0,0,0.7)', 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 35,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 8,
    letterSpacing: 2,
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
  },
  subtitle: {
    color: '#CCC',
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#FFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonSpacer: {
    marginTop: 10,
  },
  socialFooter: {
    marginTop: 50,
    alignItems: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialCircle: {
    backgroundColor: '#FFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerLink: {
    marginTop: 10,
  },
  registerLinkText: {
    color: '#FFF',
    fontSize: 14,
  },
    underline: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#FF7A21', // Laranja da marca para destaque
  },
});
