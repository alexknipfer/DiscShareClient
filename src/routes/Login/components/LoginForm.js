import { Button, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import CenteredGrid from '../../../components/CenteredGrid/CenteredGrid'
import FormInput from '../../../utils/Forms/FormInput'
import { LocalStorage } from '../../../utils/LocalStorage'
import LoginMutation from '../../../mutations/login'
import PaddedCard from '../../../components/PaddedCard/PaddedCard'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

@observer
class LoginForm extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null

  componentDidMount() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    this.props.detectValues({ username, password })
  }

  @action
  displayErrMessage = err => {
    this.errorMessageVisible = !this.errorMessageVisible
    this.errorMessage = err
  }

  handleSubmit = async login => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
      const user = await login(username, password)
      LocalStorage.saveToken(user.data.login)
      this.props.history.push('/')
    } catch (err) {
      const { graphQLErrors } = err
      this.displayErrMessage(graphQLErrors[0].message)
    }
  }

  render() {
    const { form, login, onChange } = this.props
    return (
      <CenteredGrid>
        <Grid.Column mobile={14} computer={5}>
          <PaddedCard fluid>
            <h3>Login</h3>
            <Form
              onSubmit={() => this.handleSubmit(login)}
              error={this.errorMessageVisible}
            >
              <Form.Field>
                <FormInput
                  id="username"
                  name="username"
                  value={form.fields.username.value}
                  error={form.fields.username.error}
                  onChange={onChange}
                  placeholder="Username"
                />
              </Form.Field>
              <Form.Field>
                <FormInput
                  id="password"
                  type="password"
                  name="password"
                  value={form.fields.password.value}
                  error={form.fields.password.error}
                  onChange={onChange}
                  placeholder="Password"
                />
              </Form.Field>
              {form.meta.error &&
                <div>
                  {form.meta.error}
                </div>}
              <Message error content={this.errorMessage} />
              <Button disabled={!form.meta.isValid} type="submit">
                Login
              </Button>
            </Form>
          </PaddedCard>
        </Grid.Column>
      </CenteredGrid>
    )
  }
}

export default graphql(LoginMutation, {
  props: ({ mutate }) => ({
    login: (username, password) => mutate({ variables: { username, password } })
  })
})(LoginForm)
