import { Button, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { graphql } from 'react-apollo'

import SendResetPasswordEmailMutation from '../mutations/sendResetPasswordEmail'
import ForgotPasswordValidator from './ForgotPasswordValidator'
import { CenteredCardGrid } from '../../../components/CenteredGrid'
import PaddedCard from '../../../components/PaddedCard'
import TextInput from '../../../lib/Forms/InputTypes/TextInput'

@observer
class ForgotPasswordForm extends Component {
  @observable resetStatus = null
  @observable formLoading = false
  @observable errorMessage = null
  @observable errorMessageVisible = false

  handleSubmit = async sendResetPasswordEmail => {
    this.formLoading = true
    const email = document.getElementById('email').value

    try {
      const result = await sendResetPasswordEmail(email)
      this.formLoading = false
      this.resetStatus = result.data.sendResetPasswordEmail
    } catch (err) {
      this.formLoading = false
      const { graphQLErrors } = err
      if (graphQLErrors[0]) {
        this.displayErrorMessage(graphQLErrors[0].message)
      } else {
        this.displayErrorMessage(err.message)
      }
    }
  }

  @action
  displayErrorMessage = err => {
    this.errorMessageVisible = true
    this.errorMessage = err
  }

  render() {
    const { sendResetPasswordEmail, history } = this.props
    const { form, onFieldChange } = ForgotPasswordValidator
    const { fields, meta } = form
    return (
      <CenteredCardGrid>
        <Grid.Column mobile={14} computer={5}>
          <PaddedCard fluid>
            {!this.resetStatus && (
              <div>
                <h3>Forgot Password</h3>
                <Form
                  onSubmit={() => this.handleSubmit(sendResetPasswordEmail)}
                  error={this.errorMessageVisible}
                  loading={this.formLoading}
                >
                  <Form.Field>
                    <TextInput
                      id="email"
                      name="email"
                      value={fields.email.value}
                      errorMessage={fields.email.error}
                      onChange={onFieldChange}
                      placeholder="Email"
                    />
                  </Form.Field>
                  {meta.error && <div>{meta.error}</div>}
                  <Message error content={this.errorMessage} />
                  <Button disabled={!meta.isValid} type="submit">
                    Send Email
                  </Button>
                </Form>
              </div>
            )}
            {this.resetStatus && (
              <div>
                Please check your email for instructions on how to complete the
                password reset process. <br />
                <a onClick={() => history.push('/login')}>
                  Click here to login
                </a>
              </div>
            )}
          </PaddedCard>
        </Grid.Column>
      </CenteredCardGrid>
    )
  }
}

export default graphql(SendResetPasswordEmailMutation, {
  props: ({ mutate }) => ({
    sendResetPasswordEmail: email => mutate({ variables: { email } })
  })
})(ForgotPasswordForm)
