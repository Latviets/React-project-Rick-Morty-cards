import { Character } from '../../CharacterType/types'
import './CharacterModal.css'

type Props = {
  character: Character
  onClose: () => void
}

const CharacterModal = ({ character, onClose }: Props) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img
          src={character.image}
          alt={character.name}
          className="modal-image"
          loading="eager"
        />
        <h2>{character.name}</h2>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <p><strong>Location:</strong> {character.location.name}</p>

        <button onClick={onClose} className="modal-close">
          Close
        </button>
      </div>
    </div>
  )
}

export default CharacterModal