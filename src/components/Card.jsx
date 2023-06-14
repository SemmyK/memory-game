import './Card.css'

function Card({ card, handleChoice, flipped, disabled }) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
		}
	}
	return (
		<div className='card'>
			<div className={flipped ? 'flipped' : ''}>
				<img src={card.src} alt='front side card' className='front' />

				<img
					src='/img/cover.png'
					alt='back side card'
					className='back'
					onClick={handleClick}
				/>
			</div>
		</div>
	)
}
export default Card
