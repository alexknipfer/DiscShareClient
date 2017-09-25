import { Button, Form, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

import AddDiscMutation from '../../mutations/addDisc'
import AddDiscModalFormValidator from '../../../../lib/Forms/FormValidation/AddDiscModal'
import DiscsQuery from '../../queries/discs'
import TextInput from '../../../../lib/Forms/InputTypes/TextInput'
import LocationInput from '../../../../lib/Forms/InputTypes/LocationInput'

const viewStore = {
  selectedLocation: null
}

@observer
class AddDiscModal extends Component {
  selectLocation = location => (viewStore.selectedLocation = location)

  submitDisc = async addDisc => {
    const discName = document.getElementById('discName').value
    const nameOnDisc = document.getElementById('nameOnDisc').value

    const { description, location: { lng, lat } } = viewStore.selectedLocation

    try {
      await addDisc(discName, description, lng, lat, nameOnDisc)
      this.props.toggleModal()
    } catch (error) {
      console.log('ERROR ADDING DISC: ', error)
    }
  }

  render() {
    const { form, onFieldChange } = AddDiscModalFormValidator
    const { fields, meta } = form
    const { toggleModal, modalOpen, addDisc } = this.props
    return (
      <Modal size="small" open={modalOpen} onClose={toggleModal}>
        <Modal.Header>Add Disc</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <TextInput
                id="discName"
                name="discName"
                value={fields.discName.value}
                errorMessage={fields.discName.error}
                onChange={onFieldChange}
                placeholder="Disc Name"
              />
            </Form.Field>
            <Form.Field>
              <LocationInput
                id="discLocation"
                name="discLocation"
                value={fields.discLocation.value}
                errorMessage={fields.discLocation.error}
                onChange={onFieldChange}
                selectLocation={this.selectLocation}
                placeholder="Disc Location"
              />
            </Form.Field>
            <Form.Field>
              <TextInput
                id="nameOnDisc"
                name="nameOnDisc"
                value={fields.nameOnDisc.value}
                onChange={onFieldChange}
                placeholder="Name on disc"
              />
            </Form.Field>
            {meta.error && <div>{meta.error}</div>}
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
                onClick={() => this.submitDisc(addDisc)}
              />
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default graphql(AddDiscMutation, {
  props: ({ mutate }) => ({
    addDisc: (
      discName,
      locationDescription,
      longitude,
      latitude,
      nameOnDisc
    ) => {
      return mutate({
        variables: {
          discName,
          locationDescription,
          longitude,
          latitude,
          nameOnDisc
        }
      })
    }
  }),
  options: props => ({
    refetchQueries: [
      {
        query: DiscsQuery
      }
    ]
  })
})(AddDiscModal)
