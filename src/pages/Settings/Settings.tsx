import React from 'react';
import Setting from '../../components/Setting/Setting';
import { ISettingConfig } from '../../typings/d';
import * as _ from 'lodash';
import './settings.css';

interface IProps {
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

    // assign default state values
    const config: ISettingConfig[] = [...this.general, ...this.beta];
    this.state = Object.assign({}, ...config.map(v => ({ [v.name]: v.defaultValue || '' })));

    // scope binding
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  /**
   * Handles setting update
   */
  protected handleUpdate(name: string, value?: string): void {
    if (value) {
      this.setState({ [name]: value });
    } else {
    }
  }

  render() {
    return (
      <div className="settings-container">

        <h3 className="primary font-weight-bold">General</h3>
        <hr />
        {this.general.map(v => (
          <Setting
            key={`general-setting-${v.name}`}
            name={v.name}
            value={this.state[v.name]}
            label={v.label}
            type={v.type}
            action={v.action}
            handleUpdate={this.handleUpdate}
          />
        ))}

        <h3 className="primary font-weight-bold mt-5 ">Beta</h3>
        <hr />
        {this.beta.map(v => (
          <Setting
            key={`beta-setting-${v.name}`}
            name={v.name}
            value={this.state[v.name]}
            label={v.label}
            type={v.type}
            action={v.action}
            handleUpdate={this.handleUpdate}
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
