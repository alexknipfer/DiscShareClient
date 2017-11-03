import { Button, Form, Grid, Icon, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { CenteredCardGrid } from '../../../components/CenteredGrid'
import { Formik } from 'formik'
import PaddedCard from '../../../components/PaddedCard'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 5px;
`

@observer
class ForgotPasswordForm extends Component {
  @observable resetStatus = null
  @observable errorMessage = null
  @observable errorMessageVisible = false

  handleSubmit = async (
    sendResetPasswordEmail,
    values,
    setSubmitting,
    setErrors
  ) => {
    const email = values.email

    try {
      const result = await sendResetPasswordEmail(email)
      setSubmitting(false)
      this.resetStatus = result.data.sendResetPasswordEmail
    } catch (err) {
      setSubmitting(false)
      const { graphQLErrors } = err
      if (graphQLErrors[0]) {
        setErrors({ submitError: graphQLErrors[0].message })
      } else {
        setErrors({ submitError: err.message })
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

    return (
      <Formik
        initialValues={{
          email: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.email) {
            errors.email = 'Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await this.handleSubmit(
            sendResetPasswordEmail,
            values,
            setSubmitting,
            setErrors
          )
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <CenteredCardGrid>
            <Grid.Column mobile={14} computer={5}>
              <PaddedCard fluid>
                {!this.resetStatus && (
                  <div>
                    <h3>Forgot Password</h3>
                    <Form
                      error={errors.submitError ? true : false}
                      loading={isSubmitting}
                      onSubmit={handleSubmit}
                    >
                      <Form.Field>
                        <Input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          icon={
                            errors.email && (
                              <Icon name="exclamation circle" color="red" />
                            )
                          }
                          placeholder="Email"
                        />
                        {touched.email &&
                          errors.email && (
                            <ErrorMessage>{errors.email}</ErrorMessage>
                          )}
                      </Form.Field>
                      <Message error content={errors.submitError} />
                      <Button type="submit">Send Email</Button>
                    </Form>
                  </div>
                )}
                {this.resetStatus && (
                  <div>
                    Please check your email for instructions on how to complete
                    the password reset process. <br />
                    <a onClick={() => history.push('/login')}>
                      Click here to login
                    </a>
                  </div>
                )}
              </PaddedCard>
            </Grid.Column>
          </CenteredCardGrid>
        )}
      />
    )
  }
}

export default ForgotPasswordForm
