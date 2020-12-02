import React from 'react';
import KeybindButton from '../../components/KeybindButton/KeybindButton';
import Preset from '../../components/Preset/Preset';
import Setting from '../../components/Setting/Setting';
import { IMenuItem, ISetting, ISettingConfig, IPresetSetting } from '../../typings/d';
import { SettingsService } from '../../services/settings';
import { UtilService } from '../../services/util';
import { Paper } from '@material-ui/core';
import * as _ from 'lodash';
import './settings.css';

interface IProps {
  items: IMenuItem[];
  userSettings: ISetting[];
  presetSettings: IPresetSetting[];
  handleRefresh: () => Promise<void>;
}

interface IState {
  [name: string]: string;
  shouldRestart: 'true' | 'false';
}

export default class Settings extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected general: ISettingConfig[];
  protected appearance: ISettingConfig[];
  protected presets: IPresetSetting[];

  /**
   * Settings constructor
   * @param props - component props
   */
  constructor(props: IProps) {
    super(props);

    // state
    this.state = Object.assign(
      { shouldRestart: 'false' },
      ...this.props.userSettings.map(v => ({ [v.name]: v.value })), // map user settings to state
    );

    // scope binding
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // local properties
    this.general = [
      {
        name: 'overlayMode',
        label: 'Overlay mode',
        type: 'switch',
        value: this.state['overlayMode'],
        hover: 'Turn this off to use Switch as a normal application, overlay and toggle visbility features will be disabled',
        restart: true,
      },
      {
        name: 'useModifiedAgent',
        label: 'Modified user agent',
        type: 'switch',
        hover: 'Experimental feature, may cause some websites to break. Use this if you have issues acessing websites due to an old chrome version',
        value: this.state['useModifiedAgent'],
      },
      {
        name: 'visibilityKeybind',
        label: 'Toggle Show/Hide Keybind',
        type: 'custom',
        value: '',
        restart: true,
        custom: <KeybindButton
          keybind={this.state['visibilityKeybind']}
          handleUpdate={this.handleUpdate}
        />,
      },
    ];

    this.appearance = [
      {
        name: 'animateResize',
        label: 'Animate Resize',
        type: 'switch',
        value: this.state['animateResize'],
      },
      {
        name: 'showBetaStatus',
        label: 'Show Beta Status',
        type: 'switch',
        value: this.state['showBetaStatus'],
      },
    ];

    this.presets = [...this.props.presetSettings];
  }

  /**
   * Handles setting update
   * @param name - setting name
   * @param value - setting value
   */
  protected async handleUpdate(name: string, value: string, restart?: boolean): Promise<void> {
    const shouldRefresh = ['showBetaStatus', 'useModifiedAgent'].includes(name);
    // tslint:disable-next-line: no-any
    this.setState({ [name]: value as any });
    const res = await SettingsService.update(name, value);
    if (!res) {
      return UtilService.error();
    }
    restart && this.setState({ shouldRestart: 'true' });
    shouldRefresh && this.props.handleRefresh(); // do not await
  }

   /**
   * Handles click events
   * @param name - setting name
   */
  protected async handleClick(name: string): Promise<void> {
    return;
  }

  render() {
    return (
      <div className="settings-container">
        {this.state.shouldRestart === 'true' &&
          <Paper className="d-flex flex-row justify-content-center mb-4 py-3 bg-secondary">
            <span className="text-danger text-center p-1">Some changes require the application to restart to take effect</span>
          </Paper>
        }

        {/* general settings */}
        <h3 className="primary font-weight-bold">General</h3>
        <hr />
        {this.general.map(v => (
          <Setting
            {...v}
            key={`general-setting-${v.name}`}
            value={this.state[v.name] as string}
            handleUpdate={this.handleUpdate}
            handleClick={this.handleClick}
          />
        ))}

        {/* appearance settings */}
        <h3 className="primary font-weight-bold mt-5">Appearance</h3>
        <hr />
        {this.appearance.map(v => (
          <Setting
            {...v}
            key={`appearance-setting-${v.name}`}
            value={this.state[v.name] as string}
            handleUpdate={this.handleUpdate}
            handleClick={this.handleClick}
          />
        ))}

        {/* preset settings */}
        <h3 className="primary font-weight-bold mt-5">Presets</h3>
        <hr />
        <div className="d-flex flex-row row">
          {this.presets.map(v => (
            <Preset
              {...v}
              key={`preset-setting-${v.id}`}
              animate={this.state.animateResize === 'true'}
              handleRefresh={this.props.handleRefresh}
            />
          ))}
        </div>

        {/* footer */}
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
