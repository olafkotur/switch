import React, { useEffect, useRef } from 'react';
import { ButtonBase, IconButton, Paper, Slide } from '@material-ui/core';
import { Image, Refresh, Home, ArrowBack, ArrowForward, Delete } from '@material-ui/icons';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { IMenuItem } from '../../typings/d';
import './menuItem.css';
import { MenuService } from '../../services/menu';
import { UtilService } from '../../services/util';

interface IProps {
  data: IMenuItem;
  page: TPages;
  focused: boolean;
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleRefresh: () => Promise<void>;
}

interface IState {
  contextMenu: boolean;
}

export default class MenuItem extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected ref: React.RefObject<HTMLDivElement> = React.createRef();

  /**
   * MenuItem constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      contextMenu: false,
    };

    // scope binding
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', (e) => {
      if (this.state.contextMenu && this.ref.current
        && !this.ref.current.contains(e.target as Node)
      ) {
        this.setState({ contextMenu: false });
      }
    });
  }

  protected handleContextMenu() {
    this.setState({ contextMenu: !this.state.contextMenu });
  }

  protected handleNavigate(target: 'home' | 'refresh' | 'back' | 'forward') {
    console.log('willNavigate', target);
  }

  protected async handleDelete(): Promise<void> {
    const res = await MenuService.delete(this.props.data.id);
    if (!res) {
      UtilService.error();
    }
    this.props.handleRefresh(); // do not await
  }

  render() {
    return (
      <div className="row">
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
          <Slide
            in={this.state.contextMenu}
            direction="right"
            ref={this.ref}
          >
            <Paper className="d-flex flex-row position-absolute mt-1 bg-primary" elevation={10}>
              {this.props.data.icon
                ? <img className="menu-item-image align-self-center ml-1" src={this.props.data.icon} />
                : <Image className="menu-item-image align-self-center ml-1" color="secondary" />
              }

              <IconButton onClick={() => this.handleNavigate('home')}>
                <Home fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={() => this.handleNavigate('refresh')}>
                <Refresh fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={() => this.handleNavigate('back')}>
                <ArrowBack fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={() => this.handleNavigate('forward')}>
                <ArrowForward fontSize="small" className="text-white-50" />
              </IconButton>

              <IconButton onClick={this.handleDelete}>
                <Delete fontSize="small" color="error" />
              </IconButton>

            </Paper>
          </Slide>
      </div>
    );
  }
}
