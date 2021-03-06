import './App.scss';
import {useId, useState} from "react";

import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";


function* gen() {
  let id = 0;
  while (true) {
    yield id;
    id++;
  }
}

const g = gen();

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('all');


  const handleInput = (event) => {
    setValue(event.target.value);
  }

  const handleAddTask = (event) => {
    if (event.key === 'Enter' && value !== '') {
      setTasks([...tasks, {
        id: g.next().value,
        name: value,
        status: false,
      }]);
      setValue('');
    }
  }

  const changeStatus = (task) => {
      setTasks(tasks.map((item) =>{
        if(item === task){
          item.status = !item.status;
        }
        return item;
      } ))
  }

  const removeTasks = (task) => {
    // const newTasks = tasks.filter((item) => item !== task);
    setTasks(tasks.filter((item) => item !== task));
  }

  const clearCompleted = () => {
    setTasks(tasks.filter((item) => !item.status));
  }

  return (
    <div className="App">
        <Header />
        <TaskInput value={value} handleInput={handleInput} handleAddTask={handleAddTask}/>
        <TaskList status={status} tasks={tasks} changeStatus={changeStatus} removeTasks={removeTasks} />


      {tasks.filter((task) => task.status).length ? <button onClick={clearCompleted}>Remove Completed</button> : ''
      }
      {/*<h2>{value}</h2>*/}
      {/*  <p>{tasks}</p>*/}
      <div>
      <button onClick={() => setStatus('all')}>All</button>
      <button onClick={() => setStatus(false)}>Active</button>
      <button onClick={() => setStatus(true)}>Done</button>
    </div>
    </div>
  );
}

export default App;
