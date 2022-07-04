import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { API, graphqlOperation } from "aws-amplify"

import { listTodos } from "../graphql/queries"
import NoItemComponent from "../components/NoItemComponent"
import TodoItemComponent from "../components/TodoItemComponent"
import TodosContext from "../context/TodosContext"

function HomeRoute(props) {
  const { todos, setTodos } = useContext(TodosContext)
  const navigate = useNavigate()

  const handleDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const handleUpdate = (index) => {
    navigate(`/update/${index}`)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const todoData = await API.graphql(graphqlOperation(listTodos))
        const todos = todoData.data.listTodos.items
        setTodos(todos)
      } catch (e) {
        console.log(e)
      }
    })()
  })

  return (
    <div>
      {todos.length < 1 ? (
        <NoItemComponent />
      ) : (
        todos.map((todo, index) => (
          <TodoItemComponent
            key={index}
            title={todo.title}
            description={todo.description}
            onDelete={() => handleDelete(index)}
            onUpdate={() => handleUpdate(index)}
          />
        ))
      )}
    </div>
  )
}

export default HomeRoute
