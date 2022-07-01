import React from "react"
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri"

import "./css/todo-item.css"

function TodoItemComponent({ title, description, onDelete, onUpdate }) {
  return (
    <div className="todo-item">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="controls">
        <RiEdit2Fill size={40} onClick={onUpdate} />
        <RiDeleteBin4Fill size={40} onClick={onDelete} />
      </div>
    </div>
  )
}

export default TodoItemComponent
