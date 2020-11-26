import React from 'react';
import { ButtonBase, IconButton, Paper, Slide } from '@material-ui/core';
import { Image, Refresh, Home, ArrowBack, ArrowForward, Delete } from '@material-ui/icons';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { IMenuItem } from '../../typings/d';
import './menuItem.css';
import { MenuService } from '../../services/menu';

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
      <div className="row">
        <ButtonBase
          className={`menu-item mt-2 ${this.props.page === 'web' && this.props.focused ? 'menu-item-selected' : ''}`}
          onClick={() => this.props.handleClick('web', this.props.data)}
          onContextMenu={this.handleContextMenu}
          onBlur={this.handleContextMenu}

        >
          {this.props.data.icon
            ? <img className="menu-item-image" src={this.props.data.icon} />
            : <Image className="menu-item-image" color="secondary" />
          }
        </ButtonBase>
          <Slide
            in={this.state.contextMenu}
            direction="right"
          >
            <Paper className="d-flex flex-row position-absolute mt-1 bg-primary" elevation={10}>
              {this.props.data.icon
                ? <img className="menu-item-image align-self-center ml-1" src={this.props.data.icon} />
                : <Image className="menu-item-image align-self-center ml-1" color="secondary" />
              }

              <IconButton onClick={this.handleContextMenu}>
                <Home fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={this.handleContextMenu}>
                <Refresh fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={this.handleContextMenu}>
                <ArrowBack fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={this.handleContextMenu}>
                <ArrowForward fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={async () => await MenuService.delete(this.props.data.id)}>
                <Delete fontSize="small" color="error" />
              </IconButton>

            </Paper>
          </Slide>
      </div>
    );
  }
}
