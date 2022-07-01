import React from "react"
import { Link } from "react-router-dom"

import "./css/nav.css"

function NavComponent(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <h2>Todo App</h2>
      </Link>
      <Link to="/new">New TODO</Link>
    </nav>
  )
}

export default NavComponent
