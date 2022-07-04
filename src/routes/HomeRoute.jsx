import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { API, graphqlOperation } from "aws-amplify"

import { listTodos } from "../graphql/queries"
import { deleteTodo } from "../graphql/mutations"
import NoItemComponent from "../components/NoItemComponent"
import TodoItemComponent from "../components/TodoItemComponent"
import TodosContext from "../context/TodosContext"

function HomeRoute(props) {
  const { todos, setTodos } = useContext(TodosContext)
  const navigate = useNavigate()

  const handleDelete = async (index, todo) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)

    const result = await API.graphql(
      graphqlOperation(deleteTodo, { input: { id: todo.id } })
    )
  }

  const handleUpdate = (index) => {
    navigate(`/update/${index}`)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const todoData = await API.graphql(graphqlOperation(listTodos))
        const todos = todoData.data.listTodos.items
        const { compare } = Intl.Collator("en-US")
        todos.sort((a, b) => compare(b.createdAt, a.createdAt))
        setTodos(todos)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

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
            onDelete={() => handleDelete(index, todo)}
            onUpdate={() => handleUpdate(index)}
          />
        ))
      )}
    </div>
  )
}

export default HomeRoute
