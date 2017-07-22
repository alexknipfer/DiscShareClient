import { action, observable } from 'mobx'

import Validator from 'validatorjs'

class LoginStore {
  @observable
  form = {
    fields: {
      email: {
        value: '',
        error: null,
        rule: 'required|email'
      },
      password: {
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
  onFieldChange = (field, value) => {
    // if (!field) field = 'email'
    console.log('FIELD: ', field)
    this.form.fields[field].value = value
    let { email, password } = this.form.fields
    const validation = new Validator(
      { email: email.value, password: password.value },
      { email: email.rule, password: password.rule }
    )
    this.form.meta.isValid = validation.passes()
    this.form.fields[field].error = validation.errors.first(field)
  }
}

export default LoginStore
