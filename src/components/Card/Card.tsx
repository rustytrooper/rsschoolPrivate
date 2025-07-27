import { type PersonSWType } from '../../types/interfaces';

export function Card({ name, hair_color, sex, age, occupation }: PersonSWType) {
  return (
    <div className="h-full bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
      <p className="text-lg font-semibold text-gray-800">
        {name || 'Unknown Name'}
      </p>
      <p className="mt-2 text-gray-600">{hair_color || 'No Hair Color'}</p>
      <p>{sex || 'Unknown Sex'}</p>
      <p>{age !== null ? age : 'Age not specified'}</p>
      <p>{`occupation: ${occupation || 'No Occupation'}`}</p>
    </div>
  );
}
