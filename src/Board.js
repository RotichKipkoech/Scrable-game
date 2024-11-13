import React from 'react';
import { SPECIAL_TILES } from './utils'; // Import special tiles

const Board = ({ tiles, handleTileClick }) => {
  const boardSize = 15; // Standard Scrabble board size (15x15)

  const renderBoard = () => {
    const board = [];

    for (let row = 0; row < boardSize; row++) {
      const cells = [];
      for (let col = 0; col < boardSize; col++) {
        const isSpecialTile = SPECIAL_TILES.find(
          (tile) => tile.row === row && tile.col === col
        );

        cells.push(
          <td
            key={`${row}-${col}`}
            className={`cell ${isSpecialTile ? isSpecialTile.type : ''}`}
            onClick={() => handleTileClick(row, col)}
          >
            {tiles[row][col] || (isSpecialTile ? isSpecialTile.type : '')}
          </td>
        );
      }
      board.push(
        <tr key={row}>
          {cells}
        </tr>
      );
    }

    return board;
  };

  return (
    <table className="board">
      <tbody>{renderBoard()}</tbody>
    </table>
  );
};

export default Board;
