import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { UtilService } from '../../services/util';
import { IPresetSetting } from '../../typings/d';

interface IProps extends IPresetSetting {
}

/**
 * DANGER: This class is under construction and should not be used in any case
 */
export default class Preset extends React.Component<IProps> {
  /**
   * Local properties
   */
  protected width: number;
  protected height: number;
  protected previewWidth: number;
  protected previewHeight: number;
  protected xOffset: number;
  protected yOffset: number;

  /**
   * Preset constructor
   */
  constructor(props: IProps) {
    super(props);

    const screenInfo = UtilService.getScreenInfo();
    const aspectRatio = screenInfo.width / screenInfo.height;
    console.log(aspectRatio);
    console.log(screenInfo);

    this.width = aspectRatio * 100;
    this.height = 100;

    const previewAspectRatio = this.props.width / this.props.height;
    this.previewWidth = previewAspectRatio * 100;
    console.log(this.props.width, this.props.height)
    this.previewHeight = 100;
  }

  render() {
    return (
      <div>
        <span className="primary">{this.props.width} * {this.props.height}</span>
        <Paper style={{ width: this.width, height: this.height, margin: 20 }}>
          <div
            className="bg-red position-absolute"
            style={{ width: this.previewWidth, height: this.previewHeight }}
          />
        </Paper>
      </div>
    );
  }
}
