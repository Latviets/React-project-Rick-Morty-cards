import Card from './Card';
import { Character } from '../../../types';

type Props = {
  characters: Character[]
}

const CardList = ({ characters }: Props) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CardList;

