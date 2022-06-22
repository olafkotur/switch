import { ButtonBase, Paper } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Stylesheet from 'reactjs-stylesheet'
import { PresetService } from '../../../services/preset'
import { RootState } from '../../../store'
import { IPreset } from '../../../typings/d'

interface IProps extends IPreset {}

export const Preset = ({
  name,
  width,
  height,
  xPosition,
  yPosition,
  preview,
}: IProps): React.ReactElement => {
  const [focused, setFocused] = React.useState<boolean>(false)

  const { settings } = useSelector((state: RootState) => state.user)

  /**
   * Handles set active preset
   */
  const handleActive = async (): Promise<void> => {
    await PresetService.active(
      width,
      height,
      xPosition,
      yPosition,
      settings.animatePresets,
      settings.windowPadding,
    )
  }

  const extraStyles = {
    width: `${preview.width}%`,
    height: `${preview.height}%`,
    marginLeft: `${preview.xOffset}%`,
    marginTop: `${preview.yOffset}%`,
  }

  return (
    <ButtonBase
      className="col-xl-3 col-lg-4 col-md-6 p-2"
      onClick={handleActive}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      <Paper
        className="d-flex p-1 bg-primary align-items-center w-100"
        style={styles.outer}
      >
        {focused && (
          <p className="primary position-absolute w-100 text-center">{name}</p>
        )}
        <div
          className="position-static"
          style={{ ...styles.inner, ...extraStyles }}
        />
      </Paper>
    </ButtonBase>
  )
}

const styles = Stylesheet.create({
  outer: {
    height: 100,
  },
  inner: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 4,
    borderStyle: 'dotted',
  },
})
