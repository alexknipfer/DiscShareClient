import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import axios from 'axios'

import EditAccountViewStore from './stores/EditAccountViewStore'
import formatFileName from '../../lib/formatters/formatFileName'
import { CenteredCardGrid } from '../../components/CenteredGrid'
import SignS3Mutation from './mutations/signS3'
import EditAccountMutation from './mutations/editAccount'
import GetUserByIdQuery from './queries/getUserById'
import { LocalStorage } from '../../utils/LocalStorage'
import PaddedCard from '../../components/PaddedCard'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { observer } from 'mobx-react'

@observer
class EditAccount extends Component {
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

  onDrop = async event => EditAccountViewStore.updateFile(event.target.files[0])

  handleSubmit = async userId => {
    const { editAccount, signS3 } = this.props
    const { file } = EditAccountViewStore
    let profileImage = null

    EditAccountViewStore.toggleFormLoad()
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const location = document.getElementById('location').value

    if (file) {
      const response = await signS3(formatFileName(file.name), file.type)

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
    const { successMessageVisible, formLoading } = EditAccountViewStore

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
                    <Button icon="upload" />
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      ref="upload"
                      onChange={this.onDrop}
                    />
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

export default compose(
  graphql(EditAccountMutation, {
    props: ({ mutate }) => ({
      editAccount: (userId, email, firstName, location, profileImage) =>
        mutate({
          variables: { userId, email, firstName, location, profileImage }
        })
    }),
    options: ({ user }) => {
      console.log('USER IN QUERY: ', user)
      return {
        refetchQueries: [
          {
            query: GetUserByIdQuery,
            variables: { userId: user.id }
          }
        ]
      }
    }
  }),
  graphql(SignS3Mutation, {
    props: ({ mutate }) => ({
      signS3: (filename, filetype) =>
        mutate({ variables: { filename, filetype } })
    })
  })
)(EditAccount)
