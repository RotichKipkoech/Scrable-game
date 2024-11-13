// src/Tile.js
import React from 'react';

const Tile = ({ row, col, letter, onTileClick, tileType }) => {
  return (
    <div 
      className={`tile ${tileType ? tileType.replace(' ', '-').toLowerCase() : ''}`} 
      onClick={() => onTileClick(row, col)}
    >
      {letter || ''}
      {tileType && <div className="tile-type">{tileType}</div>}
    </div>
  );
};

export default Tile;
