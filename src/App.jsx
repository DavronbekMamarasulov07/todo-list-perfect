import { TiDeleteOutline } from "react-icons/ti";
import { BiCheck } from "react-icons/bi";
import { useReducer, useRef, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const newName = [...state.name, { text: action.payload, completed: false }];
      localStorage.setItem("tasks", JSON.stringify(newName)); 
      return {
        ...state,
        name: newName
      };
    case 'REMOVE_FROM_TASK':
      const filteredTasks = state.name.filter(task => task !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(filteredTasks)); 
      return {
        ...state,
        name: filteredTasks
      };
    case 'TOGGLE_TASK':
      const updatedTasks = state.name.map((task, index) => {
        if (index === action.payload) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        name: updatedTasks
      };
    default:
      return state;
  }
}

function App() {
  const initialState = {
    name: JSON.parse(localStorage.getItem("tasks")) || []
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value.trim(); 
  
    if (!inputValue) {
      toast.error('Enter a task', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
      return; 
    }
  
   
  
    dispatch({ type: 'ADD_TASK', payload: inputValue });
    toast.success('Task succesfully added', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });
    inputRef.current.value = '';
  }
  

  const handleRemoveFromTask = (task) => {
    dispatch({ type: 'REMOVE_FROM_TASK', payload: task });
    toast.success('Task succesfully deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });
  }

  const handleCheckTask = (index) => {
    dispatch({ type: 'TOGGLE_TASK', payload: index });

  }

  const [data, setData] = useState(1);
  const count = 5; 

  return (
   <>
         <div>
      <div className="todo">
        <div className="container">
          <div className="todo_main_content">
            <div className="todo_main">
              <div className="todo_content">
                <h1 className='todo_title'>
                  To Do List
                </h1>

                <form className="form" onSubmit={handleSubmit}>
                  <input type="text" placeholder='Add to task' ref={inputRef} required />
                  <button>Add task</button>
                </form>
                <div className="current_time">
                  {currentTime.toLocaleTimeString('en-US')}
                </div>
              </div>
              <div className="todo_wrapper">
                {state.name.slice(0, count * data).map((task, index) => (
                  <div key={index}>
                    <div className="todo_task">
                      <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</strong>
                      <div className="task_btn_content">
                        <button className="task_check_btn" onClick={() => handleCheckTask(index)}>
                          <BiCheck />
                        </button>
                        <button onClick={() => handleRemoveFromTask(task)} className="task_delete_btn">
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type='button' onClick={() => setData(prevData => prevData + 1)} className="more_task">More Tasks</button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default App;
