import React from 'react';
import { IMenuItem, IServiceSetting } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { ImageSearch, DeleteOutline, ArrowDropDown, ArrowDropUp, Done, Clear } from '@material-ui/icons';
import * as _ from 'lodash';
import './setting.css';

interface IProps extends IServiceSetting {
  handleUpdate: (data: IMenuItem) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleOrder: (id: string, direction: 'up' | 'down') => Promise<void>;
}

interface IState {
  isEditing: boolean;
  label: string;
}

export default class ServiceSetting extends React.Component<IProps, IState> {

  /**
   * ServiceSetting constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    // state
    this.state = {
      isEditing: false,
      label: this.props.name,
    };

    // scope binding
    this.handleUpload = this.handleUpload.bind(this);
  }

  /**
   * Component update
   */
  public componentDidUpdate() {
    // hide editing confirmation
    if (this.state.label === this.props.name && this.state.isEditing) {
      this.setState({ isEditing: false });
    }
  }

  /**
   * Handles upload
   * @param event - html input event
   */
  protected async handleUpload(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      await this.props.handleUpdate({
        id: this.props.id,
        url: this.props.url,
        name: this.props.name,
        icon: event.target.files[0],
      });
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
          <input
            className="primary setting-editable-label"
            type="text"
            value={this.state.label}
            onChange={e => this.setState({ isEditing: true, label: e.target.value })}
          />
        </div>
        <div className="d-flex flex-row pl-4">
          {/* re-order */}
          <div className="d-flex flex-row">
            {this.state.isEditing
              ? <>
                <Tooltip title="Confirm" enterDelay={750} className="p-1 setting-confirm-edit" >
                  <IconButton
                    onClick={() => this.props.handleUpdate({
                      id: this.props.id,
                      url: this.props.url,
                      name: this.state.label,
                      icon: this.props.icon,
                    })}
                  >
                    <Done color="secondary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel" enterDelay={750} className="p-1 setting-confirm-edit" >
                  <IconButton
                    onClick={() => this.setState({ isEditing: false, label: this.props.name })}
                  >
                    <Clear color="secondary" />
                  </IconButton>
                </Tooltip>
              </>
              : <>
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
              </>}
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
