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

interface IState {
  search: string;
  isValid: boolean;
  isLoading: boolean;
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
      isLoading: true,
    };

    // scope binding
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSuggestion = this.handleSuggestion.bind(this);
    this.generateSuggestions = this.generateSuggestions.bind(this);
  }

  /**
   * Alert error
   */
  protected alertError() {
    alert('Something went wrong, please try again');
  }

  /**
   * Component mounting
   */
  public async componentDidMount(): Promise<void> {
    const suggestions = await SearchService.getSuggestions();
    this.suggestComponents = this.generateSuggestions(suggestions);
    this.setState({ isLoading: false });
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
      this.alertError();
    }
    this.props.handleRefresh(); // do not await
  }

  /**
   * Handles confirm
   * @param url - service url
   * @param icon - service icon
   */
  protected async handleSuggestion(url: string, name: string, icon: Icon): Promise<void> {
    const success = await MenuService.save(url, name, icon);
    if (!success) {
      this.alertError();
    }
    this.props.handleRefresh(); // do not await
  }

  /**
   * Generates result components
   * @param data - details required to build component
   */
  protected generateSuggestions(data: IMenuItem[]): React.ReactElement[] {
    return data.map((v) => {
      return <Suggestion
        {...v}
        key={`suggestion-${v.name}`}
        handleSuggestion={this.handleSuggestion}
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
        <p className="text-muted align-self-center text-center">
          enter the full url address of the website you wish to add
        </p>

        <h3 className="primary mt-5">Suggestions</h3>
        <div className="d-flex flex-row row justify-content-center">
          {!this.state.isLoading && this.suggestComponents}
        </div>
      </div>
    );
  }
}
