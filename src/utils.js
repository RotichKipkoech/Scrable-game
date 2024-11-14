export const drawTiles = (tileBag, numberOfTiles) => {
    const shuffledTiles = [...tileBag].sort(() => Math.random() - 0.5);
    return shuffledTiles.slice(0, numberOfTiles);
  };
  
  export const calculateScore = (word, letterScores) => {
    let score = 0;
    for (let letter of word) {
      score += letterScores[letter] || 0;
    }
    return score;
  };
  