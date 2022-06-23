import { ButtonBase } from '@material-ui/core'
import React from 'react'
import Stylesheet from 'reactjs-stylesheet'
import { config } from '../../../config'
import { BORDER_RADIUS, EDGE_SPACING } from '../../../constants'
import { GITHUB_ICON } from '../../../icons'

export const Footer = (): React.ReactElement => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center my-5">
      <span
        className="primary bg-secondary py-1 px-2"
        style={styles.appVersion}
      >
        v{config.appVersion}
      </span>

      <ButtonBase
        className="ml-1"
        onClick={() => window.open(config.projectRepo)}
      >
        <img src={GITHUB_ICON} style={styles.github} />
      </ButtonBase>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    paddingTop: '5vh',
    width: '60vw',
  },
  group: {
    padding: EDGE_SPACING,
    borderRadius: BORDER_RADIUS,
  },
  appVersion: {
    borderRadius: BORDER_RADIUS,
    fontSize: 12,
  },
  github: {
    width: 20,
    height: 20,
  },
})
