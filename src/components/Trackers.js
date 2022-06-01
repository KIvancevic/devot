import { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import '../styles/trackers.css'
import stopWatch from '../stopWatch.svg'
import Title from './Title';
import AddTodo from './AddTodo';
import Todo from './Todo';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../firebase"

export default function Trackers() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id});
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, [])

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title })
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  };

  return (
    <div className='trackersContainer'>
      <div className='dateContainer'>
        <i className="pi pi-calendar" 
            style={{
              'fontSize': '1.5em',
              }}/>
            Today
        <h3 icon="pi pi-calendar" />
      </div>
      <div className='startStop'>
        <Button label="Start a new timer" className='buttonStart'>
          <img src={stopWatch} className='stopWatch' alt='stopWatch'/>
        </Button>
        <Button label="Stop all" icon="pi pi-stop-circle"></Button>
      </div>
      <Title />
      <AddTodo />
      <div className='todo_header'>
        <p>Time logged</p>
        <p>Description</p>
        <p>Actions</p>
      </div>
      <div className='todo_container'>
        {todos.map((todo) => (
          <Todo 
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
