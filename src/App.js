import React, { useState, useEffect } from 'react';
import './App.css'; // Importing custom CSS for additional styling
import Grid from './components/Grid'; // Import Grid component to display guesses
import GameStatus from './components/GameStatus'; // Import GameStatus component for game result
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

// List of words for the game
const WORD_LIST = ['apple', 'grape', 'mango', 'peach', 'plumb'];
const getRandomWord = () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

// Function to provide feedback on the guess
const getFeedback = (guess, target) => {
  return guess.split('').map((letter, index) => {
    if (letter === target[index]) return 'green'; // Correct letter in correct position
    if (target.includes(letter)) return 'yellow'; // Correct letter but in wrong position
    return 'gray';  // Letter not in the word
  });
};

const App = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord); // Target word to guess
  const [guesses, setGuesses] = useState([]); // Array to store guesses
  const [currentGuess, setCurrentGuess] = useState(''); // Current guess input by the user
  const [gameStatus, setGameStatus] = useState('playing'); // Current game status (playing, won, lost)
  const [darkMode, setDarkMode] = useState(false); // Flag for dark mode

  // Effect hook to toggle dark mode on body
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : ''; // Apply dark mode class to body
  }, [darkMode]);

  // Handle user guess submission
  const handleGuess = () => {
    if (currentGuess.length !== 5 || !WORD_LIST.includes(currentGuess.toLowerCase())) return; // Validate guess
    const feedback = getFeedback(currentGuess.toLowerCase(), targetWord); // Get feedback on the guess
    const newGuesses = [...guesses, { word: currentGuess, feedback }]; // Store guess & feedback
    setGuesses(newGuesses); // Update guesses array

    // Check if the guess is correct
    if (currentGuess.toLowerCase() === targetWord) {
      setGameStatus('won'); // Player wins
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost'); // Player loses after 6 guesses
    }
    setCurrentGuess(''); // Clear input field
  };

  // Reset the game to initial state
  const resetGame = () => {
    setGuesses([]); // Clear guesses
    setCurrentGuess(''); // Clear current guess
    setGameStatus('playing'); // Set status back to playing
    setTargetWord(getRandomWord()); // Select a new target word
  };
 console.log(guesses) // Debugging - Prints guesses in the console
  return (
    <div className='App'> 
    <header className='App-header'>
    <div className={`game-container ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} border rounded m-1 p-5 min-h-screen flex flex-col items-center`}>
      <h1 className="text-3xl font-bold mb-4">Wordle Clone</h1>
      <button className="mb-4 px-4 py-2 border rounded" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Grid guesses={guesses} /> {/* Render guesses in grid format */}
      {gameStatus === 'playing' ? (
        <input
          type="text"
          className="border p-2 rounded w-24 text-center"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())} // Convert input to uppercase
          maxLength={5}
        />
      ) : (
        <GameStatus status={gameStatus} /> // Show game status (win/loss)
      )}
      <button className={`mt-2 px-4 py-2 bg-blue-500  ${darkMode ? 'bg-blue-500 text-white' : 'text-black'} border rounded`} onClick={handleGuess} disabled={gameStatus !== 'playing'}>
        Submit
      </button>
      <button className={`mt-2 px-4 py-2 bg-red-500 ${darkMode ? 'bg-red-500 text-white' : 'text-black'} border rounded`} onClick={resetGame}>New Game</button>
    </div>
    </header>
    </div>
  );
};

export default App;
