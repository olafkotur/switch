import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import { IMenuItem, IServiceDetails } from '../../typings/d';
import { SearchService } from '../../services/search';
import './search.css';

interface IProps {
  items: IMenuItem[];
}

interface IState {
  search: string;
}

export default class Search extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected resultComponents: React.ReactElement[] = [];
  protected suggestComponents: React.ReactElement[] = [];

  /**
   * Search constructor
   * @param props - component props
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      search: '',
    };

    // scope binding
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
    this.generateResultComponents = this.generateResultComponents.bind(this);

    const suggestions = SearchService.getSearchSuggestions();
    this.suggestComponents = this.generateResultComponents(suggestions);
  }

  /**
   * Handles search update
   * @param value - search value
   */
  protected handleUpdateSearch(value: string) {
    this.setState({ search: value });
  }

  /**
   * Generates result components
   * @param data - details required to build component
   */
  protected generateResultComponents(data: IServiceDetails[]): React.ReactElement[] {
    return data.map((v) => {
      return <SearchResult
        key={v.url}
        data={v}
      />;
    });
  }

  render() {
    return (
      <div className="search">
        <SearchBar
          value={this.state.search}
          handleUpdate={this.handleUpdateSearch}
        />
        <p className="text-muted">enter the full url address of the website you wish to add</p>

        <h3 className="primary text-left">Suggestions</h3>
        <div className="d-flex flex-row overflow-auto">
          {this.suggestComponents}
        </div>
      </div>
    );
  }
}
