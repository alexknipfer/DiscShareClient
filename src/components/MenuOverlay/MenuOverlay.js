import { Dimmer, Icon } from 'semantic-ui-react'
import { fadeIn, slideInFromLeft } from '../Animations'

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const MenuContent = styled.div`text-align: center;`

const DimmerOverlay = styled(Dimmer)`animation: ${fadeIn} 0.7s;`

const SlidingHeader = styled.h2`animation: ${slideInFromLeft} 0.5s forwards;`

const SlidingHeaderMiddle = styled.h2`
  visibility: hidden;
  animation: ${slideInFromLeft} 0.5s forwards;
  animation-delay: 0.1s;
`

const SlidingHeaderBottom = styled.h2`
  visibility: hidden;
  animation: ${slideInFromLeft} 0.5s forwards;
  animation-delay: 0.3s;
`

const CloseIcon = styled(Icon)`
  position: absolute;
  padding-top: 10px;
  padding-right: 10px;
  top: 0px;
  right: 0px;
`

const MenuOverlay = ({ open, triggerClose }) => {
  return (
    <DimmerOverlay active={open}>
      <CloseIcon name="close" size="large" onClick={triggerClose} />
      <MenuContent>
        <SlidingHeader>Home</SlidingHeader>
        <SlidingHeaderMiddle>Register</SlidingHeaderMiddle>
        <SlidingHeaderBottom>Login</SlidingHeaderBottom>
      </MenuContent>
    </DimmerOverlay>
  )
}

MenuOverlay.propTypes = {
  open: PropTypes.bool,
  triggerClose: PropTypes.func
}

export default MenuOverlay
