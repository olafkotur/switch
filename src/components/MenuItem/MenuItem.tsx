import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { IMenuItem } from '../../typings/d';
import './menuItem.css';

interface IProps {
  data: IMenuItem;
  page: TPages;
  focused: boolean;
  handleClick: (action: TPages, item?: IMenuItem) => void;
}

interface IState {
  contextMenu: boolean;
}

export default class MenuItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      contextMenu: false,
    };

    // scope binding
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  protected handleContextMenu() {
    this.setState({ contextMenu: !this.state.contextMenu });
  }

  render() {
    return (
      <>
        <ButtonBase
          className={`menu-item mt-2 ${this.props.page === 'web' && this.props.focused ? 'menu-item-selected' : ''}`}
          onClick={() => this.props.handleClick('web', this.props.data)}
          onContextMenu={this.handleContextMenu}
        >
          {this.props.data.icon
            ? <img className="menu-item-image" src={this.props.data.icon} />
            : <Image className="menu-item-image" color="secondary" />
          }
        </ButtonBase>
        {this.state.contextMenu &&
          <div className="position-absolute" style={{width: 100, height: 100, background: 'red' }}>Hello World</div>
        }
      </>
    );
  }
}
