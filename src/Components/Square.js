const Square = ({ value, onClick, isWinning }) => {
  const style = value ? `square ${value}` : `square`;
  const isWinningSquare = isWinning ? 'winning-square' : '';
  return (
    <button className={`${style} ${isWinningSquare}`} onClick={onClick}>
      {value}
    </button>
  );
};
export default Square;
