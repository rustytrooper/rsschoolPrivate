import { type PersonSWType } from '../../types/interfaces';
import { CardStyles } from './CardStyles';
import { useSelector, useDispatch } from 'react-redux';
import { removeCard, addCard } from '../../features/CardSlice';

export function Card({
  name,
  hair_color,
  sex,
  age,
  occupation,
  id,
}: PersonSWType) {
  const { bgckClassname, pClassName, checkBoxClassName } = CardStyles();
  const card = useSelector(
    (state: { card: { card: PersonSWType[] } }) => state.card.card
  );
  const dispatch = useDispatch();
  const isChecked = card.some(
    (c) =>
      c.name === name &&
      c.hair_color === hair_color &&
      c.sex === sex &&
      c.age === age &&
      c.occupation === occupation
  );
  return (
    <div className={bgckClassname}>
      <p className="text-lg font-semibold text-gray-800">
        {name || 'Unknown Name'}
      </p>
      <p className={pClassName}>{hair_color || 'No Hair Color'}</p>
      <p>{sex || 'Unknown Sex'}</p>
      <p>{age !== null ? age : 'Age not specified'}</p>
      <p>{`occupation: ${occupation || 'No Occupation'}`}</p>
      <input
        type="checkbox"
        className={checkBoxClassName}
        checked={isChecked}
        onClick={(e) => {
          e.preventDefault();
          const target = e.target as HTMLInputElement;
          if (target.checked) {
            dispatch(addCard({ name, hair_color, sex, age, occupation, id }));
          } else {
            dispatch(
              removeCard({ name, hair_color, sex, age, occupation, id })
            );
          }
        }}
      ></input>
    </div>
  );
}
