import { Dimmer, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types'
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

const MenuOverlay = ({ open, triggerClose }) => {
  return (
    <Dimmer active={open}>
      <CloseIcon name="close" size="large" onClick={triggerClose} />
      <MenuContent>
        <h2>Home</h2>
        <h2>Register</h2>
        <h2>Login</h2>
      </MenuContent>
    </Dimmer>
  )
}

MenuOverlay.propTypes = {
  open: PropTypes.bool,
  triggerClose: PropTypes.func
}

export default MenuOverlay
