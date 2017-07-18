import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import CenteredGrid from '../../components/CenteredGrid/CenteredGrid'
import PaddedCard from '../../components/PaddedCard/PaddedCard'
import PropTypes from 'prop-types'
import RegisterMutation from '../../mutations/register'
import { graphql } from 'react-apollo'

class Register extends Component {
  static propTypes = {
    register: PropTypes.func
  }

  handleSubmit = async register => {
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const confirmPass = document.getElementById('confirm-password').value

    try {
      const user = await register(email, username, password)
    } catch (err) {
      const { graphQLErrors } = err
      console.log(graphQLErrors[0].message)
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
