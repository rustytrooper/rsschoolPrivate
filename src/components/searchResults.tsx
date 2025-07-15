import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../types/interfaces';
import { Card } from './Card';

interface SearchResultsProps {
  descriptions: PersonSWType[];
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    const { descriptions } = this.props;
    return (
      <div className="w-full p-4 shadow-md flex flex-col bg-slate-300 rounded-lg h-[80vh]">
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
