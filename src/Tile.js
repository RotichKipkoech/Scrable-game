// src/Tile.js
import React from 'react';

const Tile = ({ row, col, letter, onTileClick }) => {
  return (
    <div className="tile" onClick={() => onTileClick(row, col)}>
      {letter || ''}
    </div>
  );
};

export default Tile;
