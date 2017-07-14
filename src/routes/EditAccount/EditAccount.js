import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { AccountApi } from '../../lib/apis/AccountApi'
import CenteredGrid from '../../components/CenteredGrid/CenteredGrid'
import { LocalStorage } from '../../utils/LocalStorage'
import PaddedCard from '../../components/PaddedCard/PaddedCard'
import { observer } from 'mobx-react'

@observer
class EditAccount extends Component {
  @observable successMessageVisible = false

  @action
  displaySuccessMessage = () => {
    this.successMessageVisible = !this.successMessageVisible
    setTimeout(() => {
      this.successMessageVisible = !this.successMessageVisible
    }, 3000)
  }

  handleSubmit = async user => {
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const location = document.getElementById('location').value
    const userId = user._id

    const result = await AccountApi.editAccount({
      userId,
      email,
      firstName,
      location
    })
    const { token } = result
    LocalStorage.saveToken(token)
    this.displaySuccessMessage()
  }

  render() {
    const { user } = this.props
    return (
      <CenteredGrid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={10}>
            <PaddedCard fluid>
              <Form
                onSubmit={() => this.handleSubmit(user)}
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

export default EditAccount
