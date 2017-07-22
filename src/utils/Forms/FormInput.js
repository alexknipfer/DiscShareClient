import React from 'react'

const FormInput = ({ error, onChange, placeholder, type, value }) => {
  console.log('PROPS: ', onChange)
  return (
    <div>
      <input
        value={value}
        type={type || 'text'}
        onChange={e => onChange(e.target.name, value)}
      />
      {error &&
        <div>
          {error}
        </div>}
    </div>
  )
}

export default FormInput
