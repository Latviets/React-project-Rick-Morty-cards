import { Character } from '../../../../types'

type Props = {
  character: Character
  isSelected: boolean
  isDimmed: boolean
  onSelect: (id: number | null) => void
}

const CharacterCard = ({ character, isSelected, isDimmed, onSelect }: Props) => {
  return (
    <div
      style={{
        border: '3px solid black',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isSelected ? 'scale(1.1) translateY(-10px)' : 'none',
        backgroundColor: 'white',
        boxShadow: isSelected
          ? '0 20px 30px rgba(0,0,0,0.2)'
          : '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: isSelected ? 10 : 1,
        opacity: isDimmed ? 0.5 : 1,
      }}
      onClick={() => onSelect(isSelected ? null : character.id)}
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

      {isSelected && (
        <div style={{
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '4px',
          marginTop: '10px',
          transition: 'all 0.3s ease',
        }}>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin.name}</p>
          <p><strong>Location:</strong> {character.location.name}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(null);
            }}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              borderRadius: '4px',
              border: '3px solid black',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default CharacterCard