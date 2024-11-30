import { Character } from '../../../../types';

type Props = {
  character: Character;
}

const Card = ({ character }: Props) => {
  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
    </div>
  );
}

export default Card; 