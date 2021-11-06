import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Suggestion from '../../components/Suggestion/Suggestion';
import { Icon, IMenuItem } from '../../typings/d';
import { SearchService } from '../../services/search';
import { MenuService } from '../../services/menu';
import './search.css';

interface IProps {
  items: IMenuItem[];
  handleRefresh: () => Promise<void>;
}

const Search = ({ items, handleRefresh }: IProps): React.ReactElement => {
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [searchInput, setSearchInput] = React.useState<string>('');

  /**
   * Alert error
   */
  const alertError = (): void => {
    alert('Something went wrong, please try again');
  };

  /**
   * Handles search update
   * @param value - search value
   */
  const handleUpdateSearch = async (value: string): Promise<void> => {
    const isValid = SearchService.validateUrl(value);
    setIsValid(isValid);
    setSearchInput(value);
  };

  /**
   * Handles confirm
   */
  const handleConfirm = async (): Promise<void> => {
    const success = await MenuService.save(searchInput);
    if (!success) {
      alertError();
    }
    handleRefresh(); // do not await
  };

  /**
   * Handles confirm
   * @param url - service url
   * @param icon - service icon
   */
  const handleSuggestion = async (url: string, icon: Icon): Promise<void> => {
    const success = await MenuService.save(url, icon);
    if (!success) {
      alertError();
    }
    handleRefresh(); // do not await
  };

  /**
   * Generates result components
   */
  const renderSuggestions = (): React.ReactElement[] => {
    const data = SearchService.getSuggestions();
    return data.map((v, i) => {
      return (
        <Suggestion
          {...v}
          key={`suggestion-${i}`}
          handleSuggestion={handleSuggestion}
        />
      );
    });
  };

  return (
    <div className="search-container">
      <SearchBar
        value={searchInput}
        isValid={isValid}
        handleUpdate={handleUpdateSearch}
        handleConfirm={handleConfirm}
      />
      <p className="text-muted align-self-center text-center">
        enter the full url address of the website you wish to add
      </p>

      <h3 className="primary mt-5">Suggestions</h3>
      <div className="d-flex flex-row row justify-content-center">
        {renderSuggestions()}
      </div>
    </div>
  );
};

export default Search;
