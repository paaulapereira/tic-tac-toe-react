import Square from './Square';

const Board = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i, col, row, isWinning) => {
    return (
      <Square
        key={i}
        isWinning={isWinning}
        value={squares[i]}
        onClick={() => onClick(i, col, row)}
      />
    );
  };
  let board = [];
  let col = 1;
  let row = 1;
  let newSquares;
  let isWinning;
  for (let i = 0; i < 9; i += 3) {
    newSquares = [];
    for (let j = 0; j < 3; j++) {
      if (winningLine) {
        isWinning = winningLine.includes(i + j) ? true : false;
      }
      newSquares.push(renderSquare(i + j, col, row, isWinning));
      col++;
    }
    row++;
    col = 1;
    board.push(<>{newSquares}</>);
  }
  return <div className="board">{board}</div>;
};

export default Board;
