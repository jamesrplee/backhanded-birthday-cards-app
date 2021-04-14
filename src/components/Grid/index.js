import './styles.css'

const Grid = ({ cards, setCardSelection, cardSelection }) => {

  return (
    <div className="Grid">
      <h2>Choose a compliment!</h2>
      <div className="inner-grid">
        {cards.map((card, index) => (
            <div
              onClick={() => setCardSelection(card.theme)}
              key={index}
              className={`
                item ${card.theme}
              `}
              style={{
                opacity: cardSelection ? card.theme === cardSelection ? 1 : 0.5 : 1,
                transform: cardSelection ? card.theme === cardSelection ? 'scale(1.05)' : 'initial' : 'initial'
              }}
            >
              {card.lines.slice(0,-1).join(' ')}
            </div>
        ))}
      </div>
    </div>
  )
}

export default Grid;
