import { Button, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'

import { observer } from 'mobx-react'

@observer
class AddDiscModal extends Component {
  render() {
    const { toggleModal, modalOpen } = this.props
    return (
      <Modal size="small" open={modalOpen} onClose={toggleModal}>
        <Modal.Header>Add Disc</Modal.Header>
        <Modal.Content>
          <p>Add Disc form goes here!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Add"
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AddDiscModal
