import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { IMenuItem } from '../../typings/d';

interface IProps {
  items: IMenuItem[];
}

interface IState {
  search: string;
}

export default class Search extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      search: '',
    };

    // scope binding
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
  }

  /**
   * Handles search update
   * @param value - search value
   */
  protected handleUpdateSearch(value: string) {
    this.setState({ search: value });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center vh-100 mt-5">
        <SearchBar
          value={this.state.search}
          handleUpdate={this.handleUpdateSearch}
        />
        <p className="text-muted">enter the full url address or the name of the service</p>
      </div>
    );
  }
}
