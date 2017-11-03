import { Button, Form, Grid, Icon, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { CenteredCardGrid } from '../../../components/CenteredGrid'
import { Formik } from 'formik'
import PaddedCard from '../../../components/PaddedCard'
import ResetPasswordMutation from '../mutations/resetPassword'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'
import queryString from 'query-string'

@observer
class ResetPasswordForm extends Component {
  @observable errorMessageVisible = false
  @observable errorMessage = null
  @observable resetStatus = false

  handleSubmit = async (
    history,
    resetPassword,
    values,
    setSubmitting,
    setErrors
  ) => {
    const password = values.password
    const confirmPassword = values.confirmPassword

    const tokenQuery = history.location.search
    const { token } = queryString.parse(tokenQuery)

    if (password !== confirmPassword) {
      setSubmitting(false)
      setErrors({ submitError: 'Password do not match.' })
    } else {
      try {
        await resetPassword({ variables: { password, token } })
        setSubmitting(false)
        this.resetStatus = true
      } catch (err) {
        const { graphQLErrors } = err
        setSubmitting(false)
        if (graphQLErrors[0]) {
          setErrors({ submitError: graphQLErrors[0].message })
        } else {
          setErrors({ submitError: err.message })
        }
      }
    }
  }

  @action
  displayErrMessage = err => {
    this.errorMessageVisible = !this.errorMessageVisible
    this.errorMessage = err
  }

  render() {
    const { history, mutate: resetPassword } = this.props

    return (
      <Formik
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.password) {
            errors.password = 'Required'
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await this.handleSubmit(
            history,
            resetPassword,
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
                    <h3>Reset Password</h3>
                    <Form
                      error={errors.submitError ? true : false}
                      loading={isSubmitting}
                      onSubmit={handleSubmit}
                    >
                      <Form.Field>
                        <Input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          icon={
                            errors.password && (
                              <Icon name="exclamation circle" color="red" />
                            )
                          }
                          placeholder="Password"
                        />
                      </Form.Field>
                      <Form.Field>
                        <Input
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          value={values.confirmPassword}
                          icon={
                            errors.confirmPassword && (
                              <Icon name="exclamation circle" color="red" />
                            )
                          }
                          placeholder="Confirm Password"
                        />
                      </Form.Field>
                      <Message error content={errors.submitError} />
                      <Button type="submit">Reset Password</Button>
                    </Form>
                  </div>
                )}
                {this.resetStatus && (
                  <div>
                    Your password has been reset successfully. Click{' '}
                    <a onClick={() => history.push('/login')}>here</a> to return
                    to login.
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

export default graphql(ResetPasswordMutation)(ResetPasswordForm)
