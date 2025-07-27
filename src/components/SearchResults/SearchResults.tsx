import { type PersonSWType } from '../../types/interfaces';
import { Card } from '../Card/Card';
import { useNavigate, useParams } from 'react-router';

interface SearchResultsProps {
  descriptions: PersonSWType[];
  error: boolean;
  status: null | number;
  errorMessage?: string;
  className?: string;
  onCardClick: (id: number) => void;
}

export function SearchResults({
  descriptions,
  error,
  errorMessage,
  status,
  className,
  onCardClick,
}: SearchResultsProps) {
  const navigate = useNavigate();
  const { page } = useParams();

  const handleCardClick = (id: number) => {
    navigate(`/page/${page}/card/${id}`);
    onCardClick(id);
  };

  return (
    <div
      className={`w-full p-4 shadow-md flex flex-col bg-slate-300 rounded-lg h-[80vh] ${className}`}
    >
      {error && (
        <>
          <p className="text-center my-auto text-2xl">
            Error occurred: {status ? `Status ${status}` : 'Unknown error'}
          </p>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
      {descriptions.length === 0 && !error && (
        <p className="text-center my-auto text-2xl">No results</p>
      )}
      <ul className="grid grid-cols-3 gap-4 mb-5">
        {descriptions.map((person: PersonSWType) => {
          return (
            <li
              onClick={() => person.id !== null && handleCardClick(person.id)}
              key={person.name}
            >
              <Card {...person} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
