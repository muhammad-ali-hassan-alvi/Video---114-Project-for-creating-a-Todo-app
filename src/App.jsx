import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])//Array which will hold all the todo
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {

    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }


  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name

    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    saveToLS()
  }


  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="md:container bg-violet-100 md:mx-auto mx-3 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2 ">

        <h1 className='font-bold text-3xl text-center'>iTask - Your ToDo Planner</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add ToDo</h2>

          <div className="flex gap-2">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full  px-5 py-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm font-bold text-white disabled:bg-red-600 rounded-xl'>Save</button>
          </div>
        </div>

        <input type="checkbox" checked={showFinished} onChange={toggleFinished} className='my-4' /> Show Finished

        <div className='h-[1px] bg-black'></div>

        <h2 className='text-xl font-bold m-2'>Your Todos</h2>

        <div className="todos">

          {todos.length === 0 && <div className='m-5'> No ToDo to Display... </div>}
          {
            todos.map(item => {


              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between w-full">

                <div className='flex gap-5'>
                  <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id='' name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm font-bold mx-1 text-white rounded-md'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm font-bold mx-1 text-white rounded-md'><MdDeleteForever /></button>
                </div>
              </div>
            })
          }
        </div>

      </div>
    </>
  )
}

export default App
