import React from 'react';
import { Add } from '@material-ui/icons';
import { ISidebarItem } from '../../typings/component';
import { Avatar, Button, ButtonBase, Chip } from '@material-ui/core';
import './sidebar.css';

interface IProps {
  handleChangeService: (url: string) => void;
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
    // const res = await fetch('http://www.google.com/s2/favicons?domain=www.notion.so').then(res => res.json());
    this.items.push({
      name: 'Notion',
      url: 'https://notion.so',
      icon: 'https://www.google.com/s2/favicons?domain=www.notion.so',
      order: 1,
    });

    this.items.push({
      name: 'Whatsapp',
      url: 'https://web.whatsapp.com',
      icon: 'https://www.google.com/s2/favicons?domain=www.whatsapp.com',
      order: 1,
    });

    this.items.push({
      name: 'Messenger',
      url: 'https://messenger.com',
      icon: 'https://www.google.com/s2/favicons?domain=www.messenger.com',
      order: 1,
    });

    this.setState({ isLoading: false });
  }

  protected generateItems() {
    return this.items.map((v, i) => {
      return (
        <div key={`sidebar-item-${i}`} className="">
          <ButtonBase>
            <img src={v.icon} className="sidebar-web-item" />
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
