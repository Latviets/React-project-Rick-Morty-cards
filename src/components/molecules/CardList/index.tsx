import { Character } from '../../CharacterType/types'
import CharacterCard from './CharacterCard'
import { useState } from 'react'
import { Favorite } from '../../../hooks/useFavorites'

type Props = {
  characters: Character[]
  onFavoriteToggle: (id: number) => void
  favorites: Favorite[]
  searchTerm: string
}

const CardList = ({ characters, onFavoriteToggle, favorites, searchTerm }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filteredCharacters = characters.filter(character => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase().trim();
    const genderMatch = character.gender.toLowerCase() === searchTermLower;
    const partialMatch = [
      character.name,
      character.status,
      character.species,
      character.type,
      character.origin.name,
      character.location.name
    ].some(field => field.toLowerCase().includes(searchTermLower));

    return genderMatch || partialMatch;
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-10 gap-y-5 px-10 py-5 relative w-[calc(100%-80px)] max-w-[1200px] mx-auto">
      {filteredCharacters.map((character) => (
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