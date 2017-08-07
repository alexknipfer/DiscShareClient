import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const AddButtonStyles = styled.div`
  position: fixed;
  padding-right: 10px;
  padding-bottom: 10px;
  right: 0;
  bottom: 0;
  z-index: 50;
`

@observer
class AddButton extends Component {
  render() {
    const { toggleModal } = this.props
    return (
      <AddButtonStyles>
        <Button circular icon="plus" size="large" onClick={toggleModal} />
      </AddButtonStyles>
    )
  }
}

export default AddButton
