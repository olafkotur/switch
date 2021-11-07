import React from 'react';
import Preset from '../../components/Preset/Preset';
import Setting from '../../components/Setting/Setting';
import { Info } from '@material-ui/icons';
import {
  ISettingConfig,
  IUserSettings,
  FontFamily,
  IDialog,
} from '../../typings/d';
import { Paper } from '@material-ui/core';
import { PresetService } from '../../services/preset';
import {
  visibilityKeybindSelect,
  windowBehaviourSelect,
  accentColorSelect,
  fontFamilySelect,
  tutorial,
} from '../../components/Dialog/DialogContent';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../redux/user';
import { RootState } from '../../store';
import { setDialog } from '../../redux/interface';
import './styles.css';

const Settings = (): React.ReactElement => {
  const [shouldRestart, setShouldRestart] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state.user);

  /**
   * Default change handler applied to all settings.
   * @param name - name of the setting
   * @param value - value of the setting
   */
  const handleChange = (name: string, value: boolean | string): void => {
    const settingsWithRestart = [
      'overlayMode',
      'windowBehaviour',
      'visiblityKeybind',
    ];
    console.log({ name, value });
    settingsWithRestart.includes(name) && setShouldRestart(true);
    dispatch(setSettings({ ...settings, [name]: value }));
  };

  const presets = PresetService.fetch();
  const general: ISettingConfig[] = [
    {
      name: 'tutorial',
      value: 'tutorial',
      label: 'Tutorial Video',
      description: 'watch the application tutorial video',
      type: 'pop-up',
      CustomIcon: Info,
      customHandler: () => {
        const dialog: IDialog = {
          open: true,
          title: 'Tutorial Video',
          hideButtons: true,
          content: tutorial(),
        };
        dispatch(setDialog(dialog));
      },
    },
    {
      name: 'visiblityKeybind',
      value: settings.visiblityKeybind,
      label: 'Visiblity Keybind',
      description: 'combination used to toggle the window’s visibility',
      type: 'pop-up',
      customHandler: () => {
        const dialog: IDialog = {
          open: true,
          title: 'Visiblity Keybind',
          hideButtons: true,
          disableEscKey: true,
          secondaryLabel: 'Dismiss',
          content: visibilityKeybindSelect(
            settings.visiblityKeybind,
            (v: string) => {
              handleChange('visiblityKeybind', v);
            },
          ),
        };
        dispatch(setDialog(dialog));
      },
    },
    {
      name: 'windowBehaviour',
      value: settings.windowBehaviour,
      label: 'Hyperlink Behaviour',
      description:
        'choose what happens when you open a hyperlink within Switch',
      type: 'pop-up',
      customHandler: () => {
        const dialog: IDialog = {
          open: true,
          title: 'Hyperlink Behaviour',
          hideButtons: true,
          content: windowBehaviourSelect(
            settings.accentColor,
            settings.windowBehaviour,
            (v: string) => {
              handleChange('windowBehaviour', v);
              dispatch(setDialog(null));
            },
          ),
        };
        dispatch(setDialog(dialog));
      },
    },
    {
      name: 'overlayMode',
      value: settings.overlayMode,
      label: 'Overlay mode',
      description: 'switch will display over other applications',
      type: 'switch',
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
      customHandler: () => {
        const dialog: IDialog = {
          open: true,
          title: 'Font Family',
          hideButtons: true,
          content: fontFamilySelect(
            settings.accentColor,
            settings.fontFamily,
            (v: FontFamily) => {
              handleChange('fontFamily', v);
              dispatch(setDialog(null));
            },
          ),
        };
        dispatch(setDialog(dialog));
      },
    },
    {
      name: 'accentColor',
      value: settings.accentColor,
      label: 'Accent Color',
      description: 'change the accent colour of the application',
      type: 'pop-up',
      customHandler: () => {
        const dialog: IDialog = {
          open: true,
          title: 'Accent Color',
          hideButtons: true,
          content: accentColorSelect((v: string) => {
            handleChange('accentColor', v);
            dispatch(setDialog(null));
          }),
        };
        dispatch(setDialog(dialog));
      },
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
            handleChange={handleChange}
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
            handleChange={handleChange}
          />
        ))}
      </div>

      <h4 className="primary font-weight-bold mt-5">&nbsp;&nbsp;Presets</h4>
      <div className="setting-group bg-secondary">
        <div className="d-flex flex-row row">
          {presets.map((v) => (
            <Preset {...v} key={`preset-setting-${v.name}`} />
          ))}
        </div>
      </div>

      <div className="setting-footer" />
    </div>
  );
};

export default Settings;
