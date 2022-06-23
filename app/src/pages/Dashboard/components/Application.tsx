import {
  ButtonBase,
  IconButton,
  Paper,
  Slide,
  Tooltip,
} from '@material-ui/core'
import {
  ArrowBack,
  ArrowForward,
  Delete,
  Image,
  Publish,
  Refresh,
} from '@material-ui/icons'
import React from 'react'
import Stylesheet from 'reactjs-stylesheet'
import { ApplicationService } from '../../../services/application'
import { UtilService } from '../../../services/util'
import { WebViewAction } from '../../../typings/d'
import { IApplicationData } from '../../../typings/data'
import { TPages } from '../Dashboard'

interface Props {
  data: IApplicationData
  page: TPages
  selected: boolean
  handleClick: (action: TPages, data?: IApplicationData) => void
  handleActionRequest: (id: string, action: WebViewAction) => void
}

export const Application = ({
  data,
  page,
  selected,
  handleClick,
  handleActionRequest,
}: Props): React.ReactElement => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const ref: React.RefObject<HTMLDivElement> = React.createRef()

  React.useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (
        isExpanded &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setIsExpanded(false)
      }
    })
  }, [isExpanded])

  /**
   * Handles context menu
   */
  const handleContextMenu = (): void => {
    handleClick('web', data)
    setIsExpanded(!isExpanded)
  }

  /**
   * Handles navigation actions
   * @param action - action request type
   */
  const handleNavigate = (action: WebViewAction): void => {
    handleActionRequest(data._id, action)
  }

  /**
   * Handles service deletion
   * @param id - service id
   */
  const handleDelete = async (): Promise<void> => {
    await ApplicationService.delete(data._id)
  }

  /**
   * Handles service data update
   * @param data - app data
   */
  const handleUpdate = async (data: IApplicationData): Promise<void> => {
    await ApplicationService.update([data])
  }

  /**
   * Handles upload
   * @param event - html input event
   */
  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (event.target.files) {
      const icon = await UtilService.imgBase64(event.target.files[0])
      await handleUpdate({ ...data, icon })
    }
  }

  const extraStyles = page === 'web' && selected ? styles.selected : {}
  console.log({ page, selected })

  return (
    <div className="mt-2" style={{ ...styles.container, ...extraStyles }}>
      <ButtonBase
        onClick={() => handleClick('web', data)}
        onContextMenu={handleContextMenu}
      >
        {data.icon ? (
          <img style={styles.img} src={data.icon} />
        ) : (
          <Image style={styles.img} color="secondary" />
        )}
      </ButtonBase>
      <Slide in={isExpanded} direction="right" ref={ref}>
        <Paper
          className="d-flex flex-row position-absolute  bg-primary"
          elevation={10}
        >
          <IconButton className="menu-item-image align-self-center">
            <Tooltip title="Upload a custom image" style={styles.uploadHover}>
              <label
                htmlFor={`file-upload-${data._id}`}
                className="position-absolute"
              >
                <input
                  id={`file-upload-${data._id}`}
                  className="d-none"
                  accept="image/*"
                  type="file"
                  onChange={handleUpload}
                />
                {data.icon ? (
                  <img src={data.icon} style={styles.upload} />
                ) : (
                  <Publish color="secondary" style={styles.upload} />
                )}
              </label>
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => handleNavigate('refresh')}
            className="ml-2 px-2"
          >
            <Refresh fontSize="small" className="text-white-50" />
          </IconButton>

          <IconButton onClick={() => handleNavigate('back')} className="px-2">
            <ArrowBack fontSize="small" className="text-white-50" />
          </IconButton>

          <IconButton
            onClick={() => handleNavigate('forward')}
            className="px-2"
          >
            <ArrowForward fontSize="small" className="text-white-50" />
          </IconButton>

          <IconButton onClick={handleDelete}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </Paper>
      </Slide>
    </div>
  )
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
})
