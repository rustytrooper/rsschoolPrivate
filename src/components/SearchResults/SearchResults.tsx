import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../../types/interfaces';
import { Card } from '../Card/Card';

interface SearchResultsProps {
  descriptions: PersonSWType[];
  error: boolean;
  status: null | number;
  errorMessage?: string;
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    const { descriptions, error, status, errorMessage } = this.props;
    return (
      <div className="w-full p-4 shadow-md flex flex-col bg-slate-300 rounded-lg h-[80vh]">
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
              <li key={person.name}>
                <Card {...person} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
