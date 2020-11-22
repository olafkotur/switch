import React from 'react';
import Setting from '../../components/Setting/Setting';
import { IMenuItem, IServiceSettingConfig, ISettingConfig } from '../../typings/d';
import * as _ from 'lodash';
import './settings.css';
import ServiceSetting from '../../components/ServiceSetting/ServiceSetting';
import { StorageService } from '../../services/storage';
import { MenuService } from '../../services/menu';

interface IProps {
  items: IMenuItem[];
  handleRefresh: () => Promise<void>;
}

interface IState {
  [name: string]: string;
}

export default class Settings extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected general: ISettingConfig[];
  protected beta: ISettingConfig[];
  protected services: IServiceSettingConfig[];

  /**
   * Settings constructor
   * @param props - component props
   */
  constructor(props: IProps) {
    super(props);

    this.state = {};

    // local properties
    this.general = [
      {
        name: 'startUpLaunch',
        value: this.state['startUpLaunch'],
        label: 'Launch on Start-up',
        type: 'switch',
        defaultValue: 'true',
      },
    ];

    this.beta = [
      {
        name: 'showBetaStatus',
        value: this.state['showBetaStatus'],
        label: 'Show Beta Status',
        type: 'switch',
        defaultValue: 'true',
      },
      {
        name: 'featureRequest',
        value: this.state['featureRequest'],
        label: 'Feature Request',
        type: 'button',
        action: 'send',
        defaultValue: 'true',
      },
      {
        name: 'bugReport',
        value: this.state['bugReport'],
        label: 'Bug Report',
        type: 'button',
        action: 'send',
        defaultValue: 'true',
      },
    ];

    this.services = this.props.items.map(v => ({
      id: v.id,
      label: v.url.split('://')[1],
      icon: v.icon,
    }));

    // assign default state values
    const config: ISettingConfig[] = [...this.general, ...this.beta];
    this.state = Object.assign({}, ...config.map(v => ({ [v.name]: v.defaultValue || '' })));

    // scope binding
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * Handles setting update
   */
  protected handleUpdate(name: string, value?: string): void {
    if (value) {
      this.setState({ [name]: value });
    }
  }

  /**
   * Handles file upload
   * @param id - service id
   * @param file - file
   */
  protected async handleUpload(id: string, file: File): Promise<void> {
    const base64 = await StorageService.base64(file);
    const res = await MenuService.update(id, base64);
    if (!res) {
      alert('Something went wrong, please try again');
    }
    this.props.handleRefresh();
  }

  protected async handleDelete(id: string): Promise<void> {
    const res = await MenuService.delete(id);
    if (!res) {
      alert('Something went wrong, please try again');
    }
    this.props.handleRefresh();
  }

  render() {
    return (
      <div className="settings-container">

        <h3 className="primary font-weight-bold">General</h3>
        <hr />
        {this.general.map(v => (
          <Setting
            {...v}
            key={`general-setting-${v.name}`}
            value={this.state[v.name]}
            handleUpdate={this.handleUpdate}
          />
        ))}

        <h3 className="primary font-weight-bold mt-5 ">Beta</h3>
        <hr />
        {this.beta.map(v => (
          <Setting
            {...v}
            key={`beta-setting-${v.name}`}
            value={this.state[v.name]}
            handleUpdate={this.handleUpdate}
          />
        ))}

        <h3 className="primary font-weight-bold mt-5 ">Services</h3>
        <hr />
        {this.services.map(v => (
          <ServiceSetting
            {...v}
            key={`service-setting-${v.id}`}
            handleUpload={this.handleUpload}
            handleDelete={this.handleDelete}
          />
        ))}

        <div className="d-flex justify-content-center my-5">
          <a
            className="text-muted"
            href="https://www.notion.so/olafkotur/What-s-New-87a42395e92d44f4866d895fcd91d0ac"
            target="_blank"
          >
            what's new?
          </a>
        </div>

      </div>
    );
  }
}
