import { Dimmer, Icon } from 'semantic-ui-react'

import React from 'react'
import styled from 'styled-components'

const MenuContent = styled.div`text-align: center;`

const CloseIcon = styled(Icon)`
  position: absolute;
  padding-top: 10px;
  padding-right: 10px;
  top: 0px;
  right: 0px;
`

const MenuOverlay = ({ open }) => {
  return (
    <Dimmer active={open}>
      <CloseIcon name="close" size="large" />
      <MenuContent>
        <h2>Home</h2>
        <h2>Register</h2>
        <h2>Login</h2>
      </MenuContent>
    </Dimmer>
  )
}

export default MenuOverlay
