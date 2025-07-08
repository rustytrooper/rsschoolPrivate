import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../types/interfaces';

interface SearchResultsProps {
  data: PersonSWType[];
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    const { data } = this.props;
    return (
      <div>
        <ul>
          {data.map((el: PersonSWType) => {
            return (
              <li key={el.name}>
                {el.name},{el.birth_year}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
