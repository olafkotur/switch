import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResult from '../../components/SearchResult/SearchResult';
import { IMenuItem, IServiceDetails } from '../../typings/d';
import { SearchService } from '../../services/search';
import './search.css';
import { Button } from '@material-ui/core';
import { MenuService } from '../../services/menu';

interface IProps {
  items: IMenuItem[];
  handleRefresh: () => Promise<void>;
}

interface IState {
  search: string;
  isValid: boolean;
}

export default class Search extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected suggestComponents: React.ReactElement[] = [];

  /**
   * Search constructor
   * @param props - component props
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      search: '',
      isValid: false,
    };

    // scope binding
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.generateSuggestions = this.generateSuggestions.bind(this);

    const suggestions = SearchService.getSearchSuggestions();
    this.suggestComponents = this.generateSuggestions(suggestions);
  }

  /**
   * Handles search update
   * @param value - search value
   */
  protected async handleUpdateSearch(value: string): Promise<void> {
    const isValid = SearchService.validateUrl(value);
    this.setState({ isValid, search: value });
  }

  /**
   * Handles confirm
   */
  protected async handleConfirm(): Promise<void> {
    const success = await MenuService.save(this.state.search);
    if (!success) {
      alert('Something went wrong whilst adding the service, please try again');
    }
    this.props.handleRefresh(); // do not await
  }

  /**
   * Generates result components
   * @param data - details required to build component
   */
  protected generateSuggestions(data: IServiceDetails[]): React.ReactElement[] {
    return data.map((v) => {
      return <SearchResult
        key={v.url}
        data={v}
      />;
    });
  }

  render() {
    return (
      <div className="search-container">
        <SearchBar
          value={this.state.search}
          isValid={this.state.isValid}
          handleUpdate={this.handleUpdateSearch}
          handleConfirm={this.handleConfirm}
        />
        <p className="text-muted align-self-center">enter the full url address of the website you wish to add</p>

        <h3 className="primary mt-5">Suggestions</h3>
        <div className="d-flex flex-row overflow-auto">
          {this.suggestComponents}
        </div>
      </div>
    );
  }
}
