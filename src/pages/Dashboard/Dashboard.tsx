import React from 'react';
import WebView from '../../components/WebView/WebView';
import Menu from '../../components/Menu/Menu';
import Search from '../Search/Search';
import Settings from '../Settings/Settings';
import Dialog, { IProps as IDialog } from '../../components/Dialog/Dialog';
import {
  IActionRequest,
  IMenuItem,
  IUserSettings,
  IWebView,
  WebViewAction,
} from '../../typings/d';
import { MenuService } from '../../services/menu';
import * as _ from 'lodash';
import './dashboard.css';

export type TPages = 'web' | 'search' | 'settings';

interface IProps {
  userSettings: IUserSettings;
  handleRefresh: () => Promise<void>;
}

interface IState {
  page: TPages;
  loading: boolean;
  actionRequest: IActionRequest;
  activeApplication: IMenuItem | null;
  dialog: IDialog | null;
}

export default class Dashboard extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected applications: IMenuItem[] = [];
  protected webViews: IWebView[] = [];

  /**
   * Dashboard constructor
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      page: 'settings',
      loading: true,
      activeApplication: null,
      actionRequest: { id: '', action: '' },
      dialog: null,
    };

    // scope binding
    this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this);
    this.handleActionRequest = this.handleActionRequest.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  /**
   * Component mounting
   */
  public async componentDidMount(): Promise<void> {
    this.applications = await MenuService.fetchList();
    if (this.applications.length) {
      // this.handleMenuItemClicked('web', this.applications[0]);
    }
    this.setState({ loading: false });
  }

  /**
   * Sets the new focused menu item
   * @param action - target page
   * @param menuItem - focused item
   */
  protected handleMenuItemClicked(
    action: TPages,
    menuItem: IMenuItem | null = null,
  ): void {
    if (action === 'web') {
      this.setState({ page: action, activeApplication: menuItem });
    } else {
      this.setState({ page: action });
    }
  }

  /**
   * Handles action request
   * @param id - menu item id
   * @param action - web view action
   */
  protected handleActionRequest(id: string, action: WebViewAction) {
    this.setState({ actionRequest: { id, action } });
  }

  /**
   * Handles dialog
   * @param data - dialog data
   */
  protected handleDialog(data: IDialog): void {
    this.setState({ dialog: data });
  }

  /**
   * Handles dialog close
   */
  protected handleDialogClose(): void {
    this.setState({ dialog: null });
  }

  render() {
    return (
      !this.state.loading && (
        <div className="container-fluid">
          <div className="row">
            <div
              className="menu bg-secondary"
              style={!this.props.userSettings.overlayMode ? { width: 65 } : {}}
            >
              <Menu
                page={this.state.page}
                items={this.applications}
                focusedItem={this.state.activeApplication}
                userSettings={this.props.userSettings}
                overlayMode={this.props.userSettings.overlayMode}
                handleClick={this.handleMenuItemClicked}
                handleRefresh={this.props.handleRefresh}
                handleActionRequest={this.handleActionRequest}
                handleDialog={this.handleDialog}
              />
            </div>
            <div className="col p-0">
              {/* these must stay as hidden elements to avoid re-rendering */}
              <div className={`${this.state.page !== 'web' ? 'd-none' : ''}`}>
                {this.applications.map((v) => {
                  const hidden = !(
                    this.state.activeApplication &&
                    this.state.activeApplication.id === v.id
                  );
                  return (
                    <div key={v.id} className={`${hidden ? 'd-none' : ''}`}>
                      <WebView
                        id={v.id}
                        url={v.url}
                        hidden={hidden}
                        useModifiedAgent={this.props.userSettings.modifiedAgent}
                        defaultWindowBehaviour={
                          this.props.userSettings.windowBehaviour
                        }
                        actionRequest={this.state.actionRequest}
                        handleRefresh={this.props.handleRefresh}
                      />
                    </div>
                  );
                })}
              </div>

              {this.state.page === 'search' && (
                <div className="dashboard-container d-flex justify-content-center">
                  <Search
                    items={this.applications}
                    handleRefresh={this.props.handleRefresh}
                  />
                </div>
              )}

              {this.state.page === 'settings' && (
                <div className="dashboard-container d-flex justify-content-center">
                  <Settings
                    items={this.applications}
                    userSettings={this.props.userSettings}
                    handleRefresh={this.props.handleRefresh}
                    handleDialog={this.handleDialog}
                  />
                </div>
              )}
            </div>
          </div>

          {/* show dialog across the entire app */}
          {this.state.dialog && (
            <Dialog
              {...this.state.dialog}
              handleClose={this.handleDialogClose}
            />
          )}
        </div>
      )
    );
  }
}
