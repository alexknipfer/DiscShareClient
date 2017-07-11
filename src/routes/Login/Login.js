import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import { CenteredGrid, PaddedCard } from '../commonStyles'
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
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value

      try {
        const result = await AccountApi.loginWithUsername({
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

    render() {
      return (
        <CenteredGrid>
          <Grid.Column mobile={16} computer={5}>
            <PaddedCard fluid>
              <h3>Login</h3>
              <Form
                onSubmit={this.handleSubmit}
                error={this.errorMessageVisible}
              >
                <Form.Field>
                  <label>Username</label>
                  <Input id="username" required />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input id="password" type="password" required />
                </Form.Field>
                <Message error content={this.errorMessage} />
                <Button type="submit">Login</Button>
              </Form>
            </PaddedCard>
          </Grid.Column>
        </CenteredGrid>
      )
    }
  }
)

export default Login
