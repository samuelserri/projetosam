import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

export default function App() {
  const [heartColor, setHeartColor] = useState('red');
  const [inputText, setInputText] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'red' ? 'gray' : 'red');
  };

  const voceClicou = () => {
    if (inputText.trim() !== '') {
      setShowPasswordInput(true);
    }
  };

  const verificarSenha = () => {
    if (password === '1234') {
      setAccessGranted(true);
      setShowBalloon(false);

      // Mostra o balão "Entrou" por 1 segundo
      setTimeout(() => {
        setAccessGranted(false);
      }, 1000);
    } else {
      alert('Senha incorreta');
    }
  };

  return (
    <View style={styles.container}>
      <Text>VAI CORINTHIANS</Text>

      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/bc/27/6f/bc276ff73e30a5f50c493aeb685edb90.jpg',
        }}
        style={styles.image}
      />

      <TouchableOpacity onPress={toggleHeartColor}>
        <AntDesign name="heart" size={24} color={heartColor} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Digite algo legal..."
        placeholderTextColor="#888"
        value={inputText}
        onChangeText={setInputText}
      />

      <Button title="Clique aqui Ninja" onPress={voceClicou} />

      {showPasswordInput && !accessGranted && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Digite a senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Verificar Senha" onPress={verificarSenha} />
        </>
      )}

      {accessGranted && (
        <View style={styles.balloon}>
          <Text style={styles.balloonText}>Entrou</Text>
        </View>
      )}

      {showBalloon && (
        <View style={styles.balloon}>
          <Text style={styles.balloonText}>{inputText}</Text>
        </View>
      )}
    </View>
  );
}

// Estilos ajustados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  input: {
    height: 30,          // Mais baixo
    width: '15%',        // Mais estreito
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 8,
    fontSize: 13,         // Fonte menor (afeta placeholder também)
  },
  balloon: {
    position: 'absolute',
    bottom: 150,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balloonText: {
    color: '#fff',
    fontSize: 16,
  },
});
