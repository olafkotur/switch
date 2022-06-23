import { Button as MuiButton } from '@material-ui/core'
import React from 'react'

interface Props {
  label: string
  onClick: () => Promise<void>
  disabled?: boolean
}

export const Button = ({ label, onClick, disabled }: Props) => {
  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled}
      className="primary bg-tertiary text-lowercase px-3 font-weight-normal"
      style={disabled ? { opacity: 0.3 } : {}}
    >
      {label}
    </MuiButton>
  )
}
