import { Checkbox, Paper } from '@material-ui/core'
import React from 'react'
import Stylesheet from 'reactjs-stylesheet'
import { Button } from '../../components/Button'
import { Spacer } from '../../components/Spacer'
import { TextInput } from '../../components/TextInput'
import { BORDER_RADIUS, EDGE_SPACING } from '../../constants'
import { Header } from './components/Header'

export const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [inviteCode, setInviteCode] = React.useState('')
  const [isRegistered, setIsRegistered] = React.useState(true)

  // const isLoginDisabled = !username || !password

  const isLoginDisabled = () => {
    if (isRegistered) {
      return !username || !password
    }
    return !username || !password || !inviteCode
  }

  const handleLogin = async () => {}

  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
      <Header />

      <Spacer vertical={10} />

      <div>
        <Paper
          className="d-flex flex-column justify-content-center mb-4 py-3 bg-secondary"
          style={styles.inputContainer}
        >
          <TextInput
            name="Username"
            value={username}
            onChange={setUsername}
            placeholder="johndoe"
          />

          <TextInput
            name="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="a very secure password"
          />

          <div className="d-flex flex-row align-items-center justify-content-end">
            <span className="primary">not registered</span>
            <Checkbox
              checked={!isRegistered}
              onChange={(_e, checked) => setIsRegistered(!checked)}
              style={{ color: '#fff' }}
            />
          </div>

          {!isRegistered && (
            <TextInput
              name="Invite Code"
              value={inviteCode}
              onChange={setInviteCode}
              placeholder="0000-0000-0000-0000"
            />
          )}

          <Spacer vertical={5} />

          <div className="align-self-center">
            <Button
              label={isRegistered ? 'Login' : 'Register'}
              onClick={handleLogin}
              disabled={isLoginDisabled()}
            />
          </div>
        </Paper>
      </div>
    </div>
  )
}

const styles = Stylesheet.create({
  inputContainer: {
    width: 400,
    padding: EDGE_SPACING,
    borderRadius: BORDER_RADIUS,
  },
})
