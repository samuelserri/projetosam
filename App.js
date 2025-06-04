import React, { useState } from 'react';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'red' ? 'gray' : 'red');
  };

  const handleLogin = () => {
    if (username.trim().toLowerCase() === 'samuel' && password === '1462') {
      setMessage('Entrou');
    } else {
      setMessage('Tá errado!');
    }

    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VAI CORINTHIANS</Text>

      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/bc/27/6f/bc276ff73e30a5f50c493aeb685edb90.jpg',
        }}
        style={styles.image}
      />

      <TouchableOpacity onPress={toggleHeartColor} style={{ marginBottom: 15 }}>
        <AntDesign name="heart" size={30} color={heartColor} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ width: '10%', marginTop: 10 }}>
        <Button title="Entrar" onPress={handleLogin} />
      </View>

      {message !== '' && (
        <View style={styles.balloon}>
          <Text style={styles.balloonText}>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 8,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  balloon: {
    marginTop: 20,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  balloonText: {
    color: '#fff',
    fontSize: 18,
  },
});

