import { type PersonSWType } from '../../types/interfaces';
import { Card } from '../Card/Card';
import { useNavigate, useParams } from 'react-router';
import { SearchResultsStyles } from './SearchResultsStyles';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface SearchResultsProps {
  descriptions: PersonSWType[];
  error: FetchBaseQueryError | SerializedError | undefined;

  status: null | number;
  className?: string;
  onCardClick: (id: number) => void;
}

export function SearchResults({
  descriptions,
  error,
  status,
  className,
  onCardClick,
}: SearchResultsProps) {
  const navigate = useNavigate();
  const { page } = useParams();
  const { bgckClassname } = SearchResultsStyles(className as string);
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
          {error && <p>{'erro'}</p>}
        </>
      )}
      {descriptions && descriptions.length === 0 && !error && (
        <p className="text-center my-auto text-2xl">No results</p>
      )}
      <ul className="grid grid-cols-3 gap-4 mb-5">
        {descriptions &&
          descriptions.map((person: PersonSWType) => {
            return (
              <li
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (person.id !== null && target.tagName !== 'INPUT') {
                    handleCardClick(person.id);
                  }
                }}
                key={person.id}
              >
                <Card {...person} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
