import { IconButton, Tooltip } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stylesheet from 'reactjs-stylesheet'
import { UserService } from '../../../services/user'
import { RootState } from '../../../store'

export const Profile = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { auth, profile } = useSelector((state: RootState) => state.user)

  const handleLogout = async (): Promise<void> => {
    await UserService.logout(dispatch)
  }

  /**
   * Render profile row.
   * @param label - row label
   * @param value - row value
   */
  const renderRow = (label: string, value: string): React.ReactElement => {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center mb-2">
        <div>
          <span className="primary align-self-center">{label}</span>
          <br />
          <span className="text-muted">{value}</span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center"></div>
      </div>
    )
  }

  return (
    <div className="bg-secondary" style={styles.container}>
      <div className="d-flex justify-content-end">
        <Tooltip title="Logout">
          <IconButton className="p-0 m-0" onClick={handleLogout}>
            <ExitToApp className="secondary" />
          </IconButton>
        </Tooltip>
      </div>

      <div
        className="d-flex flex-row align-items-center"
        style={styles.faceLift}
      >
        <img src={profile.avatar} style={styles.avatar} />
        <div className="align-items-center ml-3">
          {auth ? (
            <>
              {renderRow('Username', profile.username)}
              {renderRow('Password', '**************')}
            </>
          ) : (
            <>
              {renderRow(
                'Not logged in',
                'login or create an account to unlock more features',
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  faceLift: {
    marginTop: -22,
  },
  actionText: {
    fontSize: 12,
    opacity: 0.5,
  },
})
