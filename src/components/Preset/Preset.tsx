import { Box, ButtonBase, Paper } from '@material-ui/core';
import React from 'react';
import { PresetService } from '../../services/preset';
import { UtilService } from '../../services/util';
import { IPresetSetting } from '../../typings/d';
import './preset.css';

interface IProps extends IPresetSetting {
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
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  /**
   * Handles preset save
   * @param name - preset name
   * @param width - preset width
   * @param height - preset height
   */
  protected async handleSave(name: string, width: number, height: number, xPosition: number, yPosition: number): Promise<void> {
    const res = await PresetService.save(name, width, height, xPosition, yPosition);
    if (!res) {
      return UtilService.error();
    }
    this.props.handleRefresh(); // do not await
  }

  /**
   * Handles delete
   */
  protected async handleDelete(): Promise<void> {
    const res = await PresetService.delete(this.props.id);
    if (!res) {
      return UtilService.error();
    }
    this.props.handleRefresh(); // do not await
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
