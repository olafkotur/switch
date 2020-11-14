import React from 'react';
import WebView from '../../components/WebView/WebView';
import Menu from '../../components/Menu/Menu';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import { IMenuItem } from '../../typings/d';
import { MenuService } from '../../services/menu';

export type TPages = 'web' | 'search' | 'settings';

interface IState {
  page: TPages;
  isLoading: boolean;
  focusedItem: IMenuItem | null;
}

export default class Dashboard extends React.Component<{}, IState> {
  /**
   * Local properties
   */
  protected menuItems: IMenuItem[] = [];

  /**
   * Dashboard constructor
   */
  constructor(props: {}) {
    super(props);

    this.state = {
      page: 'web',
      isLoading: true,
      focusedItem: null,
    };

    // scope binding
    this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.menuItems = MenuService.getItems();

    // set the active item
    if (this.menuItems.length) {
      this.handleMenuItemClicked('web', this.menuItems[0]);
    }

    setTimeout(() => this.setState({ isLoading: false }), 750);
  }

  /**
   * Sets the new focused menu item
   * @param action - target page
   * @param menuItem - focused item
   */
  protected handleMenuItemClicked(action: TPages, menuItem: IMenuItem | null = null): void {
    if (action === 'web') {
      this.setState({ page: action, focusedItem: menuItem });
    } else {
      this.setState({ page: action });
    }
  }

  render() {
    return (
      !this.state.isLoading ?
        <div className="container-fluid">
          <div className="row">
            <div className="menu bg-secondary">
              <Menu
                page={this.state.page}
                items={this.menuItems}
                focusedItem={this.state.focusedItem}
                handleClick={this.handleMenuItemClicked}
              />
            </div>
            <div className="col p-0">
              {this.state.page === 'web' && this.state.focusedItem &&
                <WebView
                  url={this.state.focusedItem.url}
                />
              }
              {this.state.page === 'search' &&
                <Search
                  items={this.menuItems}
                />
              }
            </div>
          </div>
        </div>
      : <Loader />
    );
  }

}
