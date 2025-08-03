import { BaseButton } from '../BaseButton/BaseButton';
import { SearchFormStyles } from './SearchFormStyles';
import { useState } from 'react';

interface SearchFormProps {
  onFormSubmit: (query: string) => void;
  initialQuery: string;
}

export function SearchForm(props: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState(props.initialQuery);
  const { inputClassname } = SearchFormStyles();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onFormSubmit(searchQuery.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between my-3 mt-10"
      role="form"
    >
      <input
        data-testid="textbox"
        autoFocus
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Your search here"
        className={inputClassname}
      />
      <BaseButton type="submit">Search</BaseButton>
    </form>
  );
}
