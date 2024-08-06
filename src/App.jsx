import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
	const winnerLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const [matrix, setMatrix] = useState(Array(9).fill(null));
	const [isXTurn, setIsXTurn] = useState(true);
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		checkWinner();
	}, [matrix]);

	const handleMove = (e) => {
		const { id } = e.target;
		let copyMatrix = [...matrix];
		copyMatrix[id] = isXTurn ? "X" : "O";
		setMatrix(copyMatrix);
		setIsXTurn(!isXTurn);
	};

	const checkWinner = () => {
		for (let line of winnerLines) {
			const [index1, index2, index3] = line;
			if (
				matrix[index1] &&
				matrix[index1] === matrix[index2] &&
				matrix[index1] === matrix[index3]
			) {
				setWinner(matrix[index1]);
			}
		}
	};

	const resetGame = () => {
		setMatrix(Array(9).fill(null));
		setIsXTurn(true);
		setWinner(null);
	};

	return (
		<div className="main-container">
			<h1>Tic Tac Toe</h1>
			<div className="board" onClick={handleMove}>
				{matrix.map((item, index) => (
					<div key={index} id={index} className="cell">
						{item}
					</div>
				))}
			</div>
			<div className="game-info">
				<button onClick={resetGame}>Reset</button>
				<div>Next Player: {isXTurn ? "X" : "O"}</div>
				{winner && <div>The winner is {winner}</div>}
			</div>
		</div>
	);
}

export default App;
