import React from 'react';
import { Add } from '@material-ui/icons';
import { ISidebarItem } from '../../typings/component';

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
        <div key={`sidebar-item-${i}`}>
          <img
            src={v.icon}
            className="sidebar-web-item"
            onClick={() => this.props.handleChangeService(v.url)}
          />
        </div>
      );
    });
  }

  render() {
    return (
      !this.state.isLoading && <div className="d-flex row justify-content-center">
        <div className="fixed-top pt-2">
          <h6 className="secondary ml-2">beta</h6>
        </div>
        <div className="sidebar-web-items pt-3">
          {this.generateItems()}
        </div>
        <div className="fixed-bottom">
          <Add />
        </div>
      </div>
    );
  }
}
