import React, { useState, useEffect } from 'react';
import Board from './Board'; // Import the board component
import { calculateWordScore, drawTiles } from './utils';  // Correct imports
import { SPECIAL_TILES, TILE_POOL } from './utils';  // Import special tiles and tile pool

const Game = () => {
  const [players, setPlayers] = useState([
    { name: 'Player 1', score: 0, tiles: [] },
    { name: 'Player 2', score: 0, tiles: [] },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [tilesRemaining, setTilesRemaining] = useState(TILE_POOL.length);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(Array(15).fill().map(() => Array(15).fill(null))); // 15x15 grid for the board

  // This effect draws the initial tiles for each player
  useEffect(() => {
    const initialPlayers = players.map((player) => ({
      ...player,
      tiles: drawTiles(TILE_POOL, 7),  // Draw 7 tiles for each player
    }));
    setPlayers(initialPlayers);
  }, []);

  // Function to handle player turn and update scores
  const handleTurn = (word, position, direction) => {
    if (gameOver) return;

    const currentPlayer = players[currentPlayerIndex];
    const wordScore = calculateWordScore(word, position, direction);
    const newScore = currentPlayer.score + wordScore;

    // Update the player's score and set the next turn
    const updatedPlayers = players.map((player, index) =>
      index === currentPlayerIndex ? { ...player, score: newScore } : player
    );
    setPlayers(updatedPlayers);

    // Draw new tiles for the current player
    const remainingTiles = TILE_POOL.filter((tile) => !currentPlayer.tiles.includes(tile));
    const newTiles = drawTiles(remainingTiles, 7 - currentPlayer.tiles.length);  // Draw missing tiles
    const updatedCurrentPlayer = { ...currentPlayer, tiles: newTiles };
    const updatedPlayersForTiles = updatedPlayers.map((player, index) =>
      index === currentPlayerIndex ? updatedCurrentPlayer : player
    );
    setPlayers(updatedPlayersForTiles);

    // Update the tile count and check for game over condition
    setTilesRemaining(remainingTiles.length);
    if (remainingTiles.length === 0 || newTiles.length === 0) {
      setGameOver(true);
    } else {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);  // Switch player
    }
  };

  // Handle the tile placement on the board
  const handleTileClick = (row, col) => {
    if (gameOver) return;
    // Here, you would add logic to place a tile and update the board
    const newBoard = [...board];
    newBoard[row][col] = players[currentPlayerIndex].tiles[0]; // Placeholder: placing the first tile
    setBoard(newBoard);
  };

  // Function to handle the end of the game and determine the winner
  const getWinner = () => {
    if (!gameOver) return null;
    return players.reduce((winner, player) =>
      player.score > winner.score ? player : winner
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Scrabble Game</h1>

      <div>
        <h2>Current Player: {players[currentPlayerIndex].name}</h2>
        <p>Score: {players[currentPlayerIndex].score}</p>
        <p>Tiles Remaining: {tilesRemaining}</p>
        <div>
          <h3>Your Tiles:</h3>
          <p>{players[currentPlayerIndex].tiles.join(', ')}</p>
        </div>
        <div>
          {/* Example word placement */}
          <button
            onClick={() => handleTurn('WORD', [7, 7], 'horizontal')}
          >
            Play "WORD" horizontally at [7, 7]
          </button>
        </div>
      </div>

      {/* Render the Board */}
      <Board tiles={board} handleTileClick={handleTileClick} />

      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <h3>Winner: {getWinner().name}</h3>
          <p>Final Score: {getWinner().score}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
