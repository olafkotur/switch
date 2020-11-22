import React from 'react';
import { IServiceSettingConfig } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { ImageSearch, DeleteOutline } from '@material-ui/icons';
import './serviceSetting.css';

interface IProps extends IServiceSettingConfig {
  handleUpload: (id: string, file: File) => Promise<void>;
}

export default class ServiceSetting extends React.Component<IProps> {

  render() {
    return (
      <div className="d-flex flex-row justify-content-between mt-2">
        <div className="d-flex flex-row">
          <Tooltip title="Upload a custom image">
            <IconButton
              className="mr-2 menu-image"
            >
              <label htmlFor="file-upload" className="position-absolute">
                <input
                  id="file-upload"
                  className="d-none"
                  accept="image/*"
                  type="file"
                  onChange={e => e.target.files && this.props.handleUpload(this.props.id, e.target.files[0])}
                />
                {this.props.icon
                  ? <img src={this.props.icon} className="menu-image" />
                  : <ImageSearch color="secondary" />
                }
              </label>
            </IconButton>
          </Tooltip>
          <h5 className="primary service-setting-label">{this.props.label}</h5>
        </div>
        <div className="pl-4">
          <IconButton
            onClick={() => console.log('delete')}
          >
            <DeleteOutline color="error" />
          </IconButton>
        </div>
      </div>
    );
  }
}
