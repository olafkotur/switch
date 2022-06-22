import React, { HTMLInputTypeAttribute } from 'react'
import Stylesheet from 'reactjs-stylesheet'
import { BORDER_RADIUS } from '../constants'

interface IProps {
  value: string
  onChange: (value: string) => void
  name?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  description?: string
}

export const TextInput = ({
  value,
  onChange,
  name,
  type,
  placeholder,
  description,
}: IProps): React.ReactElement => {
  return (
    <div style={styles.container}>
      {name && <span className="ml-2 primary">{name}</span>}
      <input
        style={styles.textInput}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-muted" style={styles.description}>
        {description}
      </span>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    width: '100%',
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },

  textInput: {
    borderWidth: 0,
    padding: 10,
    paddingLeft: 20,
    width: '100%',
    color: 'rgba(255, 255, 255, 0.5)',
    background: '#303136',
    borderRadius: BORDER_RADIUS,
  },
  description: {
    fontSize: 12,
  },
})
