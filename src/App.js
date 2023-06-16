import { useEffect, useState } from 'react'
//style
import './App.css'
import Card from './components/Card'
import Confetti from 'react-confetti'

const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
	{ src: '/img/ladyBug.png', matched: false },
	{ src: '/img/psyduck.png', matched: false },
	{ src: '/img/jigglypuff.png', matched: false },
	{ src: '/img/cuteCat.png', matched: false },
	{ src: '/img/marieCat.png', matched: false },
	{ src: '/img/unicorn.png', matched: false },
	{ src: '/img/groot.png', matched: false },
	{ src: '/img/cupcake.png', matched: false },
	{ src: '/img/gengar.png', matched: false },
	{ src: '/img/squirtle.png', matched: false },
	{ src: '/img/togepi.png', matched: false },
	{ src: '/img/charmander.png', matched: false },
	{ src: '/img/eevee.png', matched: false },
	{ src: '/img/Pikachu.png', matched: false },
	{ src: '/img/turtle.png', matched: false },
	{ src: '/img/crown.png', matched: false },
	{ src: '/img/unicornGhost.png', matched: false },
	{ src: '/img/ghost.png', matched: false },
	{ src: '/img/squirtle1.png', matched: false },
	{ src: '/img/winnie.png', matched: false },
	{ src: '/img/unicornFish.png', matched: false },
	{ src: '/img/lightbulb.png', matched: false },
	{ src: '/img/pineapple1.png', matched: false },
	{ src: '/img/pineapple2.png', matched: false },
	{ src: '/img/cherry.png', matched: false },
	{ src: '/img/raspberry.png', matched: false },
]

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(false)

	const endGame = cards.filter(card => card.matched === true)

	//shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map(item => ({ ...item, id: Math.random() * 100 }))
		setCards(shuffledCards)
		setTurns(0)
		setChoiceOne(null)
		setChoiceTwo(null)
	}

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prev => prev + 1)
		setDisabled(false)
	}

	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.src === choiceTwo.src) {
				setCards(prev => {
					return prev.map(card => {
						return card.src === choiceOne.src
							? { ...card, matched: true }
							: { ...card }
					})
				})
				resetTurn()
			} else {
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	useEffect(() => {
		shuffleCards()
	}, [])
	return (
		<div className='App'>
			{endGame.length === 64 && <Confetti className='confetti' />}

			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<section className='card-grid'>
				{cards !== [] &&
					cards.map(card => (
						<Card
							key={card.id}
							card={card}
							handleChoice={handleChoice}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					))}
			</section>
			<p>Turns: {turns}</p>
		</div>
	)
}

export default App
