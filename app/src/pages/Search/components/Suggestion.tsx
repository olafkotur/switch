import { Button } from '@material-ui/core'
import React from 'react'
import Stylesheet from 'reactjs-stylesheet'
import { Icon, IMenuItem } from '../../../typings/d'

interface IProps extends IMenuItem {
  handleSuggestion: (url: string, icon: Icon) => Promise<void>
}

export const Suggestion = ({
  url,
  icon,
  handleSuggestion,
}: IProps): React.ReactElement => {
  return (
    <Button className="p-3" onClick={() => handleSuggestion(url, icon)}>
      <img src={icon} style={styles.img} />
    </Button>
  )
}

const styles = Stylesheet.create({
  img: {
    width: 60,
    height: 60,
  },
})
