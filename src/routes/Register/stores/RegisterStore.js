import { action, observable } from 'mobx'

import Validator from 'validatorjs'

class RegisterStore {
  @observable
  form = {
    fields: {
      email: {
        value: '',
        error: null,
        rule: 'required|email'
      },
      username: {
        value: '',
        error: null,
        rule: 'required'
      },
      password: {
        value: '',
        error: null,
        rule: 'required'
      },
      confirmPassword: {
        value: '',
        error: null,
        rule: 'required'
      }
    },
    meta: {
      isValid: true,
      error: null
    }
  }

  @action
  detectValues = values => {
    const { email, username, password, confirmPassword } = values
    if (
      email === '' ||
      username === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      this.form.meta.isValid = false
    }
  }

  @action
  onFieldChange = (field, value) => {
    this.form.fields[field].value = value

    let { email, username, password, confirmPassword } = this.form.fields
    const validation = new Validator(
      {
        email: email.value,
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      },
      {
        email: email.rule,
        username: username.rule,
        password: password.rule,
        confirmPassword: confirmPassword.rule
      }
    )
    this.form.meta.isValid = validation.passes()
    this.form.fields[field].error = validation.errors.first(field)
  }
}

export default new RegisterStore()
