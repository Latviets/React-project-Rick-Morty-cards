import { Character } from '../../../../types';

type Props = {
  character: Character;
}

const Card = ({ character }: Props) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
    </div>
  );
}

export default Card; 