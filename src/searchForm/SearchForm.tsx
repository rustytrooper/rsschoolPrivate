import { BaseButton } from '../components/BaseButton';
import { useLocalStorage } from '../shared/useLocalStorage';

interface SearchFormProps {
  updateSearch: (newResult: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick: VoidFunction;
}
export function SearchForm(props: SearchFormProps) {
  const [searchInput, setSearchInput] = useLocalStorage('searchItem');

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
        className="w-80 flex px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      />
      <BaseButton onClick={props.onClick}>Search</BaseButton>
    </form>
  );
}
