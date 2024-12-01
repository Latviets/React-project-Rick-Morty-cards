import { Character } from '../../../types'

type Props = {
  character: Character | null
  onClose: () => void
}

const CharacterModal = ({ character, onClose }: Props) => {
  if (!character) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <button 
          onClick={onClose}
          style={{ float: 'right' }}
        >
          ✕
        </button>
        <img src={character.image} alt={character.name} style={{ width: '100%' }} />
        <h2>{character.name}</h2>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  )
}

export default CharacterModal 