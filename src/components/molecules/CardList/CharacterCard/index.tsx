import { useState } from 'react'
import { Character } from '../../../CharacterType/types'
import CharacterModal from '../../../molecules/CharacterModal'
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
  const isFavorite = favorites.some(fav => fav.characterId === character.id)

  return (
    <>
      <div
        className={`
          w-[200px] mx-auto border-2 border-black p-2 rounded-lg cursor-pointer 
          relative transition-all duration-300 bg-white shadow-md
          ${isSelected ? 'transform -translate-y-2.5 shadow-2xl z-10' : ''}
          ${isDimmed ? 'opacity-50' : ''}
        `}
        onClick={() => {
          setShowModal(true)
          onSelect(character.id)
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle(character.id)
          }}
          className={`
            absolute top-1.5 right-1.5 bg-white border border-black rounded-full 
            w-5 h-5 flex items-center justify-center cursor-pointer z-10 text-sm p-0
            ${isFavorite ? 'text-red-500' : 'text-white'}
          `}
        >
          ♥
        </button>

        <img
          src={character.image}
          alt={character.name}
          className="w-full rounded transition-all duration-300"
        />

        <h3 className="my-1.5 text-sm font-bold">
          {character.name}
        </h3>

        <p className="my-0.5 text-xs">
          {character.status}
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