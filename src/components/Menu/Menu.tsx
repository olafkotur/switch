import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { IProps as IDialog } from '../Dialog/Dialog';
import { VisibilityOff, Search, Settings } from '@material-ui/icons';
import { IMenuItem, IUserSettings, WebViewAction } from '../../typings/d';
import { IconButton, Tooltip } from '@material-ui/core';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { ElectronService } from '../../services/electron';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { MenuService } from '../../services/menu';
import { UtilService } from '../../services/util';
import './menu.css';
import { hideWindowWarning } from '../Dialog/DialogContent';

interface IProps {
  page: TPages;
  items: IMenuItem[];
  focusedItem: IMenuItem | null;
  userSettings: IUserSettings;
  overlayMode: boolean;
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleRefresh: () => Promise<void>;
  handleActionRequest: (id: string, action: WebViewAction) => void;
  handleDialog: (data: IDialog) => void;
}

interface IState {
  items: IMenuItem[];
}

export default class Menu extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected temporaryItems: IMenuItem[] = [];

  /**
   * Menu constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      items: [...this.props.items],
    };

    // scope binding
    this.handleDragUpdate = this.handleDragUpdate.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
  }

  /**
   * Handles drag update
   * @param result - droppable result
   */
  protected async handleDragUpdate(result: DropResult): Promise<void> {
    if (result.destination) {
      this.temporaryItems = await MenuService.reorder(result.draggableId, result.destination.index);
    }
  }

  /**
   * Handles drag end
   */
  protected async handleDragEnd(): Promise<void> {
    this.setState({ items: [...this.temporaryItems] });
    const res = await MenuService.confirmReorder(this.temporaryItems);
    if (!res) {
      UtilService.error();
    }
  }

  /**
   * Handles visibility toggle
   */
  protected handleToggleVisibility(): void {
    if (!this.props.userSettings.warningMessages) {
      return ElectronService.toggleVisibility();
    }

    this.props.handleDialog({
      open: true,
      title: 'Hold on a second...',
      content: hideWindowWarning(this.props.userSettings.visiblityKeybind),
      handlePrimary: () => ElectronService.toggleVisibility(),
      handleSecondary: () => {},
    });
  }

  render() {
    return (
      <div className="vh-100">
        <div className="menu-top">
          {!this.props.overlayMode && <div className="mb-4" />}
          <div className="d-flex flex-column justify-content-center align-items-center">
            <DragDropContext
              onDragUpdate={this.handleDragUpdate}
              onDragEnd={this.handleDragEnd}
            >
              <Droppable droppableId="menu-droppable" >
                {provided => (
                  <div ref={provided.innerRef}>
                    {this.state.items.map((v, i) => (
                      <Draggable key={v.id} draggableId={v.id} index={i}>
                        {provided => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <MenuItem
                              data={v}
                              page={this.props.page}
                              focused={this.props.focusedItem && this.props.focusedItem.id === v.id ? true : false}
                              handleClick={this.props.handleClick}
                              handleRefresh={this.props.handleRefresh}
                              handleActionRequest={this.props.handleActionRequest}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </DragDropContext>
          </div>
        </div>

        <div className="menu-bottom">
          <div className="menu-actions d-flex flex-column justify-content-center align-items-center" >
            {this.props.overlayMode && <Tooltip title="Hide window" enterDelay={750}>
              <IconButton
                className="menu-item flex-column"
                onClick={this.handleToggleVisibility}
              >
                <VisibilityOff className="primary" fontSize="small" />
              </IconButton>
            </Tooltip>}

            <Tooltip title="Add new services" enterDelay={750}>
              <IconButton
                className={`menu-item flex-column ${this.props.page === 'search' ? 'menu-selected' : ''}`}
                onClick={() => this.props.handleClick('search')}
              >
                <Search className="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Access settings page" enterDelay={750}>
              <IconButton
                className={`menu-item flex-column ${this.props.page === 'settings' ? 'menu-selected' : ''}`}
                onClick={() => this.props.handleClick('settings')}
              >
                <Settings className="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
