import { Button, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

import { CenteredGrid } from '../../../../components/CenteredGrid'
import TextInput from '../../../../lib/Forms/InputTypes/TextInput'
import { LocalStorage } from '../../../../utils/LocalStorage'
import LoginMutation from '../mutations/login'
import PaddedCard from '../../../../components/PaddedCard'
import PropTypes from 'prop-types'

@observer
class LoginForm extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null

  static propTypes = {
    form: PropTypes.object,
    detectValues: PropTypes.func,
    login: PropTypes.func,
    onChange: PropTypes.func
  }

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
      if (graphQLErrors[0]) {
        this.displayErrMessage(graphQLErrors[0].message)
      } else {
        this.displayErrMessage(err.message)
      }
    }
  }

  render() {
    const { form, login, onChange } = this.props
    const { fields, meta } = form
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
              {meta.error && <div>{meta.error}</div>}
              <Message error content={this.errorMessage} />
              <Button disabled={!meta.isValid} type="submit">
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
