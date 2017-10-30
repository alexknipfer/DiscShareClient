import { Button, Form, Grid, Icon, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

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
  // @observable errorMessageVisible = false
  // @observable errorMessage = null

  // @action
  // displayErrMessage = err => {
  //   this.errorMessageVisible = !this.errorMessageVisible
  //   this.errorMessage = err
  // }

  handleSubmit = async (register, values, setSubmitting, setErrors) => {
    console.log('HELLO')
    // const email = values.email
    // const username = values.username
    // const password = values.password
    // const confirmPass = values.confirmPassword

    // if (password !== confirmPass) {
    //   this.displayErrMessage('Passwords do not match.')
    // } else {
    //   try {
    //     setSubmitting(true)
    //     const user = await register(email, username, password)
    //     LocalStorage.saveToken(user.data.register)
    //     this.props.history.push('/')
    //   } catch (err) {
    //     setSubmitting(false)
    //     const { graphQLErrors } = err
    //     if (graphQLErrors[0]) {
    //       this.displayErrMessage(graphQLErrors[0].message)
    //     } else {
    //       this.displayErrMessage(err.message)
    //     }
    //   }
    // }
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
                  error={this.errorMessageVisible}
                  loading={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  <Form.Input
                    type="text"
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
                    errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                  <Form.Input
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
                  {errors.username && (
                    <ErrorMessage>{errors.username}</ErrorMessage>
                  )}
                  <Form.Input
                    name="password"
                    error={touched.password && errors.password ? true : false}
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
                  <Form.Input
                    name="confirmPassword"
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? true
                        : false
                    }
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
                  {console.log('ERRORS: ', errors, touched)}
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
