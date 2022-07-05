import React, { useContext } from "react"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { API, graphqlOperation } from "aws-amplify"
import { Auth } from "aws-amplify"
import { Storage } from "aws-amplify"

import { createTodo } from "../graphql/mutations"
import FormComponent from "../components/form/FormComponent"
import FormInputComponent from "../components/form/FormInputComponent"
import FormSubmitComponent from "../components/form/FormSubmitComponent"
import TodosContext from "../context/TodosContext"
import FormFileSelector from "../components/form/FormFileSelector"

function NewTodoRoute(props) {
  const { todos, setTodos } = useContext(TodosContext)
  const navigate = useNavigate()

  const newTodoSchema = yup.object().shape({
    title: yup.string().required().label("Title"),
    description: yup.string().required().label("Description"),
    image: yup
      .mixed()
      .required("A file is required")
      .test(
        "format",
        "upload file",
        (value) =>
          !value ||
          (value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
      )
      .label("Image"),
  })

  const handleNewTodo = async (
    todo,
    { setValues, setTouched, setSubmitting }
  ) => {
    setTodos([todo, ...todos])
    setValues({ title: "", description: "" })
    setTouched({ title: false, description: false })
    setSubmitting(false)

    const user = await Auth.currentUserInfo()
    const imageRes = await Storage.put(todo.image.name, todo.image)

    const result = await API.graphql(
      graphqlOperation(createTodo, {
        input: { ...todo, user: user.id, image: imageRes.key },
      })
    )
    if (result.errors) return alert("Cannot add the Todo")

    navigate("/")
  }

  return (
    <div>
      <FormComponent
        initialValues={{ title: "", description: "", image: "" }}
        initialErrors={{ title: "", description: "", image: "" }}
        onSubmit={handleNewTodo}
        validationSchema={newTodoSchema}
      >
        <FormInputComponent name="title" placeholder="TODO title" />
        <FormInputComponent name="description" placeholder="TODO Description" />
        <FormFileSelector name="image" />
        <FormSubmitComponent value="ADD TODO" />
      </FormComponent>
    </div>
  )
}

export default NewTodoRoute
