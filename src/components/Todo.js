import { useState } from 'react'
import playIcon from '../startCircle.png'

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit
}) {
  
  const [newTitle, setNewTitle] = useState(todo.title);
  const [clicked, setClicked] = useState(false)
  console.log(clicked)

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value)
    }
  }

  return (
    <div className='todo'>
      <p>vrijeme: 12:50</p>
      <input 
        style={{ textDecoration: todo.completed && 
        "line-through"}}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        className="list"
        onChange={handleChange}
      />
      <div>
        {/* <button
          className='button-complete'
          onClick={() => toggleComplete(todo)}
        > 
            <i className="pi pi-check" style={{'fontSize': '2em'}} />
        </button> */}
        <button
          className='button-complete'
          onClick={() => setClicked(prevCheck => !prevCheck)}
        >
          {!clicked ? 
            <img src={playIcon} className='playIcon' alt='play' width={20} height={20}/>
            :
            <i className="pi pi-stop-circle" style={{'fontSize': '1.5em', 'color':'#FF5722'}} />
          }
        </button>
        <button
          className='button-complete'
          onClick={() => toggleComplete(todo)}
        > 
            <i className="pi pi-stop-circle" style={{'fontSize': '1.5em', 'color':'#5F6B8A'}} />
        </button>
        <button
          className='button-edit'
          onClick={() => handleEdit(todo, newTitle)}
        >
          <i className="pi pi-pencil" style={{'fontSize': '1.5em', 'color':'#5F6B8A'}}></i>
        </button>
        <button
          className='button-delete'
          onClick={() => handleDelete(todo.id)}
        >
          <i className="pi pi-trash" style={{'fontSize': '1.5em', 'color':'#5F6B8A'}}></i>
        </button>
      </div>
    </div>
  )
}
