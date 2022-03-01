import Board from './Board';
import React, { useState } from 'react';
import { calculateWinner } from '../util';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [positionSquares, setPositionSquares] = useState([]);
  const [isAsc, setIsAsc] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? 'X' : 'O';

  const handleClick = (i, col, row) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // si ya ha acabado o esta ocupado
    if (winner || squares[i]) return;
    // si se puede seguir jugando
    squares[i] = xO;
    const position = `(${col}, ${row})`;
    const oldPosition = [...positionSquares];
    setPositionSquares([...oldPosition, position]);
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const orderMoves = () => {
    const newMove = history.slice();
    newMove.reverse();
    setIsAsc(!isAsc);
  };
  const renderMoves = () =>
    history.map((_step, move) => {
      let newPosition;
      let orderedMove = isAsc ? move : history.length - move - 1;
      positionSquares.map((position, index) =>
        move - 1 === index
          ? (newPosition = position)
          : orderedMove - 1 === index
          ? (newPosition = position)
          : '',
      );
      const destination = orderedMove
        ? `Movimiento #${orderedMove} ${newPosition}`
        : 'Inicio del juego';
      return (
        <li key={move} className={orderedMove === stepNumber ? 'current-move' : ''}>
          {orderedMove} -{' '}
          <button className="moves" onClick={() => jumpTo(orderedMove)}>
            {destination}
          </button>
        </li>
      );
    });

  return (
    <>
      <div className="row">
        <div className="display-board">
          <h1 className="title">Tic Tac Toe</h1>
          <Board
            squares={history[stepNumber]}
            onClick={(i, col, row) => handleClick(i, col, row)}
            winningLine={winner ? winner.winningLine : null}
          />
        </div>
        <div className="historial">
          <h2>
            {winner
              ? 'Ganador: ' + winner.winningChar
              : history.length === 10
              ? 'Ha sido un empate :('
              : 'Siguiente jugador: ' + xO}
          </h2>
          <div className="info">
            <h3>Historial de Movimientos</h3>
            <button className="btn" onClick={() => orderMoves()}>
              Ordenar {!isAsc ? 'Ascendiente' : 'Descendiente'}
            </button>
            <div className="moves-list">{renderMoves()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Game;
