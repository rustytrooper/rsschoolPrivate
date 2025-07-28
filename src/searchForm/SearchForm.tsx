import { BaseButton } from '../components/BaseButton/BaseButton';
import { useLocalStorage } from '../shared/useLocalStorage';
import { SearchFormConstants } from './SearchFormConstants';

interface SearchFormProps {
  updateSearch: (newResult: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick: VoidFunction;
}
export function SearchForm(props: SearchFormProps) {
  const [searchInput, setSearchInput] = useLocalStorage('searchItem');
  const { inputClassname } = SearchFormConstants();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchInput = e.target.value;
    setSearchInput(newSearchInput);
    props.updateSearch(newSearchInput);
  }

  return (
    <form
      onSubmit={props.onFormSubmit}
      className="flex justify-between my-3 mt-10"
      role="form"
    >
      <input
        data-testid="textbox"
        autoFocus
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Your search here"
        className={inputClassname}
      />
      <BaseButton onClick={props.onClick}>Search</BaseButton>
    </form>
  );
}
