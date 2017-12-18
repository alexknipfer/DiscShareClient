import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'

import AddDiscModalStore from '../../stores/AddDiscModalStore'
import Dropzone from 'react-dropzone'
import { Formik } from 'formik'
import LocationInput from '../../../../lib/Forms/InputTypes/LocationInput'
import S3Uploader from '../../../../lib/services/S3Uploader'
import formatFileName from '../../../../lib/formatters/formatFileName'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 5px;
`


@observer
class AddDiscModal extends Component {
  selectedLocation = null

  onDrop = async files => AddDiscModalStore.updateFile(files[0])

  selectLocation = location => (this.selectedLocation = location)

  submitDisc = async (addDisc, userId, values, setSubmitting, setErrors) => {
    const discName = values.discName
    const nameOnDisc = values.nameOnDisc

    const { signS3 } = this.props
    const { file } = AddDiscModalStore
    const { description, location: { lng, lat } } = this.selectedLocation

    if (file) {
      const response = await signS3(formatFileName(file.name, 'discImages'), file.type)

      const { signedRequest, url } = response.data.signS3
      await S3Uploader.uploadFile(file, signedRequest)
    }

    try {
      await addDisc(discName, description, lng, lat, nameOnDisc, userId)
      setSubmitting(false)
      this.props.toggleModal()
    } catch (error) {
      setSubmitting(false)
      console.log('ERROR ADDING DISC: ', error)
    }
  }

  render() {
    const { toggleModal, modalOpen, addDisc, userId } = this.props

    return (
      <Formik
        initialValues={{
          discName: '',
          discLocation: '',
          nameOnDisc: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.discName) {
            errors.discName = 'Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await this.submitDisc(
            addDisc,
            userId,
            values,
            setSubmitting,
            setErrors
          )
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
            <Modal size="small" open={modalOpen} onClose={toggleModal}>
              <Modal.Header>Add Disc</Modal.Header>
              <Modal.Content>
                <Form
                  error={errors.submitError ? true : false}
                  loading={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  <Form.Field>
                    <Input
                      type="text"
                      name="discName"
                      onChange={handleChange}
                      value={values.discName}
                      icon={
                        errors.discName && (
                          <Icon name="exclamation circle" color="red" />
                        )
                      }
                      placeholder="Disc Name"
                    />
                    {touched.discName &&
                      errors.discName && (
                        <ErrorMessage>{errors.discName}</ErrorMessage>
                      )}
                  </Form.Field>
                  <Form.Field>
                    <LocationInput
                      id="discLocation"
                      name="discLocation"
                      onChange={handleChange}
                      value={values.discLocation}
                      placeholder="Disc Location"
                      selectLocation={this.selectLocation}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      type="text"
                      name="nameOnDisc"
                      onChange={handleChange}
                      value={values.nameOnDisc}
                      icon={
                        errors.nameOnDisc && (
                          <Icon name="exclamation circle" color="red" />
                        )
                      }
                      placeholder="Name On Disc"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Dropzone
                      className="none"
                      multiple={false}
                      accept="image/*"
                      onDrop={this.onDrop}
                    >
                      <Button
                        type="button"
                        basic
                        color="vk"
                        content="Select An Image"
                        icon="upload"
                      />
                    </Dropzone>
                  </Form.Field>
                  <Modal.Actions>
                    <Button negative onClick={toggleModal}>
                      Cancel
                  </Button>
                    <Button
                      positive
                      icon="checkmark"
                      labelPosition="right"
                      content="Add"
                      type="submit"
                    />
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
          )}
      />
    )
  }
}

export default AddDiscModal
