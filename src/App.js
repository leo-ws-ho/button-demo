import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Tile(props) {
  // props.row, props.col: indicates the location of the tile
  // props.handler: the handler for the click.
  let style = {};
  if (props.status === 0) {
    style.backgroundColor = 'red';
  }
  else {
    style.backgroundColor = 'green';
  }

  return (
    <button 
      onClick={props.handler} 
      className={`row-${props.row} col-${props.col}`}
      style={style}
    />
  );
}

function App() {
  // store the current game state
  const [board, setBoard] = useState([
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
  ]);

  function toggle(b, row, col) {
    // from b, toggle [row][col].  
    b[row][col] = b[row][col] === 0 ? 1 : 0;
  }

  function getRowCol(tile) {
    return [parseInt(tile.className[4]), 
            parseInt(tile.className[10])];
  }

  function copyBoard(b) {
    let result = [];
    for (let i = 0; i < b.length; i++) {
      result.push([...(b[i])]);
    }
    return result;

//    return [...b];
  }

  function handleTileClick(e) {
    const [row, col] = getRowCol(e.target); // get the row, col from the button.

    let b = copyBoard(board);

    toggle(b, row, col);
    if (row < 2)
      toggle(b, row+1, col);
    if (row > 0)
      toggle(b, row-1, col);
    if (col < 2)
      toggle(b, row, col+1);
    if (col > 0)
      toggle(b, row, col-1);

    setBoard(b);
    // change it to 
    // [
    // [0, 0, 1],
    // [0, 0, 0],
    // [0, 0, 0]
    // ]

    // board[0][2] = 1;  // this doesn't work, we can't update state directly.

    // setBoard(toggle(board, 0, 2));
  }

  let tiles = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tiles.push(<Tile 
        row={i} 
        col={j} 
        key={"" + i + j}
        handler={handleTileClick} 
        status={board[i][j]} 
      />);
    }
  }

  return (
    <div className="gameboard">
      {
        tiles
      }
      {/* <Tile row="0" col="0" handler={handleTileClick} status={board[0][0]}></Tile>
      <Tile row="0" col="1" handler={handleTileClick} status={board[0][1]}></Tile>
      <Tile row="0" col="2" handler={handleTileClick} status={board[0][2]}></Tile>
      <Tile row="1" col="0" handler={handleTileClick} status={board[1][0]}></Tile>
      <Tile row="1" col="1" handler={handleTileClick} status={board[1][1]}></Tile>
      <Tile row="1" col="2" handler={handleTileClick} status={board[1][2]}></Tile>
      <Tile row="2" col="0" handler={handleTileClick} status={board[2][0]}></Tile>
      <Tile row="2" col="1" handler={handleTileClick} status={board[2][1]}></Tile>
      <Tile row="2" col="2" handler={handleTileClick} status={board[2][2]}></Tile> */}
    </div>
  );
}

export default App;
