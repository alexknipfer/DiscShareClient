import { Input } from 'semantic-ui-react'
import React from 'react'

const FormInput = ({ id, name, error, onChange, placeholder, type, value }) => {
  console.log('VALUE: ', value)
  return (
    <div>
      <Input
        id={id}
        value={value}
        type={type || 'text'}
        name={name}
        onChange={e => onChange(e.target.name, e.target.value)}
        placeholder={placeholder}
      />
      {error &&
        <div>
          {error}
        </div>}
    </div>
  )
}

export default FormInput
