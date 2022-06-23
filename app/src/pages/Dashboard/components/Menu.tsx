import { IconButton, Tooltip } from '@material-ui/core'
import { Search, VisibilityOff } from '@material-ui/icons'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import Stylesheet from 'reactjs-stylesheet'
import { hideWindowWarning } from '../../../components/Dialog'
import { setApplications, setDialog } from '../../../redux/interface'
import { ElectronService } from '../../../services/electron'
import { MenuService } from '../../../services/menu'
import { RootState } from '../../../store'
import { IDialog, IMenuItem, WebViewAction } from '../../../typings/d'
import { IApplicationData } from '../../../typings/data'
import { TPages } from '../Dashboard'
import { MenuItem } from './MenuItem'

interface IProps {
  page: TPages
  items: IMenuItem[]
  focusedItem?: IMenuItem
  handleClick: (action: TPages, item?: IMenuItem) => void
  handleActionRequest: (id: string, action: WebViewAction) => void
}

export const Menu = ({
  page,
  focusedItem,
  handleClick,
  handleActionRequest,
}: IProps): React.ReactElement => {
  let tempItems: IApplicationData[] = []

  const dispatch = useDispatch()
  const { settings, profile } = useSelector((state: RootState) => state.user)
  const { applications } = useSelector((state: RootState) => state.interface)

  /**
   * Handles drag update
   * @param result - droppable result
   */
  const handleDragUpdate = async (result: DropResult): Promise<void> => {
    if (result.destination) {
      tempItems = await MenuService.reorder(
        result.draggableId,
        result.destination.index,
      )
    }
  }

  /**
   * Handles drag end
   */
  const handleDragEnd = async (): Promise<void> => {
    dispatch(setApplications(tempItems))
    await MenuService.confirmReorder(tempItems)
  }

  /**
   * Handles visibility toggle
   */
  const handleToggleVisibility = (): void => {
    if (!settings.warningMessages) {
      return ElectronService.toggleVisibility()
    }
    const dialog: IDialog = {
      open: true,
      hideSecondary: true,
      title: 'Hold on a second...',
      content: hideWindowWarning(settings.visiblityKeybind),
      handlePrimary: () => ElectronService.toggleVisibility(),
    }
    dispatch(setDialog(dialog))
  }

  return (
    <div className="vh-100" style={styles.container}>
      <div style={styles.top}>
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
                    <Draggable key={v._id} draggableId={v._id} index={i}>
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
                              focusedItem && focusedItem.id === v._id
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

      <div style={styles.bottom}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={styles.actions}
        >
          {settings.overlayMode && (
            <Tooltip title="Hide window" enterDelay={750}>
              <IconButton
                className="flex-column"
                style={styles.item}
                onClick={handleToggleVisibility}
              >
                <VisibilityOff className="primary" fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Add new applications" enterDelay={750}>
            <IconButton
              className="flex-column"
              style={{
                ...styles.item,
                ...(page === 'search' ? styles.selected : {}),
              }}
              onClick={() => handleClick('search')}
            >
              <Search className="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Access settings page" enterDelay={750}>
            <IconButton
              className="flex-column"
              style={{
                ...styles.item,
                ...(page === 'settings' ? styles.selected : {}),
              }}
              onClick={() => handleClick('settings')}
            >
              <img src={profile.avatar} style={styles.avatar} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    width: 50,
    height: '100vh',
    position: 'sticky',
    zIndex: 10,
  },
  top: {
    height: '85%',
    overflowY: 'scroll',
  },
  bottom: {
    height: '15%',
  },
  actions: {
    width: '100%',
    bottom: 0,
    paddingBottom: 10,
    position: 'absolute',
    backgroundColor: '#1f2225',
  },
  item: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#56585c',
    borderRadius: 10,
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
})
