import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'
import { LocalStorage } from '../../utils/LocalStorage'

import CenteredGrid from '../../components/CenteredGrid/CenteredGrid'
import PaddedCard from '../../components/PaddedCard/PaddedCard'
import PropTypes from 'prop-types'
import RegisterMutation from '../../mutations/register'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

@observer
class Register extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null

  static propTypes = {
    register: PropTypes.func
  }

  @action
  displayErrMessage = err => {
    this.errorMessageVisible = !this.errorMessageVisible
    this.errorMessage = err
  }

  handleSubmit = async register => {
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const confirmPass = document.getElementById('confirm-password').value

    if (password !== confirmPass) {
      this.displayErrMessage('Passwords do not match.')
    } else {
      try {
        const user = await register(email, username, password)
        LocalStorage.saveToken(user.data.register)
        this.props.history.push('/')
      } catch (err) {
        const { graphQLErrors } = err
        this.displayErrMessage(graphQLErrors[0].message)
      }
    }
  }

  render() {
    const { register } = this.props
    return (
      <CenteredGrid>
        <Grid.Column mobile={14} computer={5}>
          <PaddedCard fluid>
            <h3>Register</h3>
            <Form
              onSubmit={() => this.handleSubmit(register)}
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
          </PaddedCard>
        </Grid.Column>
      </CenteredGrid>
    )
  }
}

export default graphql(RegisterMutation, {
  props: ({ mutate }) => ({
    register: (email, username, password) =>
      mutate({ variables: { email, username, password } })
  })
})(Register)
