import React from 'react';
import WebView from '../../components/WebView/WebView';
import Menu from '../../components/Menu/Menu';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import { IMenuItem, IWebView } from '../../typings/d';
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
  protected webViews: IWebView[] = [];

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
    this.generateWebViews = this.generateWebViews.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.menuItems = MenuService.getItems();

    // set the active item
    if (this.menuItems.length) {
      this.handleMenuItemClicked('web', this.menuItems[0]);
    } else {
      this.setState({ page: 'search' });
    }

    this.generateWebViews();
    setTimeout(() => this.setState({ isLoading: false }), 0);
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

  /**
   * Generates web views components
   */
  protected generateWebViews() {
    this.webViews = this.menuItems.map((v) => {
      return {
        id: v.id,
        view: <WebView url={v.url} />,
      };
    });
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
              {/* these must stay as hidden elements to avoid re-rendering */}
              <div className={`${this.state.page !== 'web' ? 'd-none' : ''}`}>
                {this.menuItems.map((v) => {
                  return <div key={v.id} className={`${this.state.focusedItem && this.state.focusedItem.id !== v.id ? 'd-none' : ''}`}>
                    {this.webViews.find(i => i.id === v.id)?.view}
                  </div>;
                })}
              </div>

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
