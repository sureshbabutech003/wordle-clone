import React from 'react';

const GameStatus = ({ status }) => {
  return (
    <div className="game-status">
      {status === 'won' ? <h2>🎉 You Win! 🎉</h2> : <h2>😢 Game Over! 😢</h2>}
    </div>
  );
};

export default GameStatus;
