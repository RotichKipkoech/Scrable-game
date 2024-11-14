import React, { useState } from 'react';
import Board from './Board';
import TileRack from './TileRack';
import './App.css';

function App() {
  const [rack, setRack] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G']); // Initial rack tiles
  const [selectedTile, setSelectedTile] = useState(null); // Tile selected from the rack
  const [gameOver, setGameOver] = useState(false); // Game status: whether the game is over

  const handleTileSelect = (tile) => {
    if (gameOver) return; // Prevent selecting tiles if the game is over
    setSelectedTile(tile); // Set the selected tile from the rack
  };

  const handleTileClick = (row, col) => {
    if (gameOver || !selectedTile) return; // Prevent tile placement if game is over or no tile is selected

    // Place the selected tile on the board
    setRack(prevRack => prevRack.filter(tile => tile !== selectedTile)); // Remove tile from rack
    setSelectedTile(null); // Reset selected tile
  };

  const endGame = () => {
    setGameOver(true);
    // Logic for calculating final scores can go here
  };

  return (
    <div className="app">
      <h1>Scrabble Game</h1>

      {/* Game Controls */}
      <div className="game-controls">
        {gameOver ? (
          <button onClick={() => window.location.reload()} className="end-button">Restart Game</button>
        ) : (
          <button onClick={endGame} className="end-button start-game-button">Start Game</button> // Add the new class here
        )}
      </div>

      {/* Tile Rack */}
      {!gameOver && <TileRack tiles={rack} onTileSelect={handleTileSelect} />}

      {/* Board */}
      {!gameOver && <Board onTileClick={handleTileClick} />}

      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
}

export default App;
