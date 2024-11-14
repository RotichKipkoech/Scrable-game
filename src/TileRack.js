import React from 'react';
import './TileRack.css'; // Ensure this CSS file exists

function TileRack({ tiles, onTileSelect }) {
  return (
    <div className="tile-rack">
      {tiles.map((tile, index) => (
        <div 
          key={index} 
          className="tile" 
          onClick={() => onTileSelect(tile)} 
          role="button"
        >
          {tile}
        </div>
      ))}
    </div>
  );
}

export default TileRack;
