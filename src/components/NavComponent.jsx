import React from "react"
import { Link } from "react-router-dom"
import { Button, Heading } from "@aws-amplify/ui-react"
import "./css/nav.css"

function NavComponent({ email, signOut }) {
  return (
    <nav className="nav">
      <Link to="/">
        <h2>Todo App</h2>
      </Link>
      <Heading level={6}>Hello {email}</Heading>
      <Link to="/new">New TODO</Link>
      <Button onClick={signOut}>Sign out</Button>
    </nav>
  )
}

export default NavComponent
