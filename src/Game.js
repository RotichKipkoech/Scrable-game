import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import TileRack from './TileRack';
import { drawTiles, calculateScore } from './utils';

const tileBag = [
  'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H',
  'I', 'I', 'I', 'I', 'I', 'I', 'I', 'J', 'K', 'L', 'L', 'L', 'M', 'M', 'N', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'P', 'P',
  'Q', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'U', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'Y', 'Y', 'Z'
];

const letterScores = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1,
  U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

function Game() {
  const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill(null)));
  const [rack, setRack] = useState(drawTiles(tileBag, 7));
  const [currentWord, setCurrentWord] = useState('');
  const [playerScores, setPlayerScores] = useState({ playerOne: 0, playerTwo: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [animation, setAnimation] = useState(false); // Flag for animation
  const [currentPlayer, setCurrentPlayer] = useState('playerOne');

  const startGame = () => {
    setGameStarted(true);
    setBoard(Array(15).fill(null).map(() => Array(15).fill(null)));
    setRack(drawTiles(tileBag, 7));
    setPlayerScores({ playerOne: 0, playerTwo: 0 });
    setCurrentPlayer('playerOne');
    setAnimation(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };

  const handleTileClick = (tile, row, col) => {
    // Guard clause to ensure tile and board position are valid
    if (!tile || !row || !col || row < 0 || col < 0 || row >= 15 || col >= 15) return;

    // Check if the spot is already occupied
    if (board[row][col] !== null) {
      return;
    }

    // Place the tile on the board
    const newBoard = [...board];
    newBoard[row][col] = tile;
    setBoard(newBoard);

    // Update the tile rack by removing the selected tile
    const newRack = rack.filter(t => t !== tile);
    setRack(newRack);

    // Calculate the score for the new word
    const newWord = currentWord + tile;
    setCurrentWord(newWord);

    const score = calculateScore(newWord, letterScores);
    setPlayerScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + score,
    }));

    setCurrentPlayer(currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne');
  };

  // Animation of word from rack to board
  useEffect(() => {
    if (animation) {
      setTimeout(() => {
        handleTileClick('C', 7, 7); // Place C at (7,7)
        setTimeout(() => handleTileClick('A', 7, 8), 500); // Place A after 500ms
        setTimeout(() => handleTileClick('T', 7, 9), 1000); // Place T after 1000ms

        setTimeout(() => {
          setRack(drawTiles(tileBag, 7)); // Reset tile rack after animation
        }, 3000);
      }, 2000);
    }
  }, [animation]);

  return (
    <div className="game-container">
      <h1>Scrabble Game</h1>
      <p>Current Player: {currentPlayer === 'playerOne' ? 'Player One' : 'Player Two'}</p>
      <p>Player One Score: {playerScores.playerOne}</p>
      <p>Player Two Score: {playerScores.playerTwo}</p>

      <Board board={board} />

      <TileRack rack={rack} onTileClick={handleTileClick} />

      <p>Current Word: {currentWord}</p>

      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <button onClick={endGame}>End Game</button>
      )}
    </div>
  );
}

export default Game;
