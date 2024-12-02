import { Character } from '../../CharacterType/types'
import CharacterCard from './CharacterCard'
import { useState } from 'react'
import './CharacterList.css'

type Props = {
  characters: Character[]
  onFavoriteToggle: (id: number) => void
  favorites: Set<number>
}

const CardList = ({ characters, onFavoriteToggle, favorites }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="card-list">
      {characters.map((character) => (
        <div
          key={character.id}
          className="card-wrapper"
        >
          <CharacterCard
            character={character}
            isSelected={character.id === selectedId}
            isDimmed={selectedId !== null && character.id !== selectedId}
            onSelect={setSelectedId}
            onFavoriteToggle={onFavoriteToggle}
            favorites={favorites}
          />
        </div>
      ))}
    </div>
  )
}

export default CardList