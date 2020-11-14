import React from 'react';
import { Add, Visibility, Settings } from '@material-ui/icons';
import { IMenuItem } from '../../typings/d';
import { Button, ButtonBase, Chip, IconButton } from '@material-ui/core';
import { TPages } from '../../pages/Dashboard/Dashboard';
import './menu.css';

interface IProps {
  page: TPages;
  items: IMenuItem[];
  focusedItem: IMenuItem | null;
  handleClick: (action: TPages, item?: IMenuItem) => void;
}

export default class Menu extends React.Component<IProps> {
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
          <img
            className="menu-image"
            src={v.icon}
          />
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
              color="secondary"
              size="small"
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mt-2">
            {this.generateItems()}
          </div>
        </div>

        <div className="menu-bottom">
          <div className="menu-actions d-flex flex-column justify-content-center align-items-center">
            <IconButton
              className={`menu-item flex-column ${this.props.page === 'search' ? 'menu-selected' : ''}`}
              onClick={() => this.props.handleClick('search')}
            >
              <Add className="primary" />
            </IconButton>

            <IconButton
              className="menu-item flex-column"
              onClick={() => console.log('TODO: Toggle visibility')}
            >
              <Visibility className="primary" />
            </IconButton>

            <IconButton
              className={`menu-item flex-column ${this.props.page === 'settings' ? 'menu-selected' : ''}`}
              onClick={() => this.props.handleClick('settings')}
            >
              <Settings className="primary" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}
