import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from 'react-native';

export default function App() {
  const [heartColor, setHeartColor] = useState('red');
  const [mensagem, setMensagem] = useState('');
  const [inputText, setInputText] = useState('');
  const [showBalloon, setShowBalloon] = useState(false);

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'red' ? 'gray' : 'red');
  };

  const voceClicou = () => {
    // setMensagem('Você clicou');
    setShowBalloon(true);
    setTimeout(() => {
      setShowBalloon(false);
    }, 3000); // Oculta o balão após 3 segundos
  };

  return (
    <View style={styles.container}>
      <Text>VAI CORINTHIANS</Text>

      <Image
        source={{ uri: 'https://i.pinimg.com/736x/bc/27/6f/bc276ff73e30a5f50c493aeb685edb90.jpg' }}
        style={styles.image}
      />

      <TouchableOpacity onPress={toggleHeartColor}>
        <AntDesign name="heart" size={24} color={heartColor} />
      </TouchableOpacity>

      {/* 🔹 Input para digitar algo */}
      <TextInput
        style={styles.input}
        placeholder="Digite algo legal..."
        value={inputText}
        onChangeText={setInputText}
      />

      <Button
        title="Clique aqui Ninja"
        onPress={voceClicou}
      />

      {mensagem !== '' && (
        <Text style={styles.mensagemTexto}>{mensagem}</Text>
      )}

      {/* 🔹 Balão flutuante */}
      {showBalloon && (
        <View style={styles.balloon}>
          <Text style={styles.balloonText}>{inputText}</Text>
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
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  mensagemTexto: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
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
