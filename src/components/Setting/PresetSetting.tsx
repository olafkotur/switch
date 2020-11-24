import React from 'react';
import { IPresetSetting, IWindowInfo } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { PresetService } from '../../services/preset';
import { UtilService } from '../../services/util';
import { DeleteOutline, RadioButtonChecked, RadioButtonUnchecked } from '@material-ui/icons';
import './setting.css';

interface IProps extends IPresetSetting {
  animate: boolean;
  handleRefresh: () => Promise<void>;
}

interface IState {
  active: boolean;
}

export default class PresetSetting extends React.Component<IProps, IState> {
  /**
   * PresetSetting constructor
   */
  constructor(props: IProps) {
    super(props);

    // state
    this.state = {
      active: this.isActive(),
    };

    // scope binding
    this.isActive = this.isActive.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * Component mount
   */
  public componentDidMount() {
    window.addEventListener('resize', () => this.setState({ active: this.isActive() }));
  }

  /**
   * Determine if the preset is active
   */
  protected isActive(): boolean {
    const windowInfo = UtilService.getWindowInfo();
    if (windowInfo.width === this.props.width
      && windowInfo.height === this.props.height
      && windowInfo.xPosition === this.props.xPosition
      && windowInfo.yPosition === this.props.yPosition
      ) {
      return true;
    }
    return false;
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
    this.setState({ active: this.isActive() });
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
          <Tooltip title={`${this.props.height} * ${this.props.width}`} enterDelay={750} className="p-1">
            <IconButton
              onClick={this.handleActive}
            >
              {this.state.active
                ? <RadioButtonChecked color="secondary" fontSize="small" />
                : <RadioButtonUnchecked color="secondary" fontSize="small"/>
              }
            </IconButton>
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
