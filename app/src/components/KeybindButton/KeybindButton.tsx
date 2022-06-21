import { Button, Paper, Tooltip } from '@material-ui/core';
import React from 'react';
import { SettingsService } from '../../services/settings';
import './styles.css';

interface IProps {
  keybind: string;
  handleUpdate: (value: string) => void;
}

interface IState {
  recording: boolean;
  changed: boolean;
  keyBinds: string[];
}

export class KeybindButton extends React.Component<IProps, IState> {
  /**
   * KeybindButton constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      recording: false,
      changed: false,
      keyBinds: [],
    };

    // scope binding
    this.handleClick = this.handleClick.bind(this);
    this.handleRecord = this.handleRecord.bind(this);
    this.formatKeybinds = this.formatKeybinds.bind(this);
  }

  /**
   * Component update
   * @param _prevProps - previous properties
   * @param prevState - previous state
   */
  public componentDidUpdate(_prevProps: IProps, prevState: IState) {
    if (prevState.recording !== this.state.recording) {
      this.state.recording
        ? document.addEventListener('keydown', this.handleRecord)
        : document.removeEventListener('keydown', this.handleRecord);
    }
  }

  /**
   * Handles click event
   */
  protected handleClick(): void {
    if (!this.state.recording) {
      this.setState({ recording: true, keyBinds: [] });
    }
  }

  /**
   * Handles keybind recording
   * @param e - keyboard event
   */
  protected async handleRecord(e: KeyboardEvent): Promise<void> {
    e.preventDefault();

    // validate key binding
    const value = SettingsService.validateKey(e.key);
    if (value) {
      if (this.state.keyBinds.length && this.state.keyBinds[0] === value) {
        return;
      }
      this.setState({ keyBinds: [...this.state.keyBinds, value] });
    }

    // stop recording after 2 keys
    if (this.state.keyBinds.length >= 2) {
      this.props.handleUpdate(this.formatKeybinds());
      this.setState({ recording: false, changed: true });
    }
  }

  /**
   * Formats keybinds
   */
  protected formatKeybinds(): string {
    let formatted = '...';
    formatted = this.state.keyBinds[0] ? this.state.keyBinds[0] : formatted;
    formatted = this.state.keyBinds[1]
      ? `${formatted} + ${this.state.keyBinds[1]}`
      : formatted;
    return formatted;
  }

  render() {
    return (
      <div className="d-flex flex-row row justify-content-between mx-1">
        <Paper
          variant="outlined"
          className="d-flex align-items-center px-3 py-2 keybind-text"
        >
          {this.state.changed ? this.formatKeybinds() : this.props.keybind}
        </Paper>
        <Button
          variant="contained"
          className={`${
            this.state.recording ? 'bg-error' : ''
          } py-2 primary keybind-button`}
          color="primary"
          onClick={this.handleClick}
        >
          <Tooltip
            title={`Currently set to ${
              this.state.changed ? this.formatKeybinds() : this.props.keybind
            }`}
          >
            <span>record keybind</span>
          </Tooltip>
        </Button>
      </div>
    );
  }
}
