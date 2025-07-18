// FootballQuizScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  {
    question: 'Quem venceu a Copa do Mundo de 2002?',
    options: ['Brasil', 'Alemanha', 'França', 'Argentina'],
    answer: 'Brasil',
  },
  {
    question: 'Quantas Copas do Mundo o Brasil venceu?',
    options: ['3', '4', '5', '6'],
    answer: '5',
  },
  {
    question: 'Quem é o maior artilheiro da história das Copas?',
    options: ['Pelé', 'Ronaldo Fenômeno', 'Miroslav Klose', 'Messi'],
    answer: 'Miroslav Klose',
  },
  {
    question: 'Qual clube tem mais títulos da Libertadores?',
    options: ['Boca Juniors', 'Flamengo', 'River Plate', 'Independiente'],
    answer: 'Independiente',
  },
  {
    question: 'Quem fez o "Gol do Século" em 1986?',
    options: ['Zico', 'Pelé', 'Maradona', 'Romário'],
    answer: 'Maradona',
  },
];

export default function FootballQuizScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (option) => {
    const correct = questions[currentQuestion].answer === option;
    if (correct) setScore(score + 1);

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <>
          <Text style={styles.title}>Quiz Finalizado!</Text>
          <Text style={styles.score}>Você acertou {score} de {questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameMenu')}>
            <Text style={styles.buttonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(option)}>
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  question: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  score: { fontSize: 22, marginBottom: 20 },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18 },
});
