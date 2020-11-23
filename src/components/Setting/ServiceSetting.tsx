import React from 'react';
import { IServiceSettingConfig } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { ImageSearch, DeleteOutline, ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import * as _ from 'lodash';
import './setting.css';

interface IProps extends IServiceSettingConfig {
  handleUpload: (id: string, file: File) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleOrder: (id: string, direction: 'up' | 'down') => Promise<void>;
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
      <div className="d-flex flex-row justify-content-between mt-2 setting-container">
        <div className="d-flex flex-row align-items-center">
          <IconButton
            className="mr-3 menu-image"
          >
            <Tooltip title="Upload a custom image">
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
            </Tooltip>
          </IconButton>
          <h5 className="primary setting-label">{this.props.label}</h5>
        </div>
        <div className="d-flex flex-row pl-4">
          {/* re-order */}
          <div className="d-flex flex-row">
            <Tooltip title="Move upwards" enterDelay={750} className="p-1">
              <IconButton
                onClick={async () => await this.props.handleOrder(this.props.id, 'up')}
              >
                <ArrowDropUp color="secondary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Move downwards" enterDelay={750} className="p-1">
              <IconButton
                onClick={async () => await this.props.handleOrder(this.props.id, 'down')}
              >
                <ArrowDropDown color="secondary" />
              </IconButton>
            </Tooltip>
          </div>

          {/* delete */}
          <Tooltip title="Delete service" enterDelay={750} className="align-self-center">
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
