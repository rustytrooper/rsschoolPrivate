import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../types/interfaces';
import { ErrorButton } from '../components/errorButton';
import { ErrorBoundary } from './errorBoundary';
import { Card } from './card';

interface SearchResultsProps {
  descriptions: PersonSWType[];
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    const { descriptions } = this.props;
    return (
      <div className="w-full flex flex-col bg-slate-300 rounded-lg p-4">
        <ErrorBoundary>
          <ul className="grid grid-cols-2 gap-4 mb-5">
            {descriptions.map((el: PersonSWType) => {
              return (
                <li key={el.name}>
                  <Card {...el} />
                </li>
              );
            })}
          </ul>

          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}
