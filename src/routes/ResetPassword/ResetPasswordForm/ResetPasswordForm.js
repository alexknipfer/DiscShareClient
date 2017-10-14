import { Button, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { graphql } from 'react-apollo'
import queryString from 'query-string'

import ResetPasswordMutation from '../mutations/resetPassword'
import ResetPasswordFormValidator from './ResetPasswordValidator'
import { CenteredCardGrid } from '../../../components/CenteredGrid'
import PaddedCard from '../../../components/PaddedCard'
import TextInput from '../../../lib/Forms/InputTypes/TextInput'

@observer
class ResetPasswordForm extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null

  handleSubmit = (history, mutate) => {
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value

    const tokenQuery = history.location.search
    const { token } = queryString.parse(tokenQuery)

    if (password !== confirmPassword) {
      this.displayErrMessage('Passwords do not match.')
    } else {
      mutate({ variables: { password, token } })
    }
  }

  @action
  displayErrMessage = err => {
    this.errorMessageVisible = !this.errorMessageVisible
    this.errorMessage = err
  }

  render() {
    const { history, mutate } = this.props
    const { form, onFieldChange } = ResetPasswordFormValidator
    const { fields, meta } = form
    return (
      <CenteredCardGrid>
        <Grid.Column mobile={14} computer={5}>
          <PaddedCard fluid>
            <div>
              <h3>Reset Password</h3>
              <Form
                onSubmit={() => this.handleSubmit(history, mutate)}
                error={this.errorMessageVisible}
              >
                <Form.Field>
                  <TextInput
                    id="password"
                    name="password"
                    value={fields.password.value}
                    errorMessage={fields.password.error}
                    onChange={onFieldChange}
                    placeholder="Password"
                    type="password"
                  />
                </Form.Field>
                <Form.Field>
                  <TextInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={fields.confirmPassword.value}
                    errorMessage={fields.confirmPassword.error}
                    onChange={onFieldChange}
                    placeholder="Confirm Password"
                    type="password"
                  />
                </Form.Field>
                {meta.error && <div>{meta.error}</div>}
                <Message error content={this.errorMessage} />
                <Button disabled={!meta.isValid} type="submit">
                  Reset Password
                </Button>
              </Form>
            </div>
          </PaddedCard>
        </Grid.Column>
      </CenteredCardGrid>
    )
  }
}

export default graphql(ResetPasswordMutation)(ResetPasswordForm)
