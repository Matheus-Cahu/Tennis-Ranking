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
  Alert 
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import MainInput from '@/components/inputs/main-input';
import MainButton from '@/components/buttons/main-button';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Novo estado para o Toggle de Gênero
  const [gender, setGender] = useState('Masculino'); 
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleRegister = async () => {
    if (!formData.nome || !formData.email || !formData.senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.12.10:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          password: formData.senha,
          // Estrutura corrigida para o seu novo app.js
          player_info: {
            gender: gender,
            play_style: 'Destro', // Valores padrão iniciais
            backhand: '2 Mãos'
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso!", "Sua conta foi criada com sucesso.");
        router.replace('/screens/login'); 
      } else {
        // Usando data.msg conforme padronizado no seu app.js final
        Alert.alert("Erro no Cadastro", data.msg || "Verifique os dados informados.");
      }
    } catch (error) {
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
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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

              {/* --- NOVO: Seletor de Gênero --- */}
              <Text style={styles.label}>Gênero</Text>
              <View style={styles.genderContainer}>
                {['Masculino', 'Feminino'].map((item) => (
                  <TouchableOpacity 
                    key={item}
                    style={[styles.genderOption, gender === item && styles.genderActive]}
                    onPress={() => setGender(item)}
                  >
                    <Text style={[styles.genderText, gender === item && styles.genderTextActive]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

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
                
                <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/screens/login')}>
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
  background: { flex: 1, width: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.85)' },
  scrollContainer: { paddingHorizontal: 30, paddingBottom: 40, flexGrow: 1, justifyContent: 'center' },
  header: { marginTop: 40, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 32, fontWeight: '900' },
  subtitle: { color: '#CCC', fontSize: 16, marginTop: 5 },
  form: { width: '100%' },
  
  // Estilos do Toggle de Gênero
  label: { color: '#888', fontSize: 14, marginBottom: 10, fontWeight: '600', textTransform: 'uppercase' },
  genderContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  genderOption: { 
    flex: 1, 
    paddingVertical: 12, 
    borderRadius: 10, 
    backgroundColor: '#1A1A1A', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  genderActive: { backgroundColor: '#FF7A21', borderColor: '#FF7A21' },
  genderText: { color: '#888', fontWeight: '700' },
  genderTextActive: { color: '#FFF' },

  buttonContainer: { marginTop: 20, alignItems: 'center' },
  loginLink: { marginTop: 20 },
  loginLinkText: { color: '#FFF', fontSize: 14 },
  underline: { fontWeight: 'bold', textDecorationLine: 'underline', color: '#FF7A21' },
});
