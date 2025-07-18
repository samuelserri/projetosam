import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GameMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um jogo</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HangmanGame')}
      >
        <Text style={styles.buttonText}>Jogo da Forca</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TicTacToe')}
      >
        <Text style={styles.buttonText}>Jogo da Velha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FootballQuiz')}
      >
        <Text style={styles.buttonText}>Quiz de Futebol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});
