import Toy, { Component } from './Toy.js';

class Board extends Component {
  renderSquare(i) {
    return (
      <Square value={i} />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { value } = this.state;
    return (
      <button className="square" onClick={() => this.setState({ value: value ? '' : 'X' })}>
        {this.state.value}
      </button>
    );
  }
}

const a = (
  <Board />
)

Toy.render(
  a,
  document.body
)