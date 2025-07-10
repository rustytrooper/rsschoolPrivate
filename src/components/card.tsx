import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../types/interfaces';

export class Card extends Component<PersonSWType> {
  constructor(props: PersonSWType) {
    super(props);
  }
  render(): ReactNode {
    return (
      <div className="h-full bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
        <p className="text-lg font-semibold text-gray-800">{this.props.name}</p>
        <p className="mt-2 text-gray-600">{this.props.hair_color}</p>
        <p>{this.props.sex}</p>
        <p>{this.props.age}</p>
        <p>{`occupation: ${this.props.occupation}`}</p>
      </div>
    );
  }
}
