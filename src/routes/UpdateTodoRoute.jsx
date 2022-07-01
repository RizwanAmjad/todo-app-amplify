import React, { useContext, useEffect, useState } from "react"
import * as yup from "yup"
import { useNavigate, useParams } from "react-router-dom"

import TodosContext from "../context/TodosContext"
import FormComponent from "../components/form/FormComponent"
import FormInputComponent from "../components/form/FormInputComponent"
import FormSubmitComponent from "../components/form/FormSubmitComponent"

function UpdateTodoRoute(props) {
  const [currentTodo, setCurrentTodo] = useState({})
  const { todos, setTodos } = useContext(TodosContext)

  const navigate = useNavigate()
  const params = useParams()

  const newTodoSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  })

  const handleUpdateTodo = (todo, { setSubmitting }) => {
    const newTodos = [...todos]
    newTodos[params.id] = todo
    setTodos(newTodos)
    setSubmitting(false)

    navigate("/")
  }

  useEffect(() => {
    const { id } = params
    setCurrentTodo(todos[id])
  }, [])

  return (
    <div>
      <FormComponent
        enableReinitialize
        initialValues={{
          title: currentTodo.title || "",
          description: currentTodo.description || "",
        }}
        initialErrors={{ title: "", description: "" }}
        onSubmit={handleUpdateTodo}
        validationSchema={newTodoSchema}
      >
        <FormInputComponent name="title" placeholder="TODO title" />
        <FormInputComponent name="description" placeholder="TODO Description" />
        <FormSubmitComponent value="UPDATE TODO" />
      </FormComponent>
    </div>
  )
}

export default UpdateTodoRoute
