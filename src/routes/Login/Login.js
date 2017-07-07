import { Button, Card, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import { AccountApi } from '../../lib/apis/AccountApi'
import { LocalStorage } from '../../utils/LocalStorage'

class Login extends Component {
  state = {
    errorMessageVisible: false,
    errorMessage: null
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
    } catch (error) {
      this.displayErrMessage(error.message)
    }
  }

  render() {
    return (
      <div className="center-horizontal">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Card style={{ padding: 30, width: '350px' }}>
                <Card.Content header="Login" />
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
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Login