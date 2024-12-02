import { Character } from '../../../CharacterType/types'
import CharacterModal from '../../../molecules/CharacterModal'
import { useState } from 'react'

type Props = {
  character: Character
  isSelected: boolean
  isDimmed: boolean
  onSelect: (id: number | null) => void
}

const CharacterCard = ({ character, isSelected, isDimmed, onSelect }: Props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        style={{
          border: '3px solid black',
          padding: '10px',
          borderRadius: '8px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.3s ease',
          transform: isSelected ? 'translateY(-10px)' : 'none',
          backgroundColor: 'white',
          boxShadow: isSelected
            ? '0 20px 30px rgba(0,0,0,0.2)'
            : '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: isSelected ? 10 : 1,
          opacity: isDimmed ? 0.5 : 1,
        }}
        onClick={() => setShowModal(true)}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{
            width: '100%',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
          }}
        />
        <h3>{character.name}</h3>
        <p><strong>Status: </strong>{character.status}</p>
      </div>

      {showModal && (
        <CharacterModal
          character={character}
          onClose={() => {
            setShowModal(false)
            onSelect(null)
          }}
        />
      )}
    </>
  )
}

export default CharacterCard