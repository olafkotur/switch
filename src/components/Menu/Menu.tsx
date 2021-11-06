import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { IDialog, IMenuItem, WebViewAction } from '../../typings/d';
import React from 'react';
import MenuItem from './MenuItem';
import { VisibilityOff, Search, Settings } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { TPages } from '../../pages/Dashboard/Dashboard';
import { ElectronService } from '../../services/electron';
import { MenuService } from '../../services/menu';
import { hideWindowWarning } from '../Dialog/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setApplications, setDialog } from '../../redux/interface';
import './styles.css';

interface IProps {
  page: TPages;
  items: IMenuItem[];
  focusedItem: IMenuItem | null;
  handleClick: (action: TPages, item?: IMenuItem) => void;
  handleActionRequest: (id: string, action: WebViewAction) => void;
}

const Menu = ({
  page,
  focusedItem,
  handleClick,
  handleActionRequest,
}: IProps): React.ReactElement => {
  let tempItems: IMenuItem[] = [];

  const dispatch = useDispatch();
  const { settings, avatar } = useSelector((state: RootState) => state.user);
  const { applications } = useSelector((state: RootState) => state.interface);

  /**
   * Handles drag update
   * @param result - droppable result
   */
  const handleDragUpdate = async (result: DropResult): Promise<void> => {
    if (result.destination) {
      tempItems = await MenuService.reorder(
        result.draggableId,
        result.destination.index,
      );
    }
  };

  /**
   * Handles drag end
   */
  const handleDragEnd = async (): Promise<void> => {
    dispatch(setApplications(tempItems));
    await MenuService.confirmReorder(tempItems);
  };

  /**
   * Handles visibility toggle
   */
  const handleToggleVisibility = (): void => {
    if (settings.warningMessages) {
      const dialog: IDialog = {
        open: true,
        title: 'Hold on a second...',
        content: hideWindowWarning(settings.visiblityKeybind),
        handlePrimary: () => ElectronService.toggleVisibility(),
      };
      dispatch(setDialog(dialog));
    }
    return ElectronService.toggleVisibility();
  };

  return (
    <div className="vh-100">
      <div className="menu-top">
        {!settings.overlayMode && <div className="mb-4" />}

        {/* drag and drop */}
        <div className="d-flex flex-column justify-content-center align-items-center">
          <DragDropContext
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
          >
            <Droppable droppableId="menu-droppable">
              {(provided) => (
                <div ref={provided.innerRef}>
                  {applications.map((v, i) => (
                    <Draggable key={v.id} draggableId={v.id} index={i}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <MenuItem
                            data={v}
                            page={page}
                            focused={
                              focusedItem && focusedItem.id === v.id
                                ? true
                                : false
                            }
                            handleClick={handleClick}
                            handleActionRequest={handleActionRequest}
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
          {settings.overlayMode && (
            <Tooltip title="Hide window" enterDelay={750}>
              <IconButton
                className="menu-item flex-column"
                onClick={handleToggleVisibility}
              >
                <VisibilityOff className="primary" fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Add new applications" enterDelay={750}>
            <IconButton
              className={`menu-item flex-column ${
                page === 'search' ? 'menu-selected' : ''
              }`}
              onClick={() => handleClick('search')}
            >
              <Search className="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Access settings page" enterDelay={750}>
            <IconButton
              className={`menu-item flex-column ${
                page === 'settings' ? 'menu-selected' : ''
              }`}
              onClick={() => handleClick('settings')}
            >
              <img src={avatar} className="menu-avatar" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Menu;
