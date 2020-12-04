import React from 'react';
import { IPresetSetting, IWindowInfo } from '../../typings/d';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { PresetService } from '../../services/preset';
import { UtilService } from '../../services/util';
import { DeleteOutline } from '@material-ui/icons';
import './setting.css';

interface IProps extends IPresetSetting {
  animate: boolean;
  handleRefresh: () => Promise<void>;
}

/**
 * @deprecated - no longer used in the application, replaced by the <Preset /> component
 * Not yet deleted as it contains logic that is not yet implemented in the above component
 */
export default class PresetSetting extends React.Component<IProps> {
  /**
   * PresetSetting constructor
   */
  constructor(props: IProps) {
    super(props);

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
      <div className="d-flex flex-row justify-content-between mt-2">
        <input
          disabled
          className="primary setting-editable-label"
          type="text"
          value={this.props.name}
        />
        <div className="d-flex flex-row">
          <Tooltip title={`${Math.round(this.props.width)} * ${Math.round(this.props.height)}`} enterDelay={750} >
            <Button
              variant="contained"
              className="setting-button"
              color="primary"
              onClick={this.handleActive}
            >
              <span className="primary setting-button-text">set</span>
            </Button>
          </Tooltip>

          {false && <Tooltip title="Delete service" enterDelay={750} className="align-self-center">
            <IconButton
              onClick={this.handleDelete}
            >
              <DeleteOutline color="error" />
            </IconButton>
          </Tooltip>}
        </div>
      </div>
    );
  }
}
