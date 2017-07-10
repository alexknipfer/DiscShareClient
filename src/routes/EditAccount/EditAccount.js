import { Button, Card, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, extendObservable } from 'mobx'

import { AccountApi } from '../../lib/apis/AccountApi'
import { LocalStorage } from '../../utils/LocalStorage'
import { observer } from 'mobx-react'

const EditAccount = observer(
  class EditAccount extends Component {
    constructor() {
      super()
      extendObservable(this, {
        successMessageVisible: false,
        displaySuccessMessage: action(() => {
          this.successMessageVisible = !this.successMessageVisible
          setTimeout(() => {
            this.successMessageVisible = !this.successMessageVisible
          }, 3000)
        })
      })
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
      LocalStorage.saveToken(token, { path: '/', expires: 7 })
      this.displaySuccessMessage()
    }

    render() {
      const { user } = this.props
      return (
        <div>
          <Grid className="center-horizontal">
            <Grid.Row>
              <Grid.Column mobile={16} computer={10}>
                <Card fluid className="card-padding">
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
                          <Input
                            defaultValue={user.email}
                            id="email"
                            required
                          />
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
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  }
)

export default EditAccount
