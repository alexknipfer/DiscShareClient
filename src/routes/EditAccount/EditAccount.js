import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { CenteredCardGrid } from '../../components/CenteredGrid'
import EditAccountMutation from './mutations/editAccount'
import GetUserQuery from '../../queries/getUser'
import { LocalStorage } from '../../utils/LocalStorage'
import PaddedCard from '../../components/PaddedCard'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

@observer
class EditAccount extends Component {
  @observable successMessageVisible = false
  @observable formLoading = false

  static propTypes = {
    auth: PropTypes.bool,
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

  @action
  toggleFormLoad = () => {
    this.formLoading = !this.formLoading
  }

  handleSubmit = async (userId, editAccount) => {
    this.toggleFormLoad()
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const location = document.getElementById('location').value

    const result = await editAccount(userId, email, firstName, location)
    this.toggleFormLoad()
    LocalStorage.saveToken(result.data.editAccount)
    this.displaySuccessMessage()
  }

  render() {
    const { user, editAccount } = this.props
    return (
      <CenteredCardGrid>
        <Grid.Row>
          <Grid.Column mobile={14} computer={10}>
            <PaddedCard fluid>
              <Form
                onSubmit={() => this.handleSubmit(user.id, editAccount)}
                success={this.successMessageVisible}
                loading={this.formLoading}
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
      </CenteredCardGrid>
    )
  }
}

export default graphql(EditAccountMutation, {
  props: ({ mutate }) => ({
    editAccount: (userId, email, firstName, location) =>
      mutate({ variables: { userId, email, firstName, location } })
  }),
  options: ({ token }) => ({
    refetchQueries: [
      {
        query: GetUserQuery,
        variables: { accesstoken: token }
      }
    ]
  })
})(EditAccount)
