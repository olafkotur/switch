import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import KeybindButton from '../KeybindButton/KeybindButton';
import { accentColors } from '../../imports/customUI';
import { FontFamily, WindowBehaviour } from '../../typings/d';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './dialog.css';

/**
 * Tutorial content, triggered by the tutorial button and on first launch
 */
export const tutorial = () => <div></div>;

/**
 * Trigerred when a user attempts to hide the window using the button in the UI.
 * @param visiblityKeybind - current keybind to recall window
 */
export const hideWindowWarning = (visiblityKeybind: string) => (
  <div>
    <span>
      You're about to hide Switch from your desktop, you can bring the window
      back at anytime using the key <code>{visiblityKeybind}</code> combination.
    </span>
    <br />
    <br />
    <span>Feel free to disable this message from the settings page.</span>
  </div>
);

/**
 * Triggered when user attempts to change the visibility keybind.
 * @param initialValue - initial visibility keybind value
 * @param setVisibilityKeybind - handler to set visibility keybind
 */
export const visibilityKeybindSelect = (
  initialValue: string,
  setVisibilityKeybind: (value: string) => void,
) => (
  <div>
    <span>
      Please record a new <code>visibility keybind</code>, you must include{' '}
      <code>two</code> characters.
    </span>
    <br />
    <div className="my-3">
      <KeybindButton
        keybind={initialValue}
        handleUpdate={(v) => setVisibilityKeybind(v)}
      />
    </div>
    <span>
      Note that you will have to <code>restart</code> the application to see any
      changes.
    </span>
  </div>
);

/**
 * Triggered when user attempts to change the window behaviour.
 * @param initialValue - initial window behaviour value
 * @param setWindowBehaviour - handler to set window behaviour
 */
export const windowBehaviourSelect = (
  initialValue: WindowBehaviour,
  setWindowBehaviour: (value: WindowBehaviour) => void,
) => (
  <div>
    <span>
      Please choose a <code>hyperlink behaviour</code> from the following
      options.
    </span>
    <br />
    <div className="my-3">
      <FormControl variant="outlined" className="w-100">
        <Select
          id="window-behaviour-select"
          className="dialog-window-behaviour"
          value={initialValue}
          onChange={(e) =>
            setWindowBehaviour(e.target.value as WindowBehaviour)
          }
        >
          <MenuItem value="external">Open in default browser</MenuItem>
          <MenuItem value="window">Open a new window</MenuItem>
          <MenuItem value="within">Create a new Switch tab</MenuItem>
        </Select>
      </FormControl>
    </div>
    <span>
      Note that you will have to <code>restart</code> the application to see any
      changes.
    </span>
  </div>
);

/**
 * Triggered when user attempts to change the accent color.
 * @param setAccentColor - handler to set accent color
 */
export const accentColorSelect = (setAccentColor: (color: string) => void) => (
  <div>
    <span>
      Please choose an <code>accent color</code> from the following options.
    </span>
    <br />
    <div className="d-flex flex-row row justify-content-center">
      {accentColors.map((v) => (
        <ButtonBase
          key={`dialog-accent-color-${v}`}
          className="d-flex justify-content-center align-items-center dialog-accent-color"
          style={{ backgroundColor: v }}
          onClick={() => setAccentColor(v)}
        >
          <span>{v.toLowerCase()}</span>
        </ButtonBase>
      ))}
    </div>
    <br />
    <span>
      Note that you will have to <code>restart</code> the application to see any
      changes.
    </span>
  </div>
);

/**
 * Triggerred when user attempts to change the font family.
 * @param initialValue - initial font family value
 * @param setFontFamily - handler to set font family
 */
export const fontFamilySelect = (
  initialValue: FontFamily,
  setFontFamily: (value: FontFamily) => void,
) => (
  <div>
    <span>
      Please choose a <code>font family</code> from the following options.
    </span>
    <br />
    <div className="my-3">
      <FormControl variant="outlined" className="w-100">
        <Select
          id="font-family-select"
          className="dialog-window-behaviour"
          value={initialValue}
          onChange={(e) => setFontFamily(e.target.value as FontFamily)}
        >
          <MenuItem value="Arial" style={{ fontFamily: 'Arial' }}>
            Arial
          </MenuItem>
          <MenuItem value="Verdana" style={{ fontFamily: 'Verdana' }}>
            Verdana
          </MenuItem>
          <MenuItem value="Helvetica" style={{ fontFamily: 'Helvetica' }}>
            Helvetica
          </MenuItem>
          <MenuItem value="Courier New" style={{ fontFamily: 'Courier New' }}>
            Courier New
          </MenuItem>
          <MenuItem
            value="Times New Roman"
            style={{ fontFamily: 'Times New Roman' }}
          >
            Times New Roman
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  </div>
);
