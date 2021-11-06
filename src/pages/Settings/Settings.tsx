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
  WindowBehaviour,
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
import './styles.css';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../redux/user';
import { RootState } from '../../store';

interface IProps {
  items: IMenuItem[];
  userSettings: IUserSettings;
  handleRefresh: () => Promise<void>;
  handleDialog: (data: IDialog) => void;
}

const Settings = ({
  items,
  userSettings,
  handleRefresh,
  handleDialog,
}: IProps): React.ReactElement => {
  const [shouldRestart, setShouldRestart] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.user.settings);

  const presets = PresetService.fetch();

  const general: ISettingConfig[] = [
    {
      name: 'tutorial',
      value: 'tutorial',
      label: 'Tutorial Video',
      description: 'watch the application tutorial video',
      type: 'pop-up',
      CustomIcon: Info,
      // this.props.handleDialog({
      //   open: true,
      //   title: 'Tutorial Video',
      //   content: tutorial(),
      //   hideButtons: true,
      // }),
    },
    {
      name: 'visiblityKeybind',
      value: settings.visiblityKeybind,
      label: 'Visiblity Keybind',
      description: 'combination used to toggle the window’s visibility',
      type: 'pop-up',
      restart: true,
      // this.props.handleDialog({
      //   open: true,
      //   title: 'Visibility Keybind',
      //   content: visibilityKeybindSelect(
      //     this.state.visiblityKeybind,
      //     (v: string) =>
      //       this.handleUpdate('visiblityKeybind', v, false, true),
      //   ),
      //   hideButtons: true,
      //   disableEscKey: true,
      //   secondaryLabel: 'dismiss',
      // }),
    },
    {
      name: 'windowBehaviour',
      value: settings.windowBehaviour,
      label: 'Hyperlink Behaviour',
      description:
        'choose what happens when you open a hyperlink within Switch',
      type: 'pop-up',
      restart: true,
      // this.props.handleDialog({
      //   open: true,
      //   title: 'Hyperlink Behaviour',
      //   content: windowBehaviourSelect(
      //     this.state.windowBehaviour,
      //     (v: string) => {
      //       this.handleUpdate('windowBehaviour', v, true, true);
      //       this.props.handleDialog({
      //         open: false,
      //         hideButtons: true,
      //         title: '',
      //         content: '',
      //       });
      //     },
      //   ),
      //   hideButtons: true,
      // }),
    },
    {
      name: 'overlayMode',
      value: settings.overlayMode,
      label: 'Overlay mode',
      description: 'switch will display over other applications',
      type: 'switch',
      restart: true,
    },
    {
      name: 'modifiedAgent',
      value: settings.modifiedAgent,
      description:
        'fixes issues with chrome version compatibility on some applications',
      label: 'Modified user agent',
      type: 'switch',
    },
    {
      name: 'warningMessages',
      value: settings.warningMessages,
      label: 'Warning messages',
      description: 'display helpful messages when performing some actions',
      type: 'switch',
    },
  ];

  const appearance: ISettingConfig[] = [
    {
      name: 'fontFamily',
      value: settings.fontFamily,
      label: 'Font Family',
      description: 'change the font used for the application',
      type: 'pop-up',
      // this.props.handleDialog({
      //   open: true,
      //   title: 'Font Family',
      //   content: fontFamilySelect(this.state.fontFamily, (v: FontFamily) => {
      //     this.handleUpdate('fontFamily', v, true, false);
      //     this.props.handleDialog({
      //       open: false,
      //       hideButtons: true,
      //       title: '',
      //       content: '',
      //     });
      //   }),
      //   hideButtons: true,
      // }),
    },
    {
      name: 'accentColor',
      value: settings.accentColor,
      label: 'Accent Color',
      description: 'change the accent colour of the application',
      type: 'pop-up',
      // this.props.handleDialog({
      //   open: true,
      //   title: 'Accent Color',
      //   content: accentColorSelect((v: string) => {
      //     this.handleUpdate('accentColor', v, true, false);
      //     this.props.handleDialog({
      //       open: false,
      //       hideButtons: true,
      //       title: '',
      //       content: '',
      //     });
      //   }),
      //   hideButtons: true,
      // }),
    },
    {
      name: 'animatePresets',
      value: settings.animatePresets,
      label: 'Animate Presets',
      description: 'shows an animation when resizing windows with a preset',
      type: 'switch',
    },
    {
      name: 'windowPadding',
      value: settings.windowPadding,
      label: 'Window Padding',
      description: 'gives the window extra padding around the sides',
      type: 'switch',
      experimental: true,
    },
  ];

  return (
    <div className="settings-container">
      {shouldRestart && (
        <Paper className="d-flex flex-row justify-content-center mb-4 py-3 bg-secondary">
          <span className="text-danger text-center p-1">
            Some changes require the application to restart to take effect
          </span>
        </Paper>
      )}

      <Profile />

      <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;General</h4>
      <div className="setting-group bg-secondary">
        {general.map((v) => (
          <Setting
            {...v}
            key={`general-setting-${v.name}`}
            value={settings[v.name as keyof IUserSettings]}
          />
        ))}
      </div>

      <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;Appearance</h4>
      <div className="setting-group bg-secondary">
        {appearance.map((v) => (
          <Setting
            {...v}
            key={`appearance-setting-${v.name}`}
            value={settings[v.name as keyof IUserSettings]}
          />
        ))}
      </div>

      {/* preset settings */}
      <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;Presets</h4>
      <div className="setting-group bg-secondary">
        <div className="d-flex flex-row row">
          {presets.map((v) => (
            <Preset
              {...v}
              key={`preset-setting-${v.name}`}
              animate={settings.animatePresets}
              windowPadding={settings.windowPadding}
              handleRefresh={async () => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
