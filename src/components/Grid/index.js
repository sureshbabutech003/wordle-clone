import React from 'react';

const Grid = ({ guesses }) => {
  return (
    <div className="grid m-3">
      {guesses.map((guessObj, index) => (
        <div key={index} className="row m-2">
          {guessObj.word.split('').map((letter, i) => (
            <span key={i} className={`cell ${guessObj.feedback[i]}`}>
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
