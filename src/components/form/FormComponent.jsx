import React from "react"

import { Formik } from "formik"

import "./css/form.css"

function FormComponent({
  children,
  onSubmit,
  initialErrors,
  initialValues,
  validationSchema,
  ...props
}) {
  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        initialErrors={initialErrors}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        {...props}
      >
        {() => <React.Fragment>{children}</React.Fragment>}
      </Formik>
    </div>
  )
}

export default FormComponent
