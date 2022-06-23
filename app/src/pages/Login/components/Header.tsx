import React from 'react'
import { Spacer } from '../../../components/Spacer'
import { Title } from '../../../components/Title'

const ICON = require('../../../../assets/switch-icon.png')

export const Header = () => {
  return (
    <div className="d-flex flex-row align-items-center">
      <img src={ICON} width={120} />
      <Spacer horizontal={15} />
      <Title />
    </div>
  )
}
