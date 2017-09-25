import { Button, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

import { CenteredGrid } from '../../../../components/CenteredGrid'
import TextInput from '../../../../lib/Forms/InputTypes/TextInput'
import { LocalStorage } from '../../../../utils/LocalStorage'
import PaddedCard from '../../../../components/PaddedCard'
import PropTypes from 'prop-types'
import RegisterMutation from '../../mutations/register'

@observer
class RegisterForm extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null

  static propTypes = {
    form: PropTypes.object,
    detectValues: PropTypes.func,
    login: PropTypes.func,
    onChange: PropTypes.func
  }

  componentDidMount() {
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    this.props.detectValues({ email, username, password })
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
        if (graphQLErrors[0]) {
          this.displayErrMessage(graphQLErrors[0].message)
        } else {
          this.displayErrMessage(err.message)
        }
      }
    }
  }

  render() {
    const { form, register, onChange } = this.props
    const { fields, meta } = form
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
                <TextInput
                  id="email"
                  name="email"
                  value={fields.email.value}
                  errorMessage={fields.email.error}
                  onChange={onChange}
                  placeholder="Email"
                />
              </Form.Field>
              <Form.Field>
                <TextInput
                  id="username"
                  name="username"
                  value={fields.username.value}
                  errorMessage={fields.username.error}
                  onChange={onChange}
                  placeholder="Username"
                />
              </Form.Field>
              <Form.Field>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={fields.password.value}
                  errorMessage={fields.password.error}
                  onChange={onChange}
                  placeholder="Password"
                />
              </Form.Field>
              <Form.Field>
                <TextInput
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={fields.confirmPassword.value}
                  errorMessage={fields.confirmPassword.error}
                  onChange={onChange}
                  placeholder="Confirm Password"
                />
              </Form.Field>
              {meta.error &&
                <div>
                  {meta.error}
                </div>}
              <Message error content={this.errorMessage} />
              <Button disabled={!meta.isValid} type="submit">
                Register
              </Button>
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
})(RegisterForm)
