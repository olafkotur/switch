import React from 'react';
import { ButtonBase, IconButton, Paper, Slide, Tooltip } from '@material-ui/core';
import { Image, Refresh, ArrowBack, ArrowForward, Delete, Publish } from '@material-ui/icons';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { IMenuItem, WebViewAction } from '../../typings/d';
import { MenuService } from '../../services/menu';
import { UtilService } from '../../services/util';
import './menuItem.css';

interface IProps {
  data: IMenuItem;
  page: TPages;
  focused: boolean;
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleRefresh: () => Promise<void>;
  handleActionRequest: (id: string, action: WebViewAction) => void;
}

interface IState {
  contextMenu: boolean;
}

export default class MenuItem extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected ref: React.RefObject<HTMLDivElement> = React.createRef();

  /**
   * MenuItem constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      contextMenu: false,
    };

    // scope binding
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * Component mounting
   */
  componentDidMount() {
    document.addEventListener('mousedown', (e) => {
      if (this.state.contextMenu && this.ref.current
        && !this.ref.current.contains(e.target as Node)
      ) {
        this.setState({ contextMenu: false });
      }
    });
  }

  /**
   * Handles context menu
   */
  protected handleContextMenu() {
    this.setState({ contextMenu: !this.state.contextMenu });
  }

  /**
   * Handles navigation actions
   * @param action - action request type
   */
  protected handleNavigate(action: WebViewAction) {
    this.props.handleActionRequest(this.props.data.id, action);
  }

  /**
   * Handles service deletion
   * @param id - service id
   */
  protected async handleDelete(): Promise<void> {
    const res = await MenuService.delete(this.props.data.id);
    if (!res) {
      return UtilService.error();
    }
    this.props.handleRefresh(); // do not await
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
   * Handles upload
   * @param event - html input event
   */
  protected async handleUpload(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      await this.handleUpdate({
        ...this.props.data,
        icon: event.target.files[0],
      });
    }
  }

  render() {
    return (
      <div className={`menu-item mt-2 ${this.props.page === 'web' && this.props.focused ? 'menu-item-selected' : ''}`} >
        <ButtonBase
          onClick={() => this.props.handleClick('web', this.props.data)}
          onContextMenu={this.handleContextMenu}
        >
          {this.props.data.icon
            ? <img className="menu-item-image" src={this.props.data.icon} />
            : <Image className="menu-item-image" color="secondary" />
          }
        </ButtonBase>
        <Slide
          in={this.state.contextMenu}
          direction="right"
          ref={this.ref}
        >
          <Paper className="d-flex flex-row position-absolute  bg-primary" elevation={10}>
            <IconButton className="menu-item-image align-self-center">
              <Tooltip title="Upload a custom image" className="menu-item-image-upload-hover">
                <label
                  htmlFor={`file-upload-${this.props.data.id}`}
                  className="position-absolute"
                >
                  <input
                    id={`file-upload-${this.props.data.id}`}
                    className="d-none"
                    accept="image/*"
                    type="file"
                    onChange={this.handleUpload}
                  />
                  {this.props.data.icon
                    ? <img src={this.props.data.icon} className="menu-item-image-upload" />
                    : <Publish color="secondary" className="menu-item-image-upload" />
                  }
                </label>
              </Tooltip>
            </IconButton>

            <IconButton onClick={() => this.handleNavigate('refresh')} className="ml-2 px-2">
              <Refresh fontSize="small" className="text-white-50" />
            </IconButton>

            <IconButton onClick={() => this.handleNavigate('back')} className="px-2">
              <ArrowBack fontSize="small" className="text-white-50" />
            </IconButton>

            <IconButton onClick={() => this.handleNavigate('forward')} className="px-2">
              <ArrowForward fontSize="small" className="text-white-50" />
            </IconButton>

            <IconButton onClick={this.handleDelete}>
              <Delete fontSize="small" color="error" />
            </IconButton>

          </Paper>
        </Slide>
      </div>
    );
  }
}
