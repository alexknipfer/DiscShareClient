import { action, observable } from 'mobx'

import Validator from 'validatorjs'

class LoginStore {
  @observable
  form = {
    fields: {
      username: {
        value: '',
        error: null,
        rule: 'required'
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
  detectValues = values => {
    console.log('INIT VALUES: ', values)
    const { username, password } = values
    if (username === '' || password === '') {
      this.form.meta.isValid = false
    }
  }

  @action
  onFieldChange = (field, value) => {
    this.form.fields[field].value = value
    let { username, password } = this.form.fields
    const validation = new Validator(
      { username: username.value, password: password.value },
      { username: username.rule, password: password.rule }
    )
    this.form.meta.isValid = validation.passes()
    this.form.fields[field].error = validation.errors.first(field)
  }
}

export default new LoginStore()
