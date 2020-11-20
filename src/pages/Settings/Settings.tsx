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
      {
        name: 'darkMode',
        value: this.state['darkMode'],
        label: 'Dark Mode',
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
        type: 'switch',
        defaultValue: 'true',
      },
      {
        name: 'bugReport',
        value: this.state['bugReport'],
        label: 'Bug Reprot',
        type: 'switch',
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
  protected handleUpdate(name: string, value: string): void {
    console.log(name, value);
    this.setState({ [name]: value });
    console.log(this.state);
  }

  render() {
    return (
      <div className="settings-container">

        <h3 className="primary font-weight-bold">General</h3>
        <hr />
        {this.general.map(v => (
          <Setting
            name={v.name}
            value={this.state[v.name]}
            label={v.label}
            type={v.type}
            handleUpdate={this.handleUpdate}
          />
        ))}

        <h3 className="primary font-weight-bold mt-5 ">Beta</h3>
        <hr />
        {this.beta.map(v => (
          <Setting
            name={v.name}
            value={this.state[v.name]}
            label={v.label}
            type={v.type}
            handleUpdate={this.handleUpdate}
          />
        ))}

      </div>
    );
  }
}
