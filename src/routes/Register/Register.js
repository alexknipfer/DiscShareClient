import { Button, Card, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, extendObservable } from 'mobx'

import { AccountApi } from '../../lib/apis/AccountApi'
import { LocalStorage } from '../../utils/LocalStorage'
import { observer } from 'mobx-react'

const Login = observer(
  class Login extends Component {
    constructor(props) {
      super(props)
      extendObservable(this, {
        errorMessageVisible: false,
        errorMessage: null,
        displayErrMessage: action(err => {
          this.errorMessageVisible = !this.errorMessageVisible
          this.errorMessage = err
        })
      })
    }

    handleSubmit = async () => {
      const email = document.getElementById('email').value
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const confirmPass = document.getElementById('confirm-password').value

      if (password !== confirmPass) {
        this.displayErrMessage('Passwords do not match.')
      } else {
        try {
          const result = await AccountApi.createAccount({
            email,
            username,
            password
          })
          const { token } = result
          LocalStorage.saveToken(token, { path: '/', expires: 7 })
          this.props.history.push('/')
        } catch (error) {
          this.displayErrMessage(error.message)
        }
      }
    }

    render() {
      return (
        <div>
          <Grid className="center-horizontal">
            <Grid.Column mobile={16} computer={5}>
              <Card fluid className="card-padding">
                <h3>Register</h3>
                <Form
                  onSubmit={this.handleSubmit}
                  error={this.errorMessageVisible}
                >
                  <Form.Field>
                    <label>Email</label>
                    <Input id="email" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Username</label>
                    <Input id="username" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Input id="password" type="password" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm Password</label>
                    <Input id="confirm-password" type="password" required />
                  </Form.Field>
                  <Message error content={this.errorMessage} />
                  <Button type="submit">Register</Button>
                </Form>
              </Card>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
)

export default Login
