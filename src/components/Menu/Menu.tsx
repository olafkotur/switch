import React from 'react';
import { VisibilityOff, Search, Settings, Image } from '@material-ui/icons';
import { IMenuItem } from '../../typings/d';
import { ButtonBase, Chip, IconButton, Tooltip } from '@material-ui/core';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { remote } from 'electron';
import './menu.css';

interface IProps {
  page: TPages;
  items: IMenuItem[];
  focusedItem: IMenuItem | null;
  handleClick: (action: TPages, item?: IMenuItem) => void;
}

export default class Menu extends React.Component<IProps> {
  /**
   * Local properties
   */

  /**
   * Generates menu items
   */
  protected generateItems() {
    return this.props.items.map((v, i) => {
      return (
        <ButtonBase
          key={`menu-item-${i}`}
          className={`menu-item mt-2 ${this.props.page === 'web' && this.props.focusedItem && this.props.focusedItem.id === v.id ? 'menu-selected' : ''}`}
          onClick={() => this.props.handleClick('web', v)}
        >
          {v.icon
            ? <img className="menu-image" src={v.icon} />
            : <Image className="menu-image" color="secondary" />
          }
        </ButtonBase>
      );
    });
  }

  render() {
    return (
      <div className="vh-100">
        <div className="menu-top">
          <div className="d-flex justify-content-center pt-2">
            <Chip
              label="beta"
              size="small"
              className="menu-beta"
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mt-2">
            {this.generateItems()}
          </div>
        </div>

        <div className="menu-bottom">
          <div className="menu-actions d-flex flex-column justify-content-center align-items-center">
            <Tooltip title="Hide window" enterDelay={750}>
              <IconButton
                className="menu-item flex-column"
                onClick={() => remote.getCurrentWindow().hide()}
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
