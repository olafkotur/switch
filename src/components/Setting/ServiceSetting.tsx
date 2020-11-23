import React from 'react';
import { IServiceSettingConfig } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { ImageSearch, DeleteOutline } from '@material-ui/icons';
import * as _ from 'lodash';
import './setting.css';

interface IProps extends IServiceSettingConfig {
  handleUpload: (id: string, file: File) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export default class ServiceSetting extends React.Component<IProps> {

  /**
   * ServiceSetting constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    // scope binding
    this.handleUpload = this.handleUpload.bind(this);
  }

  /**
   * Handles upload
   * @param event - html input event
   */
  protected async handleUpload(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      await this.props.handleUpload(this.props.id, event.target.files[0]);
    }
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between mt-2">
        <div className="d-flex flex-row">
          <Tooltip title="Upload a custom image">
            <IconButton
              className="mr-3 menu-image"
            >
              <label
                htmlFor={`file-upload-${this.props.id}`}
                className="position-absolute"
              >
                <input
                  id={`file-upload-${this.props.id}`}
                  className="d-none"
                  accept="image/*"
                  type="file"
                  onChange={this.handleUpload}
                />
                {this.props.icon
                  ? <img src={this.props.icon} className="setting-image" />
                  : <ImageSearch color="secondary" />
                }
              </label>
            </IconButton>
          </Tooltip>
          <h5 className="primary setting-label">{this.props.label}</h5>
        </div>
        <div className="pl-4">
          <Tooltip title="Delete service" enterDelay={750}>
            <IconButton
              onClick={async () => await this.props.handleDelete(this.props.id)}
            >
              <DeleteOutline color="error" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}
