// src/Game.js
import React, { useState, useEffect } from 'react';
import Board from './Board';
import { drawTiles, calculateWordScore } from './utils';

const Game = () => {
  const [players, setPlayers] = useState([
    { name: 'Player 1', rack: drawTiles(7), score: 0 },
    { name: 'Player 2', rack: drawTiles(7), score: 0 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [board, setBoard] = useState(Array(15).fill().map(() => Array(15).fill(null)));
  const [tilesRemaining, setTilesRemaining] = useState(100); // Total tiles in the pool
  
  useEffect(() => {
    if (tilesRemaining === 0 || !canMakeMove(players)) {
      alert('Game Over!');
      getWinner();
    }
  }, [tilesRemaining, players]);

  const switchTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const canMakeMove = (players) => {
    // Logic to check if the current player can make a move (like having enough tiles)
    return players[currentPlayerIndex].rack.length > 0;
  };

  const updateScore = (word) => {
    const score = calculateWordScore(word);
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].score += score;
    setPlayers(newPlayers);
  };

  const handleTileClick = (row, col) => {
    const letter = prompt("Enter a letter");
    if (letter && letter.length === 1) {
      const newBoard = [...board];
      newBoard[row][col] = letter.toUpperCase();
      setBoard(newBoard);
      updateScore(letter);
    }
  };

  const getWinner = () => {
    const scores = players.map(player => player.score);
    const highestScore = Math.max(...scores);
    const winner = players.find(player => player.score === highestScore);
    alert(`${winner.name} wins with ${winner.score} points!`);
  };

  return (
    <div>
      <h1>Scrabble Game</h1>
      <h2>{players[currentPlayerIndex].name}'s Turn</h2>
      <div>
        {players[currentPlayerIndex].rack.map((tile, index) => (
          <span key={index}>{tile.letter} </span>
        ))}
      </div>
      <button onClick={switchTurn}>End Turn</button>
      <Board board={board} currentPlayer={players[currentPlayerIndex]} handleTileClick={handleTileClick} />
    </div>
  );
};

export default Game;
