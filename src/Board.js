// src/Board.js
import React from 'react';
import Tile from './Tile';

const Board = ({ board, currentPlayer, handleTileClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((tile, colIndex) => (
            <Tile
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              letter={tile}
              onTileClick={handleTileClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
