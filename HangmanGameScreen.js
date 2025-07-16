import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';

// Lista de palavras para o jogo da forca com suas dicas
const WORDS_WITH_HINTS = [
  { word: 'PROGRAMACAO', hint: 'Área que envolve a criação de softwares e aplicativos.' },
  { word: 'COMPUTADOR', hint: 'Máquina eletrônica capaz de processar dados.' },
  { word: 'TECLADO', hint: 'Dispositivo de entrada usado para digitar textos e comandos.' },
  { word: 'MONITOR', hint: 'Dispositivo de saída que exibe informações visuais.' },
  { word: 'DESENVOLVIMENTO', hint: 'Processo de criação e aprimoramento de sistemas ou produtos.' },
  { word: 'APLICATIVO', hint: 'Programa de software projetado para uma função específica.' },
  { word: 'CELULAR', hint: 'Dispositivo móvel usado para comunicação e acesso à internet.' },
  { word: 'INTERNET', hint: 'Rede global de computadores que permite a troca de informações.' },
  { word: 'ALGORITMO', hint: 'Conjunto de instruções para resolver um problema.' },
  { word: 'DADOS', hint: 'Informações brutas que podem ser processadas.' },
  { word: 'FRONTEND', hint: 'Parte do aplicativo que o usuário vê e interage.' },
  { word: 'BACKEND', hint: 'Parte do aplicativo que lida com a lógica do servidor e banco de dados.' },
  { word: 'DATABASE', hint: 'Sistema organizado para armazenar e gerenciar informações.' },
  { word: 'NUVEM', hint: 'Armazenamento e acesso a dados e programas pela internet.' },
  { word: 'SEGURANCA', hint: 'Proteção de sistemas e dados contra acessos não autorizados.' },
  { word: 'MOBILE', hint: 'Relacionado a dispositivos portáteis como smartphones e tablets.' },
  { word: 'REACTNATIVE', hint: 'Framework para construir aplicativos móveis usando JavaScript.' },
  { word: 'JAVASCRIPT', hint: 'Linguagem de programação muito usada para web e mobile.' },
  { word: 'PYTHON', hint: 'Linguagem de programação versátil, popular para IA e análise de dados.' },
  { word: 'ESTILO', hint: 'Conjunto de regras visuais que definem a aparência de um aplicativo.' },
  { word: 'MOUSE', hint: 'É um rato do computador.' }, // Exemplo adicionado
];

// Estágios da forca (simples, com texto)
const HANGMAN_STAGES = [
  `
    -----
    |   |
        |
        |
        |
        -
  `,
  `
    -----
    |   |
    O   |
        |
        |
        -
  `,
  `
    -----
    |   |
    O   |
    |   |
        |
        -
  `,
  `
    -----
    |   |
    O   |
   /|   |
        |
        -
  `,
  `
    -----
    |   |
    O   |
   /|\\  |
        |
        -
  `,
  `
    -----
    |   |
    O   |
   /|\\  |
   /    |
        -
  `,
  `
    -----
    |   |
    O   |
   /|\\  |
   / \\  |
        -
  `,
];

// ---------- JOGO DA FORCA ----------
export default function HangmanGameScreen() {
  // Palavra a ser adivinhada
  const [wordToGuess, setWordToGuess] = useState('');
  // Dica da palavra atual
  const [currentHint, setCurrentHint] = useState('');
  // Letras já adivinhadas (Set para evitar duplicatas)
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  // Número de tentativas incorretas
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  // Resultado do jogo: 'playing', 'won', 'lost'
  const [gameResult, setGameResult] = useState('playing');
  // Controla a visibilidade do modal de fim de jogo
  const [modalVisible, setModalVisible] = useState(false);


  // Número máximo de tentativas incorretas (para os estágios da forca)
  const MAX_INCORRECT_GUESSES = HANGMAN_STAGES.length - 1;

  // Efeito para iniciar um novo jogo quando o componente é montado
  useEffect(() => {
    startNewGame();
  }, []);

  // Função para iniciar um novo jogo
  const startNewGame = () => {
    // Seleciona uma palavra aleatória do array WORDS_WITH_HINTS
    const randomIndex = Math.floor(Math.random() * WORDS_WITH_HINTS.length);
    const { word, hint } = WORDS_WITH_HINTS[randomIndex]; // Desestrutura para pegar a palavra e a dica

    setWordToGuess(word);
    setCurrentHint(hint); // Define a dica atual
    setGuessedLetters(new Set());
    setIncorrectGuesses(0);
    setGameResult('playing');
    setModalVisible(false); // Esconde o modal ao reiniciar
  };

  // Função para lidar com a adivinhação de uma letra
  const handleGuess = (letter) => {
    // Se o jogo já terminou, não faz nada
    if (gameResult !== 'playing') return;

    const upperCaseLetter = letter.toUpperCase();

    // Se a letra já foi adivinhada, não faz nada
    if (guessedLetters.has(upperCaseLetter)) {
      return;
    }

    // Adiciona a letra às letras adivinhadas
    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(upperCaseLetter);
    setGuessedLetters(newGuessedLetters);

    // Se a palavra não contém a letra, incrementa as tentativas incorretas
    if (!wordToGuess.includes(upperCaseLetter)) {
      setIncorrectGuesses(prev => prev + 1);
    }
  };

  // Efeito para verificar o resultado do jogo sempre que as letras adivinhadas
  // ou as tentativas incorretas mudam
  useEffect(() => {
    // Verifica se a palavra foi completamente adivinhada
    const allLettersGuessed = wordToGuess.split('').every(letter => guessedLetters.has(letter));

    if (wordToGuess && allLettersGuessed) {
      setGameResult('won');
      setModalVisible(true); // Mostra o modal de vitória
    } else if (incorrectGuesses >= MAX_INCORRECT_GUESSES) {
      setGameResult('lost');
      setModalVisible(true); // Mostra o modal de derrota
    }
  }, [guessedLetters, incorrectGuesses, wordToGuess]);

  // Função para exibir a palavra com as letras adivinhadas
  const displayWord = () => {
    return wordToGuess.split('').map((letter, index) => {
      const isGuessed = guessedLetters.has(letter);
      return (
        <View key={index} style={hangmanStyles.wordLetterContainer}>
          <Text style={[
            hangmanStyles.wordLetterText,
            isGuessed ? hangmanStyles.guessedLetterText : hangmanStyles.hiddenLetterText
          ]}>
            {isGuessed ? letter : '_'}
          </Text>
        </View>
      );
    });
  };

  // Gera o teclado virtual (letras de A a Z)
  const renderKeyboard = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return (
      <View style={hangmanStyles.keyboardContainer}>
        {alphabet.map((letter) => {
          const isDisabled = guessedLetters.has(letter) || gameResult !== 'playing';
          return (
            <TouchableOpacity
              key={letter}
              style={[
                hangmanStyles.keyButton,
                isDisabled && hangmanStyles.keyButtonDisabled,
                guessedLetters.has(letter) && wordToGuess.includes(letter) && hangmanStyles.keyButtonCorrect,
                guessedLetters.has(letter) && !wordToGuess.includes(letter) && hangmanStyles.keyButtonIncorrect,
              ]}
              onPress={() => handleGuess(letter)}
              disabled={isDisabled}
            >
              <Text style={hangmanStyles.keyText}>{letter}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Mensagem de resultado do jogo
  const getGameMessage = () => {
    if (gameResult === 'won') {
      return `Parabéns! Você adivinhou a palavra: ${wordToGuess}`;
    } else if (gameResult === 'lost') {
      return `Você perdeu! A palavra era: ${wordToGuess}`;
    }
    return '';
  };

  return (
    <View style={hangmanStyles.container}>
      <Text style={hangmanStyles.title}>Jogo da Forca</Text>

      {/* Desenho da Forca */}
      <Text style={hangmanStyles.hangmanDrawing}>
        {HANGMAN_STAGES[incorrectGuesses]}
      </Text>

      {/* Dica da Palavra */}
      <Text style={hangmanStyles.hintText}>Dica: {currentHint}</Text>

      {/* Palavra a ser adivinhada */}
      <View style={hangmanStyles.wordContainer}>
        {displayWord()}
      </View>

      {/* Teclado Virtual */}
      {renderKeyboard()}

      {/* Botão de Reiniciar - sempre visível quando o jogo não está no estado inicial */}
      {(gameResult !== 'playing' || incorrectGuesses > 0 || guessedLetters.size > 0) && (
        <TouchableOpacity style={hangmanStyles.resetButton} onPress={startNewGame}>
          <Text style={hangmanStyles.resetText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      )}

      {/* Modal de Fim de Jogo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={hangmanStyles.modalOverlay}>
          <View style={hangmanStyles.modalContent}>
            <Text style={hangmanStyles.modalText}>{getGameMessage()}</Text>
            <TouchableOpacity
              style={hangmanStyles.modalButton}
              onPress={startNewGame}
            >
              <Text style={hangmanStyles.modalButtonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ---------- ESTILOS DO JOGO DA FORCA ----------
const hangmanStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5', // Fundo suave
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  hangmanDrawing: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', // Fonte monoespaçada para o desenho
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hintText: { // Novo estilo para a dica
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    paddingHorizontal: 10, // Adiciona um pouco de padding para não colar nas bordas
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    flexWrap: 'wrap', // Permite que a palavra quebre a linha se for muito longa
    justifyContent: 'center',
  },
  wordLetterContainer: { // Novo estilo para cada letra/traço
    marginHorizontal: 4, // Espaçamento entre as letras
    minWidth: 30, // Largura mínima para o traço
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordLetterText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333', // Cor padrão para as letras
  },
  guessedLetterText: {
    // Estilo para letras adivinhadas (pode ser o mesmo ou diferente)
  },
  hiddenLetterText: {
    color: '#999', // Cor mais clara para o traço
    borderBottomWidth: 3,
    borderBottomColor: '#666', // Borda inferior para o traço
    paddingHorizontal: 2, // Espaçamento interno para o traço
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
  },
  keyButton: {
    width: 45, // Largura fixa para cada botão
    height: 45, // Altura fixa para cada botão
    margin: 4,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  keyButtonDisabled: {
    backgroundColor: '#CCC', // Cor para botões desativados
    opacity: 0.7,
  },
  keyButtonCorrect: {
    backgroundColor: '#28A745', // Verde para letras corretas
  },
  keyButtonIncorrect: {
    backgroundColor: '#DC3545', // Vermelho para letras incorretas
  },
  keyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameResultMessageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
    alignItems: 'center',
  },
  gameResultMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#6C757D', // Cinza para o botão de reiniciar
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  modalText: {
    fontSize: 22,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#28A745', // Botão verde de sucesso
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
