import { Button, Card, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import { AccountApi } from '../../lib/apis/AccountApi'
import { LocalStorage } from '../../utils/LocalStorage'
import { Redirect } from 'react-router'

class Login extends Component {
  state = {
    errorMessageVisible: false,
    errorMessage: null,
    toggleRedirect: false
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
        this.setState({
          toggleRedirect: !this.state.toggleRedirect
        })
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
                error={this.state.errorMessageVisible}
              >
                <Form.Field>
                  <Form.Input label="Email" id="email" required />
                </Form.Field>
                <Form.Field>
                  <Form.Input label="Username" id="username" required />
                </Form.Field>
                <Form.Field>
                  <Form.Input label="Password" id="password" required />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Confirm Password"
                    id="confirm-password"
                    required
                  />
                </Form.Field>
                <Message error content={this.state.errorMessage} />
                <Button type="submit">Register</Button>
              </Form>
            </Card>
          </Grid.Column>
        </Grid>
        {this.state.toggleRedirect && <Redirect path to="/" />}
      </div>
    )
  }
}

export default Login
