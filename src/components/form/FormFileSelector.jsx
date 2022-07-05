import React from "react"

import { useFormikContext } from "formik"

import { MdAddAPhoto, MdCheckBox } from "react-icons/md"

import "./css/form-image-selector.css"

function FormFileSelector({ name }) {
  const { values, setValues, errors, touched, setTouched } = useFormikContext()

  const handleChange = ({ target }) => {
    values[name] = target.files[0]
    setValues(values)
  }

  return (
    <React.Fragment>
      {errors[name] && touched[name] && (
        <span className="input-error">{errors[name]}</span>
      )}
      <div className="image-select">
        <label htmlFor="select-image">
          {values[name] ? <MdCheckBox /> : <MdAddAPhoto />}
        </label>
        <input
          id="select-image"
          className="image-select-btn"
          type="file"
          name={name}
          accept="*/*"
          onBlur={() => {
            touched[name] = true
            setTouched(touched)
          }}
          onChange={handleChange}
        />
      </div>
    </React.Fragment>
  )
}

export default FormFileSelector
