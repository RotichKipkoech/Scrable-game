// src/utils.js

// Tile pool with letter distributions (simplified for demonstration purposes)
export const TILE_POOL = [
    'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 
    'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'I', 'I', 'I', 'J', 'K', 'L', 
    'L', 'M', 'M', 'N', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'O', 'P', 'P', 'Q', 
    'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'U', 'U', 'V', 
    'W', 'W', 'X', 'Y', 'Z'
  ];
  
  // Special Tiles
  export const SPECIAL_TILES = [
    { row: 0, col: 3, type: 'Double Letter' },
    { row: 1, col: 1, type: 'Triple Word' },
    { row: 7, col: 7, type: 'Double Word' },
    { row: 14, col: 14, type: 'Triple Letter' }
  ];
  
  // Function to calculate the score of a word based on its letters and position
  export const calculateWordScore = (word, position, direction) => {
    let score = 0;
    let wordMultiplier = 1;
  
    word.split('').forEach((letter, index) => {
      const letterScore = getLetterPoints(letter);
      score += letterScore;
  
      // Apply special tiles (example for Double Letter)
      const tile = SPECIAL_TILES.find(t => t.row === position[0] && t.col === position[1] + index);
      if (tile) {
        if (tile.type === 'Double Letter') {
          score += letterScore;  // Add the same score to double
        }
      }
    });
  
    return score * wordMultiplier;
  };
  
  // Get the point value of a letter
  export const getLetterPoints = (letter) => {
    const points = {
      A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8,
      K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1,
      U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
    };
    return points[letter.toUpperCase()] || 0;
  };
  
  // Function to draw random tiles from the pool
  export const drawTiles = (tilePool, count) => {
    const shuffledTiles = [...tilePool].sort(() => 0.5 - Math.random());
    return shuffledTiles.slice(0, count);
  };
  