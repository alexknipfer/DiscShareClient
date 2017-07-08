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

  displayErrMessage = error => {
    this.setState({
      errorMessageVisible: !this.state.errorMessageVisible,
      errorMessage: error
    })
  }

  handleSubmit = async () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
      const result = await AccountApi.loginWithUsername({ username, password })
      const { token } = result
      LocalStorage.saveToken(token, { path: '/', expires: 7 })
      this.setState({ toggleRedirect: !this.state.toggleRedirect })
    } catch (error) {
      this.displayErrMessage(error.message)
    }
  }

  render() {
    return (
      <div>
        <Grid className="center-horizontal">
          <Grid.Column mobile={16} computer={5}>
            <Card fluid className="card-padding">
              <h3>Login</h3>
              <Form
                onSubmit={this.handleSubmit}
                error={this.state.errorMessageVisible}
              >
                <Form.Field>
                  <label>Username</label>
                  <input type="text" id="username" required />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" id="password" required />
                </Form.Field>
                <Message error content={this.state.errorMessage} />
                <Button type="submit">Login</Button>
              </Form>
            </Card>
          </Grid.Column>
        </Grid>
        {this.state.toggleRedirect && <Redirect to="/" />}
      </div>
    )
  }
}

export default Login
