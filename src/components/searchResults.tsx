import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../types/interfaces';

interface SearchResultsProps {
  descriptions: PersonSWType[];
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    const { descriptions } = this.props;
    return (
      <div>
        <ul>
          {descriptions.map((el: PersonSWType) => {
            return (
              <li key={el.name}>
                {el.name}, {el.eye_color}, {el.gender}, {el.birth_year},{' '}
                {`ships: ${el.starships}`}, {`hair: ${el.hair_color}`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
