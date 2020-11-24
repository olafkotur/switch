import React from 'react';
import { IMenuItem } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { ImageSearch, DeleteOutline, ArrowDropDown, ArrowDropUp, Done, Clear } from '@material-ui/icons';
import { MenuService } from '../../services/menu';
import { UtilService } from '../../services/util';
import * as _ from 'lodash';
import './setting.css';

interface IProps extends IMenuItem {
  handleRefresh: () => Promise<void>;
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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
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
   * Handles service name edit
   * @param data - menu item data
   */
  protected async handleUpdate(data: IMenuItem): Promise<void> {
    const res = await MenuService.update(data);
    if (!res) {
      return UtilService.error();
    }
    this.props.handleRefresh(); // do not await
  }

  /**
   * Handles service deletion
   * @param id - service id
   */
  protected async handleDelete(): Promise<void> {
    const res = await MenuService.delete(this.props.id);
    if (!res) {
      return UtilService.error();
    }
    this.props.handleRefresh(); // do not await
  }

  /**
   * Handles service re-ordering
   * @param id - service id
   * @param direction - direction of travel
   */
  protected async handleOrder(id: string, direction: 'up' | 'down'): Promise<void> {
    const res = await MenuService.order(id, direction);
    if (!res) {
      return UtilService.error();
    }
    this.props.handleRefresh(); // do not await
  }

   /**
   * Handles upload
   * @param event - html input event
   */
  protected async handleUpload(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      await this.handleUpdate({
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
          <div className="d-flex flex-row">
            {this.state.isEditing
              ? <>
                <Tooltip title="Confirm" enterDelay={750} className="p-1 setting-confirm-edit" >
                  <IconButton
                    onClick={() => this.handleUpdate({
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
                    onClick={async () => await this.handleOrder(this.props.id, 'up')}
                  >
                    <ArrowDropUp color="secondary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move downwards" enterDelay={750} className="p-1">
                  <IconButton
                    onClick={async () => await this.handleOrder(this.props.id, 'down')}
                  >
                    <ArrowDropDown color="secondary" />
                  </IconButton>
                </Tooltip>
              </>}
          </div>

          <Tooltip title="Delete service" enterDelay={750} className="align-self-center">
            <IconButton
              onClick={this.handleDelete}
            >
              <DeleteOutline color="error" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}
