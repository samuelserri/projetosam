import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
  TextInput, Modal, KeyboardAvoidingView, Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importações das telas (confirme que esses arquivos existem e estão com os nomes corretos)
import HangmanGameScreen from './HangmanGameScreen';
import GameMenuScreen from './GameMenuScreen';
import TicTacToeScreen from './newwindow';        // seu jogo da velha
import FootballQuizScreen from './FootballQuizScreen'; // novo quiz de futebol

const Stack = createStackNavigator();

// ---------- TELA DE LOGIN ----------
function MainScreen({ navigation }) {
  const [heartColor, setHeartColor] = useState('gray');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'red' ? 'gray' : 'red');
  };

  const showAlert = () => {
    if (login === 'samuel' && password === '1462') {
      setModalMessage('Login e senha corretos!');
    } else {
      setModalMessage('Login ou senha incorretos.');
    }
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={40}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Jonatan Serri</Text>

        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/172449361?s=400&u=1a0f69acf7ba885e318815d178393105537aa375&v=4' }}
          style={styles.image}
        />

        <TouchableOpacity onPress={toggleHeartColor} style={styles.heartButton}>
          <AntDesign name="heart" size={24} color={heartColor} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Login"
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={showAlert} style={styles.customButton}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  if (login === 'samuel' && password === '1462') {
                    navigation.navigate('GameMenu'); // Navega para o menu de jogos
                    setLogin('');
                    setPassword('');
                  } else {
                    setPassword('');
                  }
                }}
              >
                <Text style={styles.modalButtonText}>
                  {login === 'samuel' && password === '1462' ? 'Ir para o Menu' : 'Fechar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

// ---------- APP PRINCIPAL COM NAVEGAÇÃO ----------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="GameMenu" component={GameMenuScreen} options={{ title: 'Menu de Jogos' }} />
        <Stack.Screen name="HangmanGame" component={HangmanGameScreen} options={{ title: 'Jogo da Forca' }} />
        <Stack.Screen name="TicTacToe" component={TicTacToeScreen} options={{ title: 'Jogo da Velha' }} />
        <Stack.Screen name="FootballQuiz" component={FootballQuizScreen} options={{ title: 'Quiz de Futebol' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { fontSize: 20, marginBottom: 15, fontWeight: 'bold', color: '#333' },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  heartButton: { marginBottom: 20 },
  input: {
    width: '85%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  customButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  modalText: { fontSize: 18, marginBottom: 25, textAlign: 'center', fontWeight: 'bold', color: '#333' },
  modalButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalButtonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
