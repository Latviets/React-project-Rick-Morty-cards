import { Character } from '../../CharacterType/types'

type Props = {
  character: Character
  onClose: () => void
}

const CharacterModal = ({ character, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg max-w-lg w-11/12 relative border-4 border-black">
        <img
          src={character.image}
          alt={character.name}
          className="w-full max-w-xs rounded-md block mx-auto mb-5 transform transition-transform duration-300 hover:scale-110"
        />
        <h2 className="text-center mb-5 text-3xl font-extrabold bg-gradient-to-r from-[#1abc9c] to-[#00b300] bg-clip-text text-transparent drop-shadow-lg">
          {character.name}
        </h2>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <p><strong>Location:</strong> {character.location.name}</p>

        <button
          onClick={onClose}
          className="px-6 py-3 border-2 border-[#1abc9c] rounded-md bg-[#1abc9c] text-white font-bold cursor-pointer mt-4 hover:bg-white hover:text-[#1abc9c] transition-all duration-300 shadow-lg hover:shadow-xl w-full"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default CharacterModal