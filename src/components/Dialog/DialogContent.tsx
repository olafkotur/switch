import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { accentColors } from '../../imports/customUI';
import './dialog.css';

/**
 * Trigerred when there is an update available to download.
 */
export const updateAvailable = () => (
  <div>
    <span>We've downloaded an update for you in the background, it's available to <code>install</code> whenever you're ready.</span>
    <br/><br/>
    <span>Please <code>re-launch</code> the application after clicking install.</span>
    <br/><br/>
    <span>You can choose to ignore it, it will simply be applied the next time you re-launch the application.</span>
  </div>
);

/**
 * Trigerred when a user attempts to hide the window using the button in the UI.
 * @param visiblityKeybind - current keybind to recall window
 */
export const hideWindowWarning = (visiblityKeybind: string) => (
  <div>
    <span>You're about to hide Switch from your desktop, you can bring the window back at anytime using the key <code>{visiblityKeybind}</code> combination.</span>
    <br/><br/>
    <span>Feel free to disable this message from the settings page.</span>
  </div>
);

/**
 * Triggered when user attempts to change the accent color.
 * @param setAccentColor - handler for set accent color
 */
export const accentColorSelect = (setAccentColor: (color: string) => void) => (
  <div>
    <span>Please choose an <code>accent color</code> from the following options. You can also just click away to cancel.</span>
    <br/>
    <div className="d-flex flex-row row justify-content-center">
      { accentColors.map(v => (
        <ButtonBase
          key={`dialog-accent-color-${v}`}
          className="d-flex justify-content-center align-items-center dialog-accent-color"
          style={{ backgroundColor: v }}
          onClick={() => setAccentColor(v)}
        >
          <span>{v.toLowerCase()}</span>
        </ButtonBase>
      )) }
    </div>
    <br/>
    <span>Note that you will have to <code>restart</code> the application to see any changes.</span>
  </div>
);
