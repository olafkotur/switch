import React from 'react';
import GeneralSetting from '../../components/Setting/GeneralSetting';
import PresetSetting from '../../components/Setting/PresetSetting';
import { IMenuItem, ISetting, ISettingConfig, IPresetSetting } from '../../typings/d';
import { SettingsService } from '../../services/settings';
import { UtilService } from '../../services/util';
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
}

export default class Settings extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected general: ISettingConfig[];
  protected presets: IPresetSetting[];

  /**
   * Settings constructor
   * @param props - component props
   */
  constructor(props: IProps) {
    super(props);

    // state
    this.state = Object.assign(
      {},
      ...this.props.userSettings.map(v => ({ [v.name]: v.value })),
    );

    // local properties
    this.general = [
      {
        name: 'overlayMode',
        label: 'Overlay mode',
        type: 'switch',
        value: this.state['overlayMode'],
        hover: 'Allow Switch to be shown on top of full screen applications',
      },
      {
        name: 'animateResize',
        label: 'Animate Resize',
        type: 'switch',
        value: this.state['animateResize'],
      },
      {
        name: 'useModifiedAgent',
        label: 'Modified user agent',
        type: 'switch',
        hover: 'Experimental feature, may cause some websites to break. Use this if you have issues acessing websites due to an old chrome version',
        value: this.state['useModifiedAgent'],
      },
      {
        name: 'showBetaStatus',
        label: 'Show Beta Status',
        type: 'switch',
        value: this.state['showBetaStatus'],
      },
    ];

    this.presets = [...this.props.presetSettings];

    // scope binding
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  /**
   * Handles setting update
   * @param name - setting name
   * @param value - setting value
   */
  protected async handleUpdate(name: string, value?: string): Promise<void> {
    const shouldRefresh = ['showBetaStatus', 'useModifiedAgent', 'overlayMode'].includes(name);
    if (value) {
      this.setState({ [name]: value });
      const res = await SettingsService.update(name, value);
      if (!res) {
        return UtilService.error();
      }
    }
    shouldRefresh && this.props.handleRefresh(); // do not await
  }

  render() {
    return (
      <div className="settings-container">
        {/* general settings */}
        <h3 className="primary font-weight-bold">General</h3>
        <hr />
        {this.general.map(v => (
          <GeneralSetting
            {...v}
            key={`general-setting-${v.name}`}
            value={this.state[v.name]}
            handleUpdate={this.handleUpdate}
          />
        ))}

        {/* preset settings */}
        <h3 className="primary font-weight-bold mt-5">Presets</h3>
        <hr />
        {this.presets.map(v => (
          <PresetSetting
            {...v}
            key={`preset-setting-${v.id}`}
            animate={this.state.animateResize === 'true'}
            handleRefresh={this.props.handleRefresh}
          />
        ))}

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
