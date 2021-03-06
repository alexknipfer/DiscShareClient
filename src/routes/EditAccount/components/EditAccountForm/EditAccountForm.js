import { Button, Form, Grid, Image, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import { CenteredCardGrid } from '../../../../components/CenteredGrid'
import Dropzone from 'react-dropzone'
import EditAccountViewStore from '../../stores/EditAccountViewStore'
import { LocalStorage } from '../../../../utils/LocalStorage'
import PaddedCard from '../../../../components/PaddedCard'
import PropTypes from 'prop-types'
import axios from 'axios'
import formatFileName from '../../../../lib/formatters/formatFileName'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const FileLabel = styled.div`
  font-size: 10px;
  margin-top: 5px;
`

@observer
class EditAccountForm extends Component {
  static propTypes = {
    auth: PropTypes.bool,
    user: PropTypes.object,
    editAccount: PropTypes.func
  }

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        'Content-Type': file.type
      }
    }

    await axios.put(signedRequest, file, options)
  }

  onDrop = async files => EditAccountViewStore.updateFile(files[0])

  handleSubmit = async userId => {
    const { editAccount, signS3, user } = this.props
    const { file } = EditAccountViewStore
    let profileImage = user.profileImage || ''

    EditAccountViewStore.toggleFormLoad()
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const location = document.getElementById('location').value

    if (file) {
      const response = await signS3(formatFileName(file.name, 'profileImages'), file.type)

      const { signedRequest, url } = response.data.signS3
      profileImage = url
      await this.uploadToS3(file, signedRequest)
    }

    const result = await editAccount(
      userId,
      email,
      firstName,
      location,
      profileImage
    )
    EditAccountViewStore.toggleFormLoad()
    LocalStorage.saveToken(result.data.editAccount)
    EditAccountViewStore.displaySuccessMessage()
  }

  render() {
    const { user } = this.props
    const { successMessageVisible, formLoading, file } = EditAccountViewStore

    return (
      <CenteredCardGrid>
        <Grid.Row>
          <Grid.Column mobile={14} computer={10}>
            <PaddedCard fluid>
              <Form
                onSubmit={() => this.handleSubmit(user.id)}
                success={successMessageVisible}
                loading={formLoading}
              >
                <Grid>
                  <Grid.Row>
                    <Grid.Column mobile={6} tablet={3} computer={3}>
                      {user.profileImage && (
                        <Image
                          src={user.profileImage}
                          size="tiny"
                          shape="circular"
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column
                      mobile={10}
                      tablet={13}
                      computer={13}
                      verticalAlign="middle"
                    >
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
                        <FileLabel>{file && file.name}</FileLabel>
                      </Dropzone>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>First Name</label>
                      <Input defaultValue={user.firstName} id="firstName" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>Location</label>
                      <Input id="location" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>Username</label>
                      <Input defaultValue={user.username} disabled />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>Email</label>
                      <Input defaultValue={user.email} id="email" required />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={16}>
                    <Message
                      success
                      header="Your profile has been updated successfully."
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Button type="submit">Submit</Button>
                  </Grid.Column>
                </Grid>
              </Form>
            </PaddedCard>
          </Grid.Column>
        </Grid.Row>
      </CenteredCardGrid>
    )
  }
}

export default EditAccountForm
