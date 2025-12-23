import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ImageBackground, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert // Importado para feedbacks
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import MainInput from '@/components/inputs/main-input';
import MainButton from '@/components/buttons/main-button';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Estado para o botão
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  // Função para conectar com a API
  const handleRegister = async () => {
    // Validação básica
    if (!formData.nome || !formData.email || !formData.senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // Substitua pelo IP da sua máquina se testar em dispositivo físico (ex: 192.168.x.x)
      const response = await fetch('http://192.168.12.28:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          password: formData.senha,
          // Enviando valores padrão iniciais para o Profile (serão editados depois)
          gender: 'Outro', 
          play_style: 'Destro',
          backhand: '2 Mãos'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso!", "Sua conta foi criada com sucesso.");
        router.replace('/login'); // Redireciona para o login
      } else {
        Alert.alert("Erro no Cadastro", data.message || "Verifique os dados informados.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão", "Não foi possível contatar o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/splash.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.overlay} />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}># Crie sua Conta</Text>
              <Text style={styles.subtitle}>Junte-se ao maior ranking de tênis!</Text>
            </View>

            <View style={styles.form}>
              <MainInput 
                placeholder="Nome e Sobrenome" 
                onChangeText={(val) => setFormData({...formData, nome: val})} 
              />
              
              <MainInput 
                placeholder="Email" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(val) => setFormData({...formData, email: val})} 
              />

              <MainInput 
                placeholder="Senha" 
                secureTextEntry={true}
                onChangeText={(val) => setFormData({...formData, senha: val})} 
              />

              <View style={styles.buttonContainer}>
                <MainButton 
                  title={loading ? "Carregando..." : "Cadastrar"} 
                  onPress={handleRegister} 
                  disabled={loading}
                />
                
                <TouchableOpacity 
                  style={styles.loginLink}
                  onPress={() => router.push('/login')}
                >
                  <Text style={styles.loginLinkText}>
                    Já tem conta? <Text style={styles.underline}>Entrar</Text>
                  </Text>
                </TouchableOpacity>
              </View>
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
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)', 
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    color: '#CCC',
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center', // Garante a centralização do botão e do link inferior
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: '#FFF',
    fontSize: 14,
  },
  underline: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#FF7A21', // Laranja da marca para destaque
  },
});
