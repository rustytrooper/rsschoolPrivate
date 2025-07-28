import { type PersonSWType } from '../../types/interfaces';
import { CardStyles } from './CardStyles';

export function Card({ name, hair_color, sex, age, occupation }: PersonSWType) {
  const { bgckClassname, pClassName } = CardStyles();
  return (
    <div className={bgckClassname}>
      <p className="text-lg font-semibold text-gray-800">
        {name || 'Unknown Name'}
      </p>
      <p className={pClassName}>{hair_color || 'No Hair Color'}</p>
      <p>{sex || 'Unknown Sex'}</p>
      <p>{age !== null ? age : 'Age not specified'}</p>
      <p>{`occupation: ${occupation || 'No Occupation'}`}</p>
    </div>
  );
}
