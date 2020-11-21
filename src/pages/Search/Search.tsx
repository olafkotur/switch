import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResult from '../../components/SearchResult/SearchResult';
import { IMenuItem, IServiceDetails } from '../../typings/d';
import { SearchService } from '../../services/search';
import './search.css';

interface IProps {
  items: IMenuItem[];
}

interface IState {
  search: string;
  isSearching: boolean;
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
      isSearching: false,
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
  protected async handleUpdateSearch(value: string): Promise<void> {
    this.setState({ search: value });

    this.setState({ isSearching: true });

    const res = await fetch('http://localhost:8080/switch-api/us-central1/query?search=hello');
    console.log(res);
    const serviceDetails: IServiceDetails[] = value ? [{ name: '', url: value }] : [];
    this.resultComponents = this.generateResultComponents(serviceDetails);
    this.setState({ isSearching: false });
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
      <div className="search-container">
        <SearchBar
          value={this.state.search}
          handleUpdate={this.handleUpdateSearch}
        />
        <p className="text-muted align-self-center">enter the full url address of the website you wish to add</p>

        {!this.state.isSearching && <div className="d-flex flex-row overflow-auto">
          {this.resultComponents}
        </div>}

        <h3 className="primary mt-5">Suggestions</h3>
        <div className="d-flex flex-row overflow-auto">
          {this.suggestComponents}
        </div>
      </div>
    );
  }
}
