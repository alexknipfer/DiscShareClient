import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { AccountApi } from '../../lib/apis/AccountApi'
import CenteredGrid from '../../components/CenteredGrid/CenteredGrid'
import { LocalStorage } from '../../utils/LocalStorage'
import PaddedCard from '../../components/PaddedCard/PaddedCard'
import { observer } from 'mobx-react'

@observer
class Register extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null

  @action
  displayErrMessage = err => {
    this.errorMessageVisible = !this.errorMessageVisible
    this.errorMessage = err
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
      <CenteredGrid>
        <Grid.Column mobile={16} computer={5}>
          <PaddedCard fluid>
            <h3>Register</h3>
            <Form onSubmit={this.handleSubmit} error={this.errorMessageVisible}>
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
          </PaddedCard>
        </Grid.Column>
      </CenteredGrid>
    )
  }
}

export default Register
