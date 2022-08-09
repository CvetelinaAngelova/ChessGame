import Chessboard from 'chessboardjsx'
import { Chess } from 'chess.js'
import React, { useRef, useState } from 'react'
const Board = ({ game, currentBoard, playGameInterval }) => {
	const chessRef = useRef(new Chess())
	const [position, setPosition] = useState(chessRef.current.fen())
	const [isPlaying, setIsPlaying] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [remainingFens, setRemaingingFens] = useState(game.fens.slice(1))
	const defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

	const playInterbaclCbk = () => {
		const currentFen = remainingFens.shift()
		chessRef.current.load(currentFen)
    	console.log(remainingFens)
		setPosition(chessRef.current.fen())
		setRemaingingFens(remainingFens)
		if (remainingFens.length === 0) {
			clearInterval(playGameInterval.current)
			setGameOver(true)
			return
		}
	}

	const playCurrentGame = (game) => {
		const fensArr = [...game.fens.slice(1)]
		setIsPlaying(!isPlaying)
		if (isPlaying) {
			clearInterval(playGameInterval.current)
		} else {
			playInterbaclCbk(fensArr)
			playGameInterval.current = setInterval(playInterbaclCbk, 1000, fensArr)
		}
	}

	const playNextMove = () => {
		const nextFen = remainingFens.shift()
		setPosition(nextFen)
		setRemaingingFens(remainingFens)
		chessRef.current.load(nextFen)
	}

	const resetCurrentGame = () => {
		clearInterval(playGameInterval.current)
		chessRef.current.reset()
		chessRef.current.load(defaultFen)
		setIsPlaying(false)
		setPosition(defaultFen)
		setRemaingingFens(game.fens.slice(1))
    setGameOver(false)
	}

	return (
		<div className='panel-content'>
			<h2>
				Match: {game.white} vs {game.black}
			</h2>
			<p>Date: {game.date}</p>
			<p>Result: {game.result}</p>
			<p>Moves: {game.moves.toString()}</p>
			<div
				style={{
					display: 'flex',
					alignTtems: 'center',
					justifyContent: 'center'
				}}>
				<div>
					<div className='chessboard-container'>
						<Chessboard
							currentBoard={currentBoard}
							position={position}
						/>
					</div>
					<div className='buttons-container'>
						<button
							type='button'
							onClick={() => playCurrentGame(game)}
							disabled={gameOver ? true : false}>
							{isPlaying ? 'Stop' : 'Play'}
						</button>
						<button
							type='button'
							onClick={() => playNextMove(game)}
							disabled={isPlaying ? true : false}>
							Next
						</button>
						<button type='button' onClick={resetCurrentGame}>
							Reset
						</button>
            {gameOver && <div style={{display:'block'}}>Game Over</div>}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Board
