import React ,{useState , useEffect} from 'react';
import './App.css';

//importing component
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getlocalTodos();
  }, []);


  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  
  const filterHandler = () =>{
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted' :
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default :
        setFilteredTodos(todos)
    }
  };

  const saveLocalTodos = () =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  const getlocalTodos = () =>{
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }else {
    let todoLocal = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoLocal);
    }

  }

 

 

  return (
    <div className="App">
      <header>
          <h1>To-do List </h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} filteredTodos={filteredTodos} />
      <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
