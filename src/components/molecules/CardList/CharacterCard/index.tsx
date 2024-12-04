import { useState } from 'react'
import { Character } from '../../../CharacterType/types'
import CharacterModal from '../../../molecules/CharacterModal'
import './CharacterCard.css'
import { Favorite } from '../../../../hooks/useFavorites'

type Props = {
  character: Character
  isSelected: boolean
  isDimmed: boolean
  onSelect: (id: number | null) => void
  onFavoriteToggle: (id: number) => void
  favorites: Favorite[]
}

const CharacterCard = ({
  character,
  isSelected,
  isDimmed,
  onSelect,
  onFavoriteToggle,
  favorites
}: Props) => {
  const [showModal, setShowModal] = useState(false)

  const isFavorite = favorites.some(favorite => favorite.characterId === character.id)

  return (
    <>
      <div
        className={`character-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
        onClick={() => setShowModal(true)}
      >
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle(character.id)
          }}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <img
          src={character.image}
          alt={character.name}
          className="character-image"
        />
        <h3 className="character-name">{character.name}</h3>
        <p className="character-status">
          <strong>Status: </strong>{character.status}
        </p>
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