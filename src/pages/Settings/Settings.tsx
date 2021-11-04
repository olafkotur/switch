import React from 'react';
import Preset from '../../components/Preset/Preset';
import Setting from '../../components/Setting/Setting';
import { Info } from '@material-ui/icons';
import { IProps as IDialog } from '../../components/Dialog/Dialog';
import {
  IMenuItem,
  ISettingConfig,
  IPreset,
  IUserSettings,
  FontFamily,
} from '../../typings/d';
import { SettingsService } from '../../services/settings';
import { UtilService } from '../../services/util';
import { Paper } from '@material-ui/core';
import { PresetService } from '../../services/preset';
import {
  visibilityKeybindSelect,
  windowBehaviourSelect,
  accentColorSelect,
  fontFamilySelect,
  tutorial,
} from '../../components/Dialog/DialogContent';
import * as _ from 'lodash';
import './settings.css';

interface IProps {
  items: IMenuItem[];
  userSettings: IUserSettings;
  handleRefresh: () => Promise<void>;
  handleDialog: (data: IDialog) => void;
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
        name: 'tutorial',
        value: 'tutorial',
        label: 'Tutorial',
        description: 'view application tutorial',
        type: 'pop-up',
        icon: Info,
        handleChange: () =>
          this.props.handleDialog({
            open: true,
            title: 'Tutorial',
            content: tutorial(),
            hideButtons: true,
          }),
      },
      {
        name: 'visiblityKeybind',
        value: this.state.visiblityKeybind,
        label: 'Visiblity Keybind',
        description: 'combination used to toggle the window’s visibility',
        type: 'pop-up',
        restart: true,
        handleChange: () =>
          this.props.handleDialog({
            open: true,
            title: 'Visibility Keybind',
            content: visibilityKeybindSelect(
              this.state.visiblityKeybind,
              (v: string) =>
                this.handleUpdate('visiblityKeybind', v, false, true),
            ),
            hideButtons: true,
            disableEscKey: true,
            secondaryLabel: 'dismiss',
          }),
      },
      {
        name: 'windowBehaviour',
        value: this.state.windowBehaviour,
        label: 'Hyperlink Behaviour',
        description:
          'choose what happens when you open a hyperlink within Switch',
        type: 'pop-up',
        restart: true,
        refresh: true,
        handleChange: () =>
          this.props.handleDialog({
            open: true,
            title: 'Hyperlink Behaviour',
            content: windowBehaviourSelect(
              this.state.windowBehaviour,
              (v: string) => {
                this.handleUpdate('windowBehaviour', v, true, true);
                this.props.handleDialog({
                  open: false,
                  hideButtons: true,
                  title: '',
                  content: '',
                });
              },
            ),
            hideButtons: true,
          }),
      },
      {
        name: 'overlayMode',
        value: this.state.overlayMode,
        label: 'Overlay mode',
        description: 'switch will display over other applications',
        type: 'switch',
        restart: true,
      },
      {
        name: 'modifiedAgent',
        value: this.state.modifiedAgent,
        description:
          'fixes issues with chrome version compatibility on some applications',
        label: 'Modified user agent',
        type: 'switch',
        refresh: true,
      },
      {
        name: 'warningMessages',
        value: this.state.warningMessages,
        label: 'Warning messages',
        description: 'display helpful messages when performing some actions',
        type: 'switch',
        refresh: true,
      },
    ];

    this.appearance = [
      {
        name: 'fontFamily',
        value: this.state.fontFamily,
        label: 'Font Family',
        description: 'change the font used for the application',
        type: 'pop-up',
        refresh: true,
        handleChange: () =>
          this.props.handleDialog({
            open: true,
            title: 'Font Family',
            content: fontFamilySelect(
              this.state.fontFamily,
              (v: FontFamily) => {
                this.handleUpdate('fontFamily', v, true, false);
                this.props.handleDialog({
                  open: false,
                  hideButtons: true,
                  title: '',
                  content: '',
                });
              },
            ),
            hideButtons: true,
          }),
      },
      {
        name: 'accentColor',
        value: this.state.accentColor,
        label: 'Accent Color',
        description: 'change the accent colour of the application',
        type: 'pop-up',
        refresh: true,
        handleChange: () =>
          this.props.handleDialog({
            open: true,
            title: 'Accent Color',
            content: accentColorSelect((v: string) => {
              this.handleUpdate('accentColor', v, true, false);
              this.props.handleDialog({
                open: false,
                hideButtons: true,
                title: '',
                content: '',
              });
            }),
            hideButtons: true,
          }),
      },
      {
        name: 'animatePresets',
        value: this.state.animatePresets,
        label: 'Animate Presets',
        description: 'shows an animation when resizing windows with a preset',
        type: 'switch',
      },
      {
        name: 'windowPadding',
        value: this.state.windowPadding,
        label: 'Window Padding',
        description: 'gives the window extra padding around the sides',
        type: 'switch',
        experimental: true,
      },
    ];
  }

  /**
   * Handles setting update
   * @param name - setting name
   * @param value - setting value
   * @param shouldRefresh - refresh the current window
   * @param shouldRestart - display restart app message
   */
  protected async handleUpdate(
    name: string,
    value: boolean | string,
    shouldRefresh: boolean,
    shouldRestart: boolean,
  ): Promise<void> {
    // @ts-ignore
    this.setState({ [name]: value });
    const res = await SettingsService.update({ [name]: value });
    if (!res) {
      return UtilService.error();
    }
    shouldRestart && this.setState({ shouldRestart: true });
    shouldRefresh && this.props.handleRefresh(); // do not await
  }

  render() {
    return (
      <div className="settings-container">
        {this.state.shouldRestart && (
          <Paper className="d-flex flex-row justify-content-center mb-4 py-3 bg-secondary">
            <span className="text-danger text-center p-1">
              Some changes require the application to restart to take effect
            </span>
          </Paper>
        )}

        <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;General</h4>
        <div className="setting-group bg-secondary">
          {this.general.map((v) => (
            <Setting
              {...v}
              key={`general-setting-${v.name}`}
              value={this.state[v.name as keyof IState]}
              handleUpdate={this.handleUpdate}
            />
          ))}
        </div>

        <h4 className="primary font-weight-bold mt-5">
          &nbsp;&nbsp;Appearance
        </h4>
        <div className="setting-group bg-secondary">
          {this.appearance.map((v) => (
            <Setting
              {...v}
              key={`appearance-setting-${v.name}`}
              value={this.state[v.name as keyof IState]}
              handleUpdate={this.handleUpdate}
            />
          ))}
        </div>

        {/* preset settings */}
        <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;Presets</h4>
        <div className="setting-group bg-secondary">
          <div className="d-flex flex-row row">
            {this.presets.map((v) => (
              <Preset
                {...v}
                key={`preset-setting-${v.name}`}
                animate={this.state.animatePresets}
                windowPadding={this.state.windowPadding}
                handleRefresh={this.props.handleRefresh}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
