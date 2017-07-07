import { Button, Card, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import { AccountApi } from '../../lib/apis/AccountApi'
import { LocalStorage } from '../../utils/LocalStorage'

class Login extends Component {
  state = {
    errorMessageVisible: false,
    errorMessage: null
  }

  displayErrMessage = err => {
    this.setState({
      errorMessageVisible: !this.state.errorMessageVisible,
      errorMessage: err
    })
  }

  handleSubmit = async () => {
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const confirmPass = document.getElementById('confirm-password').value
    const triggerError = this

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
      } catch (error) {
        triggerError.displayErrMessage(error.message)
      }
    }
  }

  render() {
    return (
      <div className="center-horizontal">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Card style={{ padding: 30, width: '350px' }}>
                <Card.Content header="Register" />
                <Form
                  onSubmit={this.handleSubmit}
                  error={this.state.errorMessageVisible}
                >
                  <Form.Field>
                    <label>Email</label>
                    <input type="text" id="email" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Username</label>
                    <input type="text" id="username" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input type="password" id="password" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm Password</label>
                    <input type="password" id="confirm-password" required />
                  </Form.Field>
                  <Message error content={this.state.errorMessage} />
                  <Button type="submit">Register</Button>
                </Form>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Login
