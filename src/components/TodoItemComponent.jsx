import React, { useState } from "react"
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri"
import { Storage } from "aws-amplify"

import "./css/todo-item.css"

function TodoItemComponent({ title, description, image, onDelete, onUpdate }) {
  const [signedImage, setSignedImage] = useState("")
  Storage.get(image).then((value) => setSignedImage(value))
  return (
    <div className="todo-item">
      {signedImage && <img src={signedImage} alt={title} />}
      <div className="textual-info">
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
