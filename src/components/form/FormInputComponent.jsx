import React from "react"

import { useFormikContext } from "formik"

import "./css/form-input.css"

function FormInputComponent({ name, ...props }) {
  const { values, setValues, errors, touched, setTouched } = useFormikContext()

  return (
    <React.Fragment>
      {errors[name] && touched[name] && (
        <span className="input-error">{errors[name]}</span>
      )}
      <input
        className="form-input"
        onChange={({ target }) => {
          values[name] = target.value
          setValues(values)
        }}
        onBlur={() => {
          touched[name] = true
          setTouched(touched)
        }}
        value={values[name]}
        {...props}
      />
    </React.Fragment>
  )
}

export default FormInputComponent
