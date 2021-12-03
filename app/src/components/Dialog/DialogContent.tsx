import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import KeybindButton from '../KeybindButton/KeybindButton';
import {
  accentColors,
  fontFamilies,
  windowBehaviours,
} from '../../imports/customUI';
import { FontFamily, WindowBehaviour } from '../../typings/user';
import './dialog.css';

/**
 * Tutorial content, triggered by the tutorial button.
 */
export const tutorial = () => (
  <div>
    <iframe
      width="100%"
      height="310px"
      frameBorder="0"
      src="https://www.youtube.com/embed/8UVNT4wvIGY?autoplay=1"
      allow="autoplay"
    />
  </div>
);

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
      <code>two</code> characters. You will have to <code>restart</code> the
      application to see any changes.
    </span>
    <br />
    <div className="my-3">
      <KeybindButton
        keybind={initialValue}
        handleUpdate={(v) => setVisibilityKeybind(v)}
      />
    </div>
  </div>
);

/**
 * Triggered when user attempts to change the window behaviour.
 * @param accentColor - current accent color
 * @param initialValue - initial window behaviour value
 * @param setWindowBehaviour - handler to set window behaviour
 */
export const windowBehaviourSelect = (
  accentColor: string,
  initialValue: WindowBehaviour,
  setWindowBehaviour: (value: WindowBehaviour) => void,
) => (
  <div className="row justify-content-center">
    {windowBehaviours.map((v) => (
      <ButtonBase
        key={`dialog-select-box-${v.label}`}
        className="d-flex justify-content-center align-items-center dialog-window-behaviour"
        style={{
          background: v.value === initialValue ? accentColor : '#1f2225',
        }}
        onClick={() => setWindowBehaviour(v.value)}
      >
        <span>{v.label}</span>
      </ButtonBase>
    ))}
  </div>
);

/**
 * Triggered when user attempts to change the accent color.
 * @param setAccentColor - handler to set accent color
 */
export const accentColorSelect = (setAccentColor: (color: string) => void) => (
  <div className="row justify-content-center">
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
);

/**
 * Triggerred when user attempts to change the font family.
 * @param accentColor - current accent color
 * @param initialValue - initial font family value
 * @param setFontFamily - handler to set font family
 */
export const fontFamilySelect = (
  accentColor: string,
  initialValue: FontFamily,
  setFontFamily: (value: FontFamily) => void,
) => (
  <div className="row justify-content-center">
    {fontFamilies.map((v) => (
      <ButtonBase
        key={`dialog-accent-color-${v}`}
        className="d-flex justify-content-center align-items-center dialog-font-family"
        style={{ background: v === initialValue ? accentColor : '#1f2225' }}
        onClick={() => setFontFamily(v)}
      >
        <span style={{ fontFamily: v, padding: 5 }}>{v.toLowerCase()}</span>
      </ButtonBase>
    ))}
  </div>
);

export const login = () => {
  <div>Login</div>;
};

export const register = () => {
  <div>Register</div>;
};
