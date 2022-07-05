import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { withAuthenticator } from "@aws-amplify/ui-react"

import NavComponent from "./components/NavComponent"
import TodosContext from "./context/TodosContext"
import HomeRoute from "./routes/HomeRoute"
import NewTodoRoute from "./routes/NewTodoRoute"
import UpdateTodoRoute from "./routes/UpdateTodoRoute"

import "@aws-amplify/ui-react/styles.css"

function App({ user, signOut }) {
  const [todos, setTodos] = useState([])

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <NavComponent email={user.attributes.email} signOut={signOut} />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/new" element={<NewTodoRoute />} />
        <Route path="/update/:id" element={<UpdateTodoRoute />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </TodosContext.Provider>
  )
}

export default withAuthenticator(App)
