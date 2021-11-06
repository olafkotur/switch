import React from 'react';
import { SettingsService } from '../../services/settings';
import { Button, Paper, Tooltip } from '@material-ui/core';
import './keybindButton.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface IProps {
  handleUpdate: (value: string) => void;
}

// TODO: Come back to this, something isn't right with the keyboard events
const KeybindButton = ({ handleUpdate }: IProps): React.ReactElement => {
  const [key, setKey] = React.useState<string>('');
  const [keyBinds, setKeyBinds] = React.useState<string[]>(['s']);
  const [changed, setChanged] = React.useState<boolean>(false);
  const [recording, setRecording] = React.useState<boolean>(false);

  const { settings } = useSelector((state: RootState) => state.user);

  // React.useEffect(() => {
  //   setKeyBinds([...keyBinds, key]);
  //   console.log({keyBinds, key})
  //   if (keyBinds.length >= 2) {
  //     setRecording(false);
  //     setChanged(true);
  //     handleUpdate(formatKeybinds());
  //     document.removeEventListener('keydown', handleEvent);
  //   }
  // }, [key]);

  const handleEvent = (e: KeyboardEvent): void => {
    e.preventDefault();
    const value = SettingsService.validateKey(e.key);
    if (!value) {
      return;
    }

    const newBinds = [...keyBinds, value];
    if (newBinds.length >= 2) {
      setRecording(false);
      setChanged(true);
      document.removeEventListener('keydown', handleEvent);
    }
    console.log({ newBinds, keyBinds, value });
    setKeyBinds(newBinds);
  };

  /**
   * Handles click event
   */
  const handleClick = (): void => {
    if (!recording) {
      setRecording(true);
      setKeyBinds([]);
      document.addEventListener('keydown', handleEvent);
    }
  };

  /**
   * Formats keybinds
   */
  const formatKeybinds = (): string => {
    let formatted = '...';
    formatted = keyBinds[0] ? keyBinds[0] : formatted;
    formatted = keyBinds[1] ? `${formatted} + ${keyBinds[1]}` : formatted;
    return formatted;
  };

  return (
    <div className="d-flex flex-row row justify-content-between mx-1">
      <Paper
        variant="outlined"
        className="d-flex align-items-center px-3 py-2 keybind-button-text"
      >
        {changed ? formatKeybinds() : settings.visiblityKeybind}
      </Paper>
      <Button
        variant="contained"
        className={`setting-button ${recording ? 'bg-error' : 'primary'} py-2`}
        color="primary"
        onClick={handleClick}
      >
        <Tooltip
          title={`Currently set to ${
            changed ? formatKeybinds() : settings.visiblityKeybind
          }`}
        >
          <span className="setting-button-text">record keybind</span>
        </Tooltip>
      </Button>
    </div>
  );
};

export default KeybindButton;
