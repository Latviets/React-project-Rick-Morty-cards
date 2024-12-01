import { Character } from '../../../types'
import CharacterCard from './CharacterCard'
import { useState } from 'react'

type Props = {
  characters: Character[]
}

const CharactersList = ({ characters }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '1rem',
      padding: '1rem',
      position: 'relative',
    }}>
      {characters.map((character) => (
        <CharacterCard 
          key={character.id} 
          character={character}
          isSelected={selectedId === character.id}
          onSelect={setSelectedId}
          isDimmed={selectedId !== null && selectedId !== character.id}
        />
      ))}
    </div>
  )
}

export default CharactersList