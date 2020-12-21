import { ButtonBase, Paper } from '@material-ui/core';
import React from 'react';
import { PresetService } from '../../services/preset';
import { IPreset } from '../../typings/d';
import './preset.css';

interface IProps extends IPreset {
  animate: boolean;
  handleRefresh: () => Promise<void>;
}

interface IState {
  focused: boolean;
}

export default class Preset extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected options: object;

  /**
   * Preset constructor
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      focused: false,
    };

    // local properties
    this.options = {
      width: `${this.props.preview.width}%`,
      height: `${this.props.preview.height}%`,
      marginLeft: `${this.props.preview.xOffset}%`,
      marginTop: `${this.props.preview.yOffset}%`,
    };

    // scope binding
    this.handleActive = this.handleActive.bind(this);
  }

  /**
   * Handles set active preset
   */
  protected async handleActive(): Promise<void> {
    await PresetService.active(
      this.props.width,
      this.props.height,
      this.props.xPosition,
      this.props.yPosition,
      this.props.animate,
    );
  }

  render() {
    return (
      <ButtonBase
        className="m-2"
        onClick={this.handleActive}
        onMouseEnter={() => this.setState({ focused: true })}
        onMouseLeave={() => this.setState({ focused: false })}
      >
        <Paper className="d-flex preset-outer p-1 bg-secondary align-items-center" >
          {this.state.focused && <p className="primary position-absolute w-100 text-center">{this.props.name}</p>}
          <div
            className="position-static preset-inner"
            style={{ ...this.options }}
          />
        </Paper>
      </ButtonBase>
    );
  }
}
