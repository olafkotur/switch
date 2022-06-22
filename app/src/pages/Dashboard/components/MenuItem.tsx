import {
  ButtonBase,
  IconButton,
  Paper,
  Slide,
  Tooltip,
} from '@material-ui/core';
import {
  ArrowBack,
  ArrowForward,
  Delete,
  Image,
  Publish,
  Refresh,
} from '@material-ui/icons';
import React from 'react';
import Stylesheet from 'reactjs-stylesheet';
import { MenuService } from '../../../services/menu';
import { IMenuItem, WebViewAction } from '../../../typings/d';
import { TPages } from '../Dashboard';

interface IProps {
  data: IMenuItem;
  page: TPages;
  focused: boolean;
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleActionRequest: (id: string, action: WebViewAction) => void;
}

interface IState {
  contextMenu: boolean;
}

// TODO: refactor to React.FC
export class MenuItem extends React.Component<IProps, IState> {
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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  /**
   * Component mounting
   */
  componentDidMount() {
    document.addEventListener('mousedown', (e) => {
      if (
        this.state.contextMenu &&
        this.ref.current &&
        !this.ref.current.contains(e.target as Node)
      ) {
        this.setState({ contextMenu: false });
      }
    });
  }

  /**
   * Handles context menu
   */
  protected handleContextMenu() {
    this.props.handleClick('web', this.props.data);
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
    await MenuService.delete(this.props.data.id);
  }

  /**
   * Handles service data update
   * @param data - menu item data
   */
  protected async handleUpdate(data: IMenuItem): Promise<void> {
    await MenuService.update(data);
  }

  /**
   * Handles upload
   * @param event - html input event
   */
  protected async handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    if (event.target.files) {
      await this.handleUpdate({
        ...this.props.data,
        icon: event.target.files[0],
      });
    }
  }

  render() {
    const extraStyles =
      this.props.page === 'web' && this.props.focused ? styles.selected : {};
    return (
      <div className="mt-2" style={{ ...styles.container, ...extraStyles }}>
        <ButtonBase
          onClick={() => this.props.handleClick('web', this.props.data)}
          onContextMenu={this.handleContextMenu}
        >
          {this.props.data.icon ? (
            <img style={styles.img} src={this.props.data.icon} />
          ) : (
            <Image style={styles.img} color="secondary" />
          )}
        </ButtonBase>
        <Slide in={this.state.contextMenu} direction="right" ref={this.ref}>
          <Paper
            className="d-flex flex-row position-absolute  bg-primary"
            elevation={10}
          >
            <IconButton className="menu-item-image align-self-center">
              <Tooltip title="Upload a custom image" style={styles.uploadHover}>
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
                  {this.props.data.icon ? (
                    <img src={this.props.data.icon} style={styles.upload} />
                  ) : (
                    <Publish color="secondary" style={styles.upload} />
                  )}
                </label>
              </Tooltip>
            </IconButton>

            <IconButton
              onClick={() => this.handleNavigate('refresh')}
              className="ml-2 px-2"
            >
              <Refresh fontSize="small" className="text-white-50" />
            </IconButton>

            <IconButton
              onClick={() => this.handleNavigate('back')}
              className="px-2"
            >
              <ArrowBack fontSize="small" className="text-white-50" />
            </IconButton>

            <IconButton
              onClick={() => this.handleNavigate('forward')}
              className="px-2"
            >
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

const styles = Stylesheet.create({
  container: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  upload: {
    width: 30,
    height: 30,
    marginLeft: '0.5em',
  },
  uploadHover: {
    zIndex: 100,
  },
  selected: {
    backgroundColor: '#56585c',
    borderRadius: 10,
  },
});
