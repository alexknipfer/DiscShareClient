import { Button, Form, Grid, Icon, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import { CenteredCardGrid } from '../../../../components/CenteredGrid'
import { Formik } from 'formik'
import { LocalStorage } from '../../../../utils/LocalStorage'
import PaddedCard from '../../../../components/PaddedCard'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 5px;
`

class LoginForm extends Component {
  handleSubmit = async (login, values, setSubmitting, setErrors) => {
    const username = values.username
    const password = values.password

    try {
      const user = await login(username, password)
      setSubmitting(false)
      LocalStorage.saveToken(user.data.login)
      this.props.history.push('/')
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

  render() {
    const { login, history } = this.props

    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.username) {
            errors.username = 'Username Required'
          }
          if (!values.password) {
            errors.password = 'Password Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await this.handleSubmit(login, values, setSubmitting, setErrors)
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
                <h3>Login</h3>
                <Form
                  error={errors.submitError ? true : false}
                  loading={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  <Form.Field>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      icon={
                        errors.username && (
                          <Icon name="exclamation circle" color="red" />
                        )
                      }
                      placeholder="Username"
                    />
                    {touched.username &&
                      errors.username && (
                        <ErrorMessage>{errors.username}</ErrorMessage>
                      )}
                  </Form.Field>
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
                    {touched.password &&
                      errors.password && (
                        <ErrorMessage>{errors.password}</ErrorMessage>
                      )}
                  </Form.Field>
                  <Grid.Row textAlign="right">
                    <a onClick={() => history.push('/forgotPassword')}>
                      Forgot Password?
                    </a>
                  </Grid.Row>
                  <Message error content={errors.submitError} />
                  <Button type="submit">Login</Button>
                </Form>
              </PaddedCard>
            </Grid.Column>
          </CenteredCardGrid>
        )}
      />
    )
  }
}

export default LoginForm
