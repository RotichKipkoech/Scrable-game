import React from "react";
import "./Board.css";

// Define premium squares and their positions
const premiumSquares = [
  { row: 0, col: 0, type: "TW" }, { row: 0, col: 7, type: "TW" }, { row: 0, col: 14, type: "TW" },
  { row: 7, col: 0, type: "TW" }, { row: 7, col: 7, type: "TW" }, { row: 7, col: 14, type: "TW" },
  { row: 14, col: 0, type: "TW" }, { row: 14, col: 7, type: "TW" }, { row: 14, col: 14, type: "TW" },

  { row: 1, col: 5, type: "DL" }, { row: 1, col: 11, type: "DL" },
  { row: 5, col: 1, type: "DL" }, { row: 5, col: 5, type: "DL" }, { row: 5, col: 9, type: "DL" }, { row: 5, col: 13, type: "DL" },
  { row: 9, col: 1, type: "DL" }, { row: 9, col: 5, type: "DL" }, { row: 9, col: 9, type: "DL" }, { row: 9, col: 13, type: "DL" },
  { row: 13, col: 5, type: "DL" }, { row: 13, col: 11, type: "DL" },

  { row: 2, col: 2, type: "DW" }, { row: 2, col: 12, type: "DW" },
  { row: 3, col: 3, type: "DW" }, { row: 3, col: 11, type: "DW" },
  { row: 4, col: 4, type: "DW" }, { row: 4, col: 10, type: "DW" },
  { row: 10, col: 4, type: "DW" }, { row: 10, col: 10, type: "DW" },
  { row: 11, col: 3, type: "DW" }, { row: 11, col: 11, type: "DW" },
  { row: 12, col: 2, type: "DW" }, { row: 12, col: 12, type: "DW" },
];

const Board = ({ onTileClick }) => {
  const [tiles, setTiles] = React.useState(new Array(15).fill(null).map(() => new Array(15).fill(null))); // Initialize empty tiles

  const renderTile = (row, col) => {
    const premium = premiumSquares.find(p => p.row === row && p.col === col);
    let premiumClass = premium ? premium.type : "";
    return (
      <div
        className={`tile ${premiumClass}`}
        key={`${row}-${col}`}
        onClick={() => onTileClick(row, col)}
      >
        {tiles[row][col] || ""}
        {premium && <span className="premium-label">{premium.type}</span>}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {Array.from({ length: 15 }, (_, row) =>
          Array.from({ length: 15 }, (_, col) => renderTile(row, col))
        )}
      </div>
    );
  };

  return renderBoard();
};

export default Board;
