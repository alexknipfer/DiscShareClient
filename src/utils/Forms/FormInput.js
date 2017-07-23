import { Icon, Input } from 'semantic-ui-react'

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 5px;
`

const FormInput = ({
  id,
  name,
  errorMessage,
  onChange,
  placeholder,
  type,
  value
}) => {
  return (
    <div>
      <Input
        id={id}
        type={type || 'text'}
        name={name}
        onChange={e => onChange(e.target.name, e.target.value)}
        placeholder={placeholder}
        icon={errorMessage && <Icon name="exclamation circle" color="red" />}
      />
      {errorMessage &&
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>}
    </div>
  )
}

FormInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password'])
}

export default FormInput
