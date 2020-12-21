import React from 'react';
import KeybindButton from '../../components/KeybindButton/KeybindButton';
import Preset from '../../components/Preset/Preset';
import { IMenuItem, ISettingConfig, IPreset, IUserSettings } from '../../typings/d';
import { SettingsService } from '../../services/settings';
import { UtilService } from '../../services/util';
import { Paper } from '@material-ui/core';
import { PresetService } from '../../services/preset';
import * as _ from 'lodash';
import './settings.css';
import Setting from '../../components/Setting/Setting';

interface IProps {
  items: IMenuItem[];
  userSettings: IUserSettings;
  handleRefresh: () => Promise<void>;
}

interface IState extends IUserSettings {
  shouldRestart: boolean;
}

export default class Settings extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected general: ISettingConfig[];
  protected appearance: ISettingConfig[];
  protected presets: IPreset[];

  /**
   * Settings constructor
   * @param props - component props
   */
  constructor(props: IProps) {
    super(props);

    // state
    this.state = Object.assign(
      { shouldRestart: false },
      this.props.userSettings,
    );

    // scope binding
    this.handleUpdate = this.handleUpdate.bind(this);

    // local properties
    this.presets = PresetService.fetch();
    this.general = [
      {
        name: 'overlayMode',
        value: this.state.overlayMode,
        label: 'Overlay mode',
        description: 'switch will display over other applications',
        type: 'switch',
        restart: true,
      },
      {
        name: 'useModifiedAgent',
        value: this.state.modifiedAgent,
        description: 'fixes issues with chrome version compatibility on some applications',
        label: 'Modified user agent',
        type: 'switch',
      },
      {
        name: 'displayWarningMessages',
        value: this.state.warningMessages,
        label: 'Warning messages',
        description: 'display helpful messages when performing some actions',
        type: 'switch',
      },
    ];

    this.appearance = [
      {
        name: 'darkMode',
        value: this.state.darkMode,
        label: 'Dark Mode',
        description: 'toggle between light and dark themes',
        type: 'switch',
      },
      {
        name: 'animateResize',
        value: this.state.animatePresets,
        label: 'Animate Presets',
        description: 'shows an animation when resizing windows with a preset',
        type: 'switch',
      },
    ];

  }

  /**
   * Handles setting update
   * @param name - setting name
   * @param value - setting value
   * @param restart - display restart app message
   */
  protected async handleUpdate(name: string, value: boolean | string, restart?: boolean): Promise<void> {
    const shouldRefresh = ['showBetaStatus', 'useModifiedAgent', 'displayWarningMessages', 'defaultWindowBehaviour'].includes(name);
    // @ts-ignore
    this.setState({ [name]: value });
    const res = await SettingsService.update({ [name]: value });
    if (!res) {
      return UtilService.error();
    }
    restart && this.setState({ shouldRestart: true });
    shouldRefresh && this.props.handleRefresh(); // do not await
  }

  render() {
    return (
      <div className="settings-container">
        {this.state.shouldRestart &&
          <Paper className="d-flex flex-row justify-content-center mb-4 py-3 bg-secondary">
            <span className="text-danger text-center p-1">Some changes require the application to restart to take effect</span>
          </Paper>
        }

        <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;General</h4>
        <div className="setting-group bg-secondary">
          {this.general.map(v => (
            <Setting
              {...v}
              value={this.state[v.name as keyof IState]}
              handleUpdate={this.handleUpdate}
            />
          ))}
        </div>

        <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;Appearance</h4>
        <div className="setting-group bg-secondary">
          {this.appearance.map(v => (
            <Setting
              {...v}
              value={this.state[v.name as keyof IState]}
              handleUpdate={this.handleUpdate}
            />
          ))}
        </div>

        {/* preset settings */}
        <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;Presets</h4>
        <div className="setting-group bg-secondary">
          <div className="d-flex flex-row row">
            {this.presets.map(v => (
              <Preset
                {...v}
                key={`preset-setting-${v.name}`}
                animate={this.state.animatePresets}
                handleRefresh={this.props.handleRefresh}
              />
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="d-flex flex-row justify-content-center my-5">
          <a
            className="primary mx-3"
            href="https://www.notion.so/olafkotur/Tutorial-a77509d0ed234ab985f0e0d7c88c01e2"
            target="_blank"
          >
            &#129355; Tutorial
          </a>
          <a
            className="primary mx-3"
            href="https://www.notion.so/olafkotur/News-Updates-97fc4e6c87724db2b8c32acfbe8f7ae0"
            target="_blank"
          >
            &#128227; News & Updates
          </a>
        </div>
      </div>
    );
  }
}
