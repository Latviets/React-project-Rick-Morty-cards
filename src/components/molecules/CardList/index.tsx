import { Character } from '../../CharacterType/types'
import CharacterCard from './CharacterCard'
import { useState } from 'react'
import { Favorite } from '../../../hooks/useFavorites'

type Props = {
  characters: Character[]
  onFavoriteToggle: (id: number) => void
  favorites: Favorite[]
}

const CardList = ({ characters, onFavoriteToggle, favorites }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-10 gap-y-5 px-10 py-5 relative w-[calc(100%-80px)] max-w-[1200px] mx-auto">
      {characters.map((character) => (
        <div
          key={character.id}
          className="w-full min-h-full flex flex-col items-center justify-center"
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