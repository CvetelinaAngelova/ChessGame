import React, { useEffect, useState, useRef } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Chess } from 'chess.js'
import Board from './components/Board/board'

function App() {
	const chessRef = useRef(new Chess())
	const [position, setPosition] = useState(chessRef.current.fen())
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentBoard, setCurrentBoard] = useState()
	const [games, setGames] = useState()
	let playGameInterval = useRef()

	const switchTab = (data) => {
		if (isPlaying) {
			setIsPlaying(false)
		}
		clearInterval(playGameInterval.current)
		setCurrentBoard(data)
		chessRef.current.load(data.fens[0])
		setPosition(chessRef.current.fen())
	}
	// Function to collect data
	const getApiData = async () => {
		const response = await fetch('http://localhost:8080/games').then(
			(response) => response.json()
		)

		const filteredGames = response.map((item, key) => {
			const uniqueKey = `game-${key}`
			item['uniqueKey'] = uniqueKey
			return item
		})

		setGames(filteredGames)
		setCurrentBoard(filteredGames[0])
	}

	useEffect(() => {
		getApiData()
	}, [])

	return (
		<div className='app'>
			<Tabs>
				<TabList>
					{games &&
						games.map((game) => (
							<Tab key={game.uniqueKey} onClick={() => switchTab(game)}>
								<p>
									{game.white} vs {game.black}
								</p>
							</Tab>
						))}
				</TabList>
				{games &&
					games.map((game) => (
						<TabPanel key={game.uniqueKey}>
							<Board
								{...{
									game,
									currentBoard,
									position,
									playGameInterval
								}}
								key={game.uniqueKey}
							/>
						</TabPanel>
					))}
			</Tabs>
		</div>
	)
}

export default App
