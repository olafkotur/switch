import React from 'react';
import { Add } from '@material-ui/icons';
import { ISidebarItem } from '../../typings/component';
import { ButtonBase, Chip } from '@material-ui/core';
import './sidebar.css';

interface IProps {
  activeSidebar: ISidebarItem | null;
  handleChangeService: (item: ISidebarItem) => void;
}

interface IState {
  isLoading: boolean;
}

export default class Sidebar extends React.Component<IProps, IState> {
  /**
   * Local properties.
   */
  protected items: ISidebarItem[] = [];

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    this.items.push({
      name: 'Notion',
      url: 'https://notion.so',
      icon: require('../../../assets/notion.png'),
      order: 1,
    });

    this.items.push({
      name: 'Whatsapp',
      url: 'https://web.whatsapp.com',
      icon: require('../../../assets/whatsapp.png'),
      order: 2,
    });

    this.items.push({
      name: 'Messenger',
      url: 'https://messenger.com',
      icon: require('../../../assets/messenger.png'),
      order: 3,
    });

    this.items.push({
      name: 'Slack',
      url: 'https://slack.com',
      icon: require('../../../assets/slack.png'),
      order: 4,
    });

    this.props.handleChangeService(this.items[0]);
    this.setState({ isLoading: false });
  }

  protected generateItems() {
    return this.items.map((v, i) => {
      return (
        <div
          key={`sidebar-item-${i}`}
        >
          <ButtonBase
            onClick={() => this.props.handleChangeService(v)}
          >
            <img
              src={v.icon}
              className="sidebar-web-item"
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
        <div>
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

        <div className="d-flex justify-content-center">
          <Add className="d-flex align-self-center primary"/>
        </div>
      </div>
    );
  }
}
