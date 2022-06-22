import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
} from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stylesheet from 'reactjs-stylesheet'
import {
  accentColors,
  fontFamilies,
  windowBehaviours,
} from '../imports/customUI'
import { KeybindButton } from '../pages/Settings/components/KeybindButton'
import { setDialog } from '../redux/interface'
import { RootState } from '../store'
import { FontFamily, WindowBehaviour } from '../typings/d'

export const Dialog = (): React.ReactElement => {
  const dispatch = useDispatch()
  const dialog = useSelector((state: RootState) => state.interface.dialog)

  if (!dialog) {
    return <></>
  }

  return (
    <div>
      <MuiDialog
        fullWidth
        open={dialog.open}
        disableEscapeKeyDown={dialog.disableEscKey}
        onClose={() => dispatch(setDialog(null))}
        PaperProps={{ style: { background: '#303136' } }}
        TransitionComponent={Grow}
      >
        <div className="primary">
          <DialogTitle>{dialog.title}</DialogTitle>
        </div>

        <div className="primary pb-2">
          <DialogContent className="pt-0">{dialog.content}</DialogContent>
        </div>

        {!dialog.hideButtons && (
          <DialogActions>
            {!dialog.hideSecondary && (
              <Button
                className="mr-1"
                variant="contained"
                onClick={dialog.handleSecondary}
              >
                {dialog.secondaryLabel || 'Cancel'}
              </Button>
            )}

            {!dialog.hidePrimary && (
              <Button
                className="ml-1"
                color="primary"
                variant="contained"
                onClick={dialog.handlePrimary}
              >
                {dialog.primaryLabel || 'Proceed'}
              </Button>
            )}
          </DialogActions>
        )}
      </MuiDialog>
    </div>
  )
}

// TODO: Refactor dialog component to be less ugly

/**
 * Tutorial content, triggered by the tutorial button.
 */
export const tutorial = () => (
  <div>
    <iframe
      width="100%"
      height="310px"
      frameBorder="0"
      src="https://www.youtube.com/embed/8UVNT4wvIGY?autoplay=1"
      allow="autoplay"
    />
  </div>
)

/**
 * Trigerred when a user attempts to hide the window using the button in the UI.
 * @param visiblityKeybind - current keybind to recall window
 */
export const hideWindowWarning = (visiblityKeybind: string) => (
  <div>
    <span>
      You're about to hide Switch from your desktop, you can bring the window
      back at anytime using the key <code>{visiblityKeybind}</code> combination.
    </span>
    <br />
    <br />
    <span>Feel free to disable this message from the settings page.</span>
  </div>
)

/**
 * Triggered when user attempts to change the visibility keybind.
 * @param initialValue - initial visibility keybind value
 * @param setVisibilityKeybind - handler to set visibility keybind
 */
export const visibilityKeybindSelect = (
  initialValue: string,
  setVisibilityKeybind: (value: string) => void,
) => (
  <div>
    <span>
      Please record a new <code>visibility keybind</code>, you must include{' '}
      <code>two</code> characters. You will have to <code>restart</code> the
      application to see any changes.
    </span>
    <br />
    <div className="my-3">
      <KeybindButton
        keybind={initialValue}
        handleUpdate={(v) => setVisibilityKeybind(v)}
      />
    </div>
  </div>
)

/**
 * Triggered when user attempts to change the window behaviour.
 * @param accentColor - current accent color
 * @param initialValue - initial window behaviour value
 * @param setWindowBehaviour - handler to set window behaviour
 */
export const windowBehaviourSelect = (
  accentColor: string,
  initialValue: WindowBehaviour,
  setWindowBehaviour: (value: WindowBehaviour) => void,
) => (
  <div className="row justify-content-center">
    {windowBehaviours.map((v) => (
      <ButtonBase
        key={`dialog-select-box-${v.label}`}
        className="d-flex justify-content-center align-items-center"
        style={{
          ...styles.windowBehaviour,
          background: v.value === initialValue ? accentColor : '#1f2225',
        }}
        onClick={() => setWindowBehaviour(v.value)}
      >
        <span>{v.label}</span>
      </ButtonBase>
    ))}
  </div>
)

/**
 * Triggered when user attempts to change the accent color.
 * @param setAccentColor - handler to set accent color
 */
export const accentColorSelect = (setAccentColor: (color: string) => void) => (
  <div className="row justify-content-center">
    {accentColors.map((v) => (
      <ButtonBase
        key={`dialog-accent-color-${v}`}
        className="d-flex justify-content-center align-items-center"
        style={{ ...styles.accentColor, backgroundColor: v }}
        onClick={() => setAccentColor(v)}
      >
        <span>{v.toLowerCase()}</span>
      </ButtonBase>
    ))}
  </div>
)

/**
 * Triggerred when user attempts to change the font family.
 * @param accentColor - current accent color
 * @param initialValue - initial font family value
 * @param setFontFamily - handler to set font family
 */
export const fontFamilySelect = (
  accentColor: string,
  initialValue: FontFamily,
  setFontFamily: (value: FontFamily) => void,
) => (
  <div className="row justify-content-center">
    {fontFamilies.map((v) => (
      <ButtonBase
        key={`dialog-accent-color-${v}`}
        className="d-flex justify-content-center align-items-center"
        style={{
          ...styles.fontFamily,
          background: v === initialValue ? accentColor : '#1f2225',
        }}
        onClick={() => setFontFamily(v)}
      >
        <span style={{ fontFamily: v, padding: 5 }}>{v.toLowerCase()}</span>
      </ButtonBase>
    ))}
  </div>
)

export const login = () => {
  ;<div>Login</div>
}

export const register = () => {
  ;<div>Register</div>
}

const styles = Stylesheet.create({
  accentColor: {
    width: 106,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  fontFamily: {
    width: 106,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  windowBehaviour: {
    width: 184,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
})
