import { type PersonSWType } from '../../types/interfaces';
import { Card } from '../Card/Card';
import { useNavigate, useParams } from 'react-router';
import { SearchResultsConstants } from './SearchResultsConsrants';

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

  const { bgckClassname } = SearchResultsConstants(className as string);

  const handleCardClick = (id: number) => {
    navigate(`/page/${page}/card/${id}`);
    onCardClick(id);
  };

  return (
    <div className={bgckClassname}>
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
