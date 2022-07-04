import React, { useContext } from "react"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { API, graphqlOperation } from "aws-amplify"

import { createTodo } from "../graphql/mutations"
import FormComponent from "../components/form/FormComponent"
import FormInputComponent from "../components/form/FormInputComponent"
import FormSubmitComponent from "../components/form/FormSubmitComponent"
import TodosContext from "../context/TodosContext"

function NewTodoRoute(props) {
  const { todos, setTodos } = useContext(TodosContext)
  const navigate = useNavigate()

  const newTodoSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  })

  const handleNewTodo = async (
    todo,
    { setValues, setTouched, setSubmitting }
  ) => {
    setTodos([todo, ...todos])
    setValues({ title: "", description: "" })
    setTouched({ title: false, description: false })
    setSubmitting(false)

    const result = await API.graphql(
      graphqlOperation(createTodo, { input: { ...todo } })
    )
    if (result.errors) return alert("Cannot add the Todo")

    navigate("/")
  }

  return (
    <div>
      <FormComponent
        initialValues={{ title: "", description: "" }}
        initialErrors={{ title: "", description: "" }}
        onSubmit={handleNewTodo}
        validationSchema={newTodoSchema}
      >
        <FormInputComponent name="title" placeholder="TODO title" />
        <FormInputComponent name="description" placeholder="TODO Description" />
        <FormSubmitComponent value="ADD TODO" />
      </FormComponent>
    </div>
  )
}

export default NewTodoRoute
