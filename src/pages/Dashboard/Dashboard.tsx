import React from 'react';
import WebView from '../../components/WebView/WebView';
import Menu from '../../components/Menu/Menu';
import Loader from '../../components/Loader/Loader';
import Search from '../Search/Search';
import Settings from '../Settings/Settings';
import Dialog, { IProps as IDialog } from '../../components/Dialog/Dialog';
import { ipcRenderer } from 'electron';
import { DefaultWindowBehaviour, IActionRequest, IMenuItem, IPresetSetting, ISetting, IWebView, WebViewAction } from '../../typings/d';
import { MenuService } from '../../services/menu';
import { SettingsService } from '../../services/settings';
import { PresetService } from '../../services/preset';
import { ElectronService } from '../../services/electron';
import * as _ from 'lodash';
import './dashboard.css';

export type TPages = 'web' | 'search' | 'settings';

interface IState {
  page: TPages;
  firstLoad: boolean;
  isLoading: boolean;
  focusedItem: IMenuItem | null;
  actionRequest: IActionRequest;
  dialog: IDialog | null;
}

export default class Dashboard extends React.Component<{}, IState> {
  /**
   * Local properties
   */
  protected userSettings: ISetting[] = [];
  protected presetSettings: IPresetSetting[] = [];
  protected menuItems: IMenuItem[] = [];
  protected webViews: IWebView[] = [];
  protected useModifiedAgent: boolean = false;
  protected defaultWindowBehaviour: DefaultWindowBehaviour = 'external';
  protected overlayMode: boolean = true;

  /**
   * Dashboard constructor
   */
  constructor(props: {}) {
    super(props);

    this.state = {
      page: 'search',
      firstLoad: true,
      isLoading: true,
      focusedItem: null,
      actionRequest: { id: '', action: '' },
      dialog: null,
    };

    // scope binding
    this.handleCheckForUpdates = this.handleCheckForUpdates.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this);
    this.handleActionRequest = this.handleActionRequest.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  /**
   * Component mounting
   */
  public async componentDidMount(): Promise<void> {
    await this.handleRefresh();
    await this.handleCheckForUpdates();
    this.setState({ firstLoad: false });
  }

  /**
   * Checks for updates
   */
  protected async handleCheckForUpdates(): Promise<void> {
    ipcRenderer.on('message', (_event, text) => {
      if (text === 'updateReady') {
        this.handleDialog({
          open: true,
          title: 'Oh hey, it\'s that time again...',
          content: <div>
            <span>We've downloaded an update for you in the background, it's available to <code>install</code> whenever you're ready.</span>
            <br/><br/>
            <span>Please <code>re-launch</code> the application after clicking install.</span>
            <br/><br/>
            <span>You can choose to ignore it, it will simply be applied the next time you re-launch the application.</span>
          </div>,
          primaryLabel: 'Install',
          handlePrimary: () => ElectronService.quit(),
          handleSecondary: () => {},
        });
      }
    });
  }

   /**
   * Handles refresh request
   */
  protected async handleRefresh(): Promise<void> {
    this.setState({ isLoading: true });
    this.menuItems = await MenuService.fetchList();
    this.userSettings = await SettingsService.fetchList();
    this.presetSettings = await PresetService.fetchList();

    // apply settings
    for (const v of this.userSettings) {
      switch (v.name) {
        case 'useModifiedAgent':
          this.useModifiedAgent = v.value === 'true';
          break;
        case 'defaultWindowBehaviour':
          this.defaultWindowBehaviour = v.value as DefaultWindowBehaviour;
          break;
        case 'overlayMode':
          this.overlayMode = v.value === 'true';
          ElectronService.setWindowMode(v.value === 'true');
      }
    }

    // set the active item
    if (this.state.firstLoad && this.menuItems.length) {
      this.handleMenuItemClicked('web', this.menuItems[0]);
    }
    setTimeout(() => this.setState({ isLoading: false }), this.state.firstLoad ? 1500 : 500);
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
      !this.state.isLoading ?
        <div className="container-fluid">
          <div className="row">
            <div className="menu bg-secondary" style={!this.overlayMode ? { width: 65 } : {}}>
              <Menu
                page={this.state.page}
                items={this.menuItems}
                focusedItem={this.state.focusedItem}
                userSettings={this.userSettings}
                overlayMode={this.overlayMode}
                handleClick={this.handleMenuItemClicked}
                handleRefresh={this.handleRefresh}
                handleActionRequest={this.handleActionRequest}
                handleDialog={this.handleDialog}
              />
            </div>
            <div className="col p-0">
              {/* these must stay as hidden elements to avoid re-rendering */}
              <div className={`${this.state.page !== 'web' ? 'd-none' : ''}`}>
                {this.menuItems.map((v) => {
                  const hidden = !(this.state.focusedItem && this.state.focusedItem.id === v.id);
                  return <div key={v.id} className={`${hidden ? 'd-none' : ''}`}>
                    <WebView
                      id={v.id}
                      url={v.url}
                      hidden={hidden}
                      useModifiedAgent={this.useModifiedAgent}
                      defaultWindowBehaviour={this.defaultWindowBehaviour}
                      actionRequest={this.state.actionRequest}
                      handleRefresh={this.handleRefresh}
                    />
                  </div>;
                })}
              </div>

              {this.state.page === 'search' && <div className="dashboard-container d-flex justify-content-center">
                <Search
                  items={this.menuItems}
                  handleRefresh={this.handleRefresh}
                />
              </div>}

              {this.state.page === 'settings' && <div className="dashboard-container d-flex justify-content-center">
                <Settings
                  items={this.menuItems}
                  userSettings={this.userSettings}
                  presetSettings={this.presetSettings}
                  handleRefresh={this.handleRefresh}
                />
              </div>}
            </div>
          </div>

          {/* show dialog across the entire app */}
          {this.state.dialog &&
            <Dialog
              {...this.state.dialog}
              handleClose={this.handleDialogClose}
            />
          }

        </div>
      : <Loader shortLoader={!this.state.firstLoad} />
    );
  }

}
