import React, { Component } from 'react';
import ReactDOM from 'react-dom';	
import Chessdiagram from '../src/chessdiagram.js';

import './App.css';

const pieces = [
			'R@a1', 'N@b1', 'B@c1', 'Q@d1', 'K@e1', 'B@f1', 'N@g1', 'R@h1',
			'P@a2', 'P@b2', 'P@c2', 'P@d2', 'P@e2', 'P@f2', 'P@g2', 'P@h2',
			'p@a7', 'p@b7', 'p@c7', 'p@d7', 'p@e7', 'p@f7', 'p@g7', 'p@h7',
			'r@a8', 'n@b8', 'b@c8', 'q@d8', 'k@e8', 'b@f8', 'n@g8', 'r@h8',
		];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lightSquareColor: "#2492FF", // light blue
			darkSquareColor: "#005EBB", // dark blue
			currentPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
			flip: false,
			lastMessage: '',
			squareSize: 45,
		};
	}

// event handlers:

	_onPositionChanged(evt) { // user inputted new position
		this.setState({currentPosition: evt.target.value});
	}

	_onFlipChanged(evt) { //flip board
		this.setState({flip: evt.target.checked});
	}

	_onLightSquareColorChanged(evt) {
		this.setState({lightSquareColor: evt.target.value});
	}

	_onDarkSquareColorChanged(evt) {
		this.setState({darkSquareColor: evt.target.value});
	}

	_onMovePiece(piece, fromSquare, toSquare) { // user moved a piece
		// echo move back to user:
		let message = 'You moved ' + piece + fromSquare + " to " + toSquare + ' !';
		this.setState({lastMessage: message}, (()=> {
			setTimeout(()=> {
					this.setState({lastMessage: ''}); 
			}, 2000); // clear message after 2s	
		}));
	}

// the render() function:
  render() {
    return (
			<div className="demo">
				<h1>Chess Diagram</h1>
				<div>
					<p> Enter a position (using a FEN string) here:</p>
					<input type="text" value={this.state.currentPosition} size="70" onChange={this._onPositionChanged.bind(this)} 
						autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck="false"/>
					<p> Square Size: </p>
					<input type="range" value={this.state.squareSize} min={10} max={100} step={1} onChange = {evt => {
						this.setState({squareSize: Number(evt.target.value)});
					}}/>
					<p>Flip Board ?<input type="checkbox" value={this.state.flip} onChange={this._onFlipChanged.bind(this)} /></p>
					<p>Light Square Color:<input type="color" value={this.state.lightSquareColor} onChange={this._onLightSquareColorChanged.bind(this)} /></p>
					<p>Dark Square Color:<input type="color" value={this.state.darkSquareColor} onChange={this._onDarkSquareColorChanged.bind(this)} /></p>
					<p/>
				</div>
					<Chessdiagram flip={this.state.flip} fen={this.state.currentPosition} squareSize={this.state.squareSize} 
						lightSquareColor={this.state.lightSquareColor} darkSquareColor={this.state.darkSquareColor} onMovePiece={this._onMovePiece.bind(this)}/>
				<p><strong>{this.state.lastMessage}</strong></p>
			</div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);