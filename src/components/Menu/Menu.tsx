import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { VisibilityOff, Search, Settings, Image } from '@material-ui/icons';
import { IMenuItem, ISetting, WebViewAction } from '../../typings/d';
import { Chip, IconButton, Tooltip } from '@material-ui/core';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { ElectronService } from '../../services/electron';
import './menu.css';

interface IProps {
  page: TPages;
  items: IMenuItem[];
  focusedItem: IMenuItem | null;
  userSettings: ISetting[];
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleRefresh: () => Promise<void>;
  handleActionRequest: (id: string, action: WebViewAction) => void;
}

export default class Menu extends React.Component<IProps> {
  /**
   * Generates menu items
   */
  protected generateItems() {
    return this.props.items.map((v, i) => {
      return (
        <MenuItem
          key={`menu-item-${i}`}
          data={v}
          page={this.props.page}
          focused={this.props.focusedItem && this.props.focusedItem.id === v.id ? true : false}
          handleClick={this.props.handleClick}
          handleRefresh={this.props.handleRefresh}
          handleActionRequest={this.props.handleActionRequest}
        />
      );
    });
  }

  render() {
    const showBetaStatus = (this.props.userSettings.find(v => v.name === 'showBetaStatus')?.value || '') === 'true';
    return (
      <div className="vh-100">
        <div className="menu-top">
          {showBetaStatus && <div className="d-flex justify-content-center pt-2">
            <Chip
              label="beta"
              size="small"
              className="menu-beta"
            />
          </div>}
          <div className="d-flex flex-column justify-content-center align-items-center mt-2">
            {this.generateItems()}
          </div>
        </div>

        <div className="menu-bottom">
          <div className="menu-actions d-flex flex-column justify-content-center align-items-center">
            <Tooltip title="Hide window" enterDelay={750}>
              <IconButton
                className="menu-item flex-column"
                onClick={() => ElectronService.toggleVisibility()}
              >
                <VisibilityOff className="primary" fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add new services" enterDelay={750}>
              <IconButton
                className={`menu-item flex-column ${this.props.page === 'search' ? 'menu-selected' : ''}`}
                onClick={() => this.props.handleClick('search')}
              >
                <Search className="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Access settings page" enterDelay={750}>
              <IconButton
                className={`menu-item flex-column ${this.props.page === 'settings' ? 'menu-selected' : ''}`}
                onClick={() => this.props.handleClick('settings')}
              >
                <Settings className="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
