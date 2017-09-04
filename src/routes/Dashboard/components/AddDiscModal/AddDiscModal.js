import { Button, Form, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'

import DashboardStore from '../../stores/DashboardStore'
import FormInput from '../../../../utils/Forms/FormInput'
import LocationInput from '../../../../utils/Forms/LocationInput'
import { observer } from 'mobx-react'

@observer
class AddDiscModal extends Component {
  render() {
    const { form } = DashboardStore
    const { fields, meta } = form
    const { toggleModal, modalOpen } = this.props
    return (
      <Modal size="small" open={modalOpen} onClose={toggleModal}>
        <Modal.Header>Add Disc</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <FormInput
                id="discName"
                name="discName"
                value={fields.discName.value}
                errorMessage={fields.discName.error}
                onChange={DashboardStore.onFieldChange}
                placeholder="Disc Name"
              />
            </Form.Field>
            <Form.Field>
              <LocationInput
                id="discLocation"
                name="discLocation"
                value={fields.discLocation.value}
                errorMessage={fields.discLocation.error}
                onChange={DashboardStore.onFieldChange}
                placeholder="Disc Location"
              />
            </Form.Field>
            <Form.Field>
              <FormInput
                id="nameOnDisc"
                name="nameOnDisc"
                value={fields.nameOnDisc.value}
                onChange={DashboardStore.onFieldChange}
                placeholder="Name on disc"
              />
            </Form.Field>
            {meta.error &&
              <div>
                {meta.error}
              </div>}
            <Modal.Actions>
              <Button negative onClick={toggleModal}>
                Cancel
              </Button>
              <Button
                disabled={!meta.isValid}
                positive
                icon="checkmark"
                labelPosition="right"
                content="Add"
              />
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddDiscModal
