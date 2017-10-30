import { Button, Form, Grid, Icon, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

import { CenteredCardGrid } from '../../../../components/CenteredGrid'
import { Formik } from 'formik'
import { LocalStorage } from '../../../../utils/LocalStorage'
import PaddedCard from '../../../../components/PaddedCard'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 5px;
`

@observer
class RegisterForm extends Component {
  handleSubmit = async (register, values, setSubmitting, setErrors) => {
    const email = values.email
    const username = values.username
    const password = values.password
    const confirmPass = values.confirmPassword

    if (password !== confirmPass) {
      setSubmitting(false)
      setErrors({ submitError: 'Passwords do not match.' })
    } else {
      try {
        const user = await register(email, username, password)
        LocalStorage.saveToken(user.data.register)
        setSubmitting(false)
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
  }

  render() {
    const { register } = this.props

    return (
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.email) {
            errors.email = 'Required'
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await this.handleSubmit(register, values, setSubmitting, setErrors)
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
                <h3>Register</h3>
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
                  <Form.Field>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      icon={
                        touched.username &&
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
                        touched.password &&
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
                  <Form.Field>
                    <Input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      icon={
                        touched.confirmPassword &&
                        errors.confirmPassword && (
                          <Icon name="exclamation circle" color="red" />
                        )
                      }
                      placeholder="Confirm Password"
                    />
                  </Form.Field>
                  <Message error content={errors.submitError} />
                  <Button type="submit">Register</Button>
                </Form>
              </PaddedCard>
            </Grid.Column>
          </CenteredCardGrid>
        )}
      />
    )
  }
}

export default RegisterForm
