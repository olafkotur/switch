import React from 'react';
import { Add, Visibility, Settings, Maximize } from '@material-ui/icons';
import { IMenuItem } from '../../typings/d';
import { ButtonBase, Chip } from '@material-ui/core';
import { MenuService } from '../../services/menu';
import './menu.css';

interface IProps {
  focusedItem: IMenuItem | null;
  handleChangeService: (item: IMenuItem) => void;
}

interface IState {
  isLoading: boolean;
}

export default class Menu extends React.Component<IProps, IState> {
  /**
   * Local properties.
   */
  protected items: IMenuItem[] = [];

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    this.items = MenuService.getItems();
    this.props.handleChangeService(this.items[0]);
    this.setState({ isLoading: false });
  }

  protected generateItems() {
    return this.items.map((v, i) => {
      return (
        <div key={`menu-item-${i}`}>
          <ButtonBase
            onClick={() => this.props.handleChangeService(v)}
          >
            <img
              src={v.icon}
              className="menu-item"
              // className={`sidebar-web-item ${this.props.activeSidebar && this.props.activeSidebar.name === v.name ? 'bg-primary' : ''}`}
            />
          </ButtonBase>
        </div>
      );
    });
  }

  render() {
    return (
      !this.state.isLoading && <div>
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

        <div className="menu-bottom d-flex flex-column justify-content-center align-items-center">
          <Add className="primary mt-2" />
          <Visibility className="primary mt-2" />
          <Settings className="primary mt-2" />
        </div>
      </div>
    );
  }
}
