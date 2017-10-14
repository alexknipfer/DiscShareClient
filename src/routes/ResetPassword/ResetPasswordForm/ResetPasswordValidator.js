import { action, observable } from 'mobx'

import Validator from 'validatorjs'

class ResetPasswordValidator {
  @observable
  form = {
    fields: {
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
      isValid: false,
      error: null
    }
  }

  @action
  onFieldChange = (field, value) => {
    this.form.fields[field].value = value
    let { password, confirmPassword } = this.form.fields
    const validation = new Validator(
      { password: password.value, confirmPassword: confirmPassword.value },
      { password: password.rule, confirmPassword: confirmPassword.rule }
    )
    this.form.meta.isValid = validation.passes()
    this.form.fields[field].error = validation.errors.first(field)
  }
}

export default new ResetPasswordValidator()
