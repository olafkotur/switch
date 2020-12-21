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
    this.handleClick = this.handleClick.bind(this);

    // local properties
    this.presets = PresetService.fetch();
    this.general = [
      {
        name: 'overlayMode',
        label: 'Overlay mode',
        type: 'switch',
        value: this.state.overlayMode,
        hover: 'Turn this off to use Switch as a normal application, overlay and toggle visbility features will be disabled',
        restart: true,
      },
      {
        name: 'useModifiedAgent',
        label: 'Modified user agent',
        type: 'switch',
        hover: 'Experimental feature, may cause some websites to break. Use this if you have issues acessing websites due to an old chrome version',
        value: this.state.modifiedAgent,
      },
      {
        name: 'displayWarningMessages',
        label: 'Warning messages',
        type: 'switch',
        hover: 'Display a warning message when hiding the window via the hide menu button',
        value: this.state.warningMessages,
      },
      {
        name: 'visibilityKeybind',
        label: 'Toggle show/hide keybind',
        type: 'custom',
        value: '',
        restart: true,
        custom: <KeybindButton
          keybind={this.state.visiblityKeybind}
          handleUpdate={this.handleUpdate}
        />,
      },
      {
        name: 'defaultWindowBehaviour',
        label: 'Hyperlink behaviour',
        type: 'select',
        values: [
          { value: 'window', label: 'New Window' },
          { value: 'within', label: 'Within Switch' },
          { value: 'external', label: 'Default Browser' },
        ],
        value: this.state.windowBehaviour,
      },
    ];

    this.appearance = [
      {
        name: 'animateResize',
        label: 'Animate Resize',
        type: 'switch',
        value: this.state['animateResize'],
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
        {this.state.shouldRestart &&
          <Paper className="d-flex flex-row justify-content-center mb-4 py-3 bg-secondary">
            <span className="text-danger text-center p-1">Some changes require the application to restart to take effect</span>
          </Paper>
        }

        {/* preset settings */}
        <h3 className="primary font-weight-bold mt-5">Presets</h3>
        <hr />
        <div className="d-flex flex-row row">
          {this.presets.map(v => (
            <Preset
              {...v}
              key={`preset-setting-${v.name}`}
              animate={this.state.animateResize}
              handleRefresh={this.props.handleRefresh}
            />
          ))}
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
