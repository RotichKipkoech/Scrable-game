// src/utils.js
export const TILE_POOL = [
    { letter: 'A', points: 1 }, { letter: 'A', points: 1 }, { letter: 'A', points: 1 },
    { letter: 'A', points: 1 }, { letter: 'A', points: 1 }, { letter: 'A', points: 1 },
    { letter: 'B', points: 3 }, { letter: 'B', points: 3 },
    { letter: 'C', points: 3 }, { letter: 'C', points: 3 },
    { letter: 'D', points: 2 }, { letter: 'D', points: 2 }, { letter: 'D', points: 2 },
    { letter: 'E', points: 1 }, { letter: 'E', points: 1 }, { letter: 'E', points: 1 },
    { letter: 'E', points: 1 }, { letter: 'E', points: 1 },
    { letter: 'F', points: 4 }, { letter: 'F', points: 4 },
    { letter: 'G', points: 2 }, { letter: 'G', points: 2 },
    { letter: 'H', points: 4 }, { letter: 'H', points: 4 },
    { letter: 'I', points: 1 }, { letter: 'I', points: 1 },
    { letter: 'J', points: 8 }, { letter: 'J', points: 8 },
    { letter: 'K', points: 5 }, { letter: 'K', points: 5 },
    { letter: 'L', points: 1 }, { letter: 'L', points: 1 },
    { letter: 'M', points: 3 }, { letter: 'M', points: 3 },
    { letter: 'N', points: 1 }, { letter: 'N', points: 1 },
    { letter: 'O', points: 1 }, { letter: 'O', points: 1 },
    { letter: 'P', points: 3 }, { letter: 'P', points: 3 },
    { letter: 'Q', points: 10 }, { letter: 'Q', points: 10 },
    { letter: 'R', points: 1 }, { letter: 'R', points: 1 },
    { letter: 'S', points: 1 }, { letter: 'S', points: 1 },
    { letter: 'T', points: 1 }, { letter: 'T', points: 1 },
    { letter: 'U', points: 1 }, { letter: 'U', points: 1 },
    { letter: 'V', points: 4 }, { letter: 'V', points: 4 },
    { letter: 'W', points: 4 }, { letter: 'W', points: 4 },
    { letter: 'X', points: 8 }, { letter: 'X', points: 8 },
    { letter: 'Y', points: 4 }, { letter: 'Y', points: 4 },
    { letter: 'Z', points: 10 }, { letter: 'Z', points: 10 }
  ];
  
  export const drawTiles = (numTiles) => {
    const shuffledTiles = [...TILE_POOL].sort(() => Math.random() - 0.5);
    return shuffledTiles.slice(0, numTiles);
  };
  
  export const getLetterPoints = (letter) => {
    const letterPoints = {
      A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1,
      M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
      Y: 4, Z: 10
    };
  
    return letterPoints[letter] || 0;
  };
  
  export const calculateWordScore = (word) => {
    return word.split('').reduce((score, letter) => score + getLetterPoints(letter), 0);
  };
  