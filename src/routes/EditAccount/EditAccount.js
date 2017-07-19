import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import CenteredGrid from '../../components/CenteredGrid/CenteredGrid'
import Dropzone from 'react-dropzone'
import { LocalStorage } from '../../utils/LocalStorage'
import PaddedCard from '../../components/PaddedCard/PaddedCard'
import PropTypes from 'prop-types'
import { UploadApi } from '../../lib/apis/UploadApi'
import { observer } from 'mobx-react'
import EditAccountMutation from '../../mutations/editAccount'
import { graphql } from 'react-apollo'

@observer
class EditAccount extends Component {
  @observable successMessageVisible = false

  static propTypes = {
    user: PropTypes.object,
    editAccount: PropTypes.func
  }

  @action
  displaySuccessMessage = () => {
    this.successMessageVisible = !this.successMessageVisible
    setTimeout(() => {
      this.successMessageVisible = !this.successMessageVisible
    }, 3000)
  }

  handleSubmit = async (userId, editAccount) => {
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const location = document.getElementById('location').value

    console.log(editAccount)

    const token = await editAccount(userId, email, firstName, location)
    LocalStorage.saveToken(token)
    this.displaySuccessMessage()
  }

  uploadImage = async files => {
    console.log('FILE: ', files)
    await UploadApi.uploadProfileImage(files)
  }

  render() {
    const { user, editAccount } = this.props
    return (
      <CenteredGrid>
        <Grid.Row>
          <Grid.Column mobile={14} computer={10}>
            <PaddedCard fluid>
              <Dropzone
                className="button"
                name="avatar"
                accept="image/*"
                onDrop={files => this.uploadImage(files)}
              >
                <Button>Upload Image</Button>
              </Dropzone>
              <Form
                onSubmit={() => this.handleSubmit(user.id, editAccount)}
                success={this.successMessageVisible}
              >
                <Grid>
                  <Grid.Column mobile={16} computer={16}>
                    <h3>Edit Account</h3>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>First Name</label>
                      <Input id="firstName" />
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
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>Test Field</label>
                      <Input />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <Form.Field>
                      <label>Test Field</label>
                      <Input />
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
      </CenteredGrid>
    )
  }
}

export default graphql(EditAccountMutation, {
  props: ({ mutate }) => ({
    editAccount: (userId, email, firstName, location) =>
      mutate({ variables: { userId, email, firstName, location }})
  })
})(EditAccount)
