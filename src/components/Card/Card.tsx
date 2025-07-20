import { Component, type ReactNode } from 'react';
import { type PersonSWType } from '../../types/interfaces';

export class Card extends Component<PersonSWType> {
  render(): ReactNode {
    return (
      <div className="h-full bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
        <p className="text-lg font-semibold text-gray-800">
          {this.props.name || 'Unknown Name'}
        </p>
        <p className="mt-2 text-gray-600">
          {this.props.hair_color || 'No Hair Color'}
        </p>
        <p>{this.props.sex || 'Unknown Sex'}</p>
        <p>{this.props.age !== null ? this.props.age : 'Age not specified'}</p>
        <p>{`occupation: ${this.props.occupation || 'No Occupation'}`}</p>
      </div>
    );
  }
}
