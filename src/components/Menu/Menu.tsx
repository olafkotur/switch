import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { VisibilityOff, Search, Settings, Image } from '@material-ui/icons';
import { IMenuItem, ISetting, WebViewAction } from '../../typings/d';
import { Button, Chip, IconButton, List, ListItem, RootRef, Tooltip } from '@material-ui/core';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { ElectronService } from '../../services/electron';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import './menu.css';

interface IProps {
  page: TPages;
  items: IMenuItem[];
  focusedItem: IMenuItem | null;
  userSettings: ISetting[];
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleRefresh: () => Promise<void>;
  handleActionRequest: (id: string, action: WebViewAction) => void;
}

interface IState {
  disabled: boolean;
}

export default class Menu extends React.Component<IProps, IState> {
  /**
   * Menu constructor
   * @props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      disabled: false,
    };
  }

  /**
   * Generates menu items
   */
  protected generateItems() {
    return this.props.items.map((v, i) => {
      return (
        <Draggable key={`menu-draggable-${i}`} draggableId={`menu-item-${i}`} index={i} >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
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
      );
    });
  }

  protected generateItemss() {
    return this.props.items.map((v, i) => {
      return (
        <Draggable key={`menu-draggable-${i}`} draggableId={`menu-item-${i}`} index={i} >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <span>Hello {i}</span>
            </div>
          )}
        </Draggable>
      );
    });
  }

  /**
   * Handles drag end
   */
  protected handleDragEnd(res: DropResult) {
    console.log('drag end');
  }

  render() {
    const showBetaStatus = (this.props.userSettings.find(v => v.name === 'showBetaStatus')?.value || '') === 'true';
    return (
      <div className="vh-100">
        <div className="menu-top">
          {showBetaStatus && <div className="d-flex justify-content-center mt-2">
            <Chip
              label="beta"
              size="small"
              className="menu-beta"
            />
          </div>}
          <div className="d-flex flex-column justify-content-center align-items-center">
            <DragDropContext onDragEnd={this.handleDragEnd} >
              <Droppable droppableId="menu-droppable">
                {provided => (
                  <div ref={provided.innerRef}>
                    {this.props.items.map((v, i) => (
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
          <div className="menu-actions d-flex flex-column justify-content-center align-items-center">
            <Tooltip title="Hide window" enterDelay={750}>
              <IconButton
                className="menu-item flex-column"
                onClick={() => ElectronService.toggleVisibility()}
              >
                <VisibilityOff className="primary" fontSize="small" />
              </IconButton>
            </Tooltip>

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
