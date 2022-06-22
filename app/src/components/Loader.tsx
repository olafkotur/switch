import { Zoom } from '@material-ui/core'
import React from 'react'
// @ts-ignore
import Loading from 'react-loading-components'
import Stylesheet from 'reactjs-stylesheet'

export const Loader = (): React.ReactElement => {
  const [color, setColor] = React.useState<string>('')
  const [showText, setShowText] = React.useState<boolean>(true)
  const [showLoader, setShowLoader] = React.useState<boolean>(false)

  React.useEffect(() => {
    // switch between text and loader
    const interval = setInterval(() => {
      const availableColors = ['#fff', '#B33939', '#227093', '#CCAE62']
      const random = Math.floor(Math.random() * 5) + 1
      setColor(availableColors[random - 1])

      setShowText((showText) => !showText)
      setShowLoader((showLoader) => !showLoader)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Zoom in={showText}>
        <div className="d-flex flex-row position-absolute">
          <h1 className="secondary mr-2" style={styles.text}>
            s
          </h1>
          <h1 className="primary mr-2" style={styles.text}>
            w
          </h1>
          <h1 className="primary mr-2" style={styles.text}>
            i
          </h1>
          <h1 className="primary mr-2" style={styles.text}>
            t
          </h1>
          <h1 className="tertiary mr-2" style={styles.text}>
            c
          </h1>
          <h1 className="quaternary mr-2" style={styles.text}>
            h
          </h1>
        </div>
      </Zoom>
      <Zoom in={showLoader}>
        <div>
          <Loading type="grid" width={80} height={80} fill={color} />
        </div>
      </Zoom>
    </div>
  )
}

const styles = Stylesheet.create({
  text: {
    fontFamily: 'Courier New',
  },
})
