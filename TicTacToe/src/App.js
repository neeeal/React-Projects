import React, { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

const Board = ({xIsNext, squares, onPlay}) => {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // if (squares[i]) {
    //   return;
    // }
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  };
  const winner = calculateWinner(squares);
  let status;
  (winner) ? (status = `Winner: ${winner}`)
    : (status = `Next player: ${xIsNext ? "X" : "O"}`);
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
      {/* {
        for (let i = 0; i < 3; i++){
          for (let j = 0; j < 3; j++){
            console.log("j");
          }
        }
      } */}
        {/* <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} /> */}
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default function Game () {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove)
  } 
  
  const moves = history.slice(0, -1).map((squares, move) => {
    let description;
    (move > 0) ? description = `Go to move #${move}` 
    : description = `Go to game start`;

    return (<li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>)}
    )
  
  // const currentMoveText = history.slice(0,-1).map((squares, move) => {
  //   return (
  //     <li key={move}>
  //       You are now at move {move}
  //     </li>
  //   )
  // })
  

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
          <ol>{moves}</ol>
      </div>
    </div>
  )
} 