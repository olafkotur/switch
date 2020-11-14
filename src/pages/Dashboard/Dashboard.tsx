import React from 'react';
import WebView from '../../components/WebView/WebView';
import Menu from '../../components/Menu/Menu';
import { IMenuItem } from '../../typings/d';
import { MenuService } from '../../services/menu';
import Loader from '../../components/Loader/Loader';

interface IWebView {
  id: string;
  view: React.ReactElement;
}

interface IState {
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
      isLoading: true,
      focusedItem: null,
    };

    // scope binding
    this.handleUpdateMenuItem = this.handleUpdateMenuItem.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.menuItems = MenuService.getItems();

    // set the active item
    if (this.menuItems.length) {
      this.handleUpdateMenuItem(this.menuItems[0]);
    }

    this.setState({ isLoading: false });
  }

  /**
   * Sets the new focused menu item
   * @param menuItem - focused item
   */
  protected handleUpdateMenuItem(menuItem: IMenuItem): void {
    this.setState({ focusedItem: menuItem });
  }

  render() {
    return (
      !this.state.isLoading ?
        <div className="container-fluid">
          <div className="row">
            <div className="menu">
              <Menu
                focusedItem={this.state.focusedItem}
                handleChangeService={this.handleUpdateMenuItem}
              />
            </div>
            <div className="col p-0">
              {this.state.focusedItem && <WebView url={this.state.focusedItem.url} />}
            </div>
          </div>
        </div>
      : <Loader />
    );
  }

}
