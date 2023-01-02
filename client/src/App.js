import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: '', content: '' });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  const [buttonName, setButtonName] = useState('Add');
  
  useEffect(() => {
    let currentTodo = currentId !== 0 ? todos.find(todo => todo._id === currentId) : { title: '', content: '' }
    if(currentTodo.hasOwnProperty('content') === false) {
      currentTodo.content = '';
    }

    // console.log(currentTodo);
    if(currentId !== 0) {
      setButtonName('Update');
    }
    
    setTodo(currentTodo);
  }, [currentId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    }
    fetchData();
  }, [currentId])

  const clear = () => {
    setCurrentId(0);
    setButtonName('Add');
    setTodo({ title:'', content:'' });
  }

  useEffect(() => {
    const clearField = (event) => {
       if (event.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener('keydown', clearField);

    return () => {
      window.removeEventListener('keydown', clearField);
    };
  }, []);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(currentId === 0) {
      const result = await createTodo(todo);
      setTodos([ ...todos, result]);
    } else {
      await updateTodo(currentId, todo);
    }
    clear();
  }
  
   const removeTodo = async (id) => {
    await deleteTodo(id);
    // const todosCopy = [ ...todos];
    // todosCopy.filter(todo => todo._id !== id);
    // setTodos(todosCopy);
    clear();
    const result = await readTodos();
    setTodos(result);
   }
  return (
    <div className="container">
      <div className="row">
        {/* <pre>{JSON.stringify(todo)}</pre> */}
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="title" type="text" className="validate" 
              value={todo.title}
              onChange={e => setTodo({ ...todo, title:e.target.value})} />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate"
              value={todo.content}
              onChange={(e) => setTodo({ ...todo, content:e.target.value})} />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="btn waves-effect waves-light">{ buttonName }</button>
          </div>
        </form>
        {
          !todos ? <Preloader />: todos.length > 0 ? <ul className="collection">
            { todos.map(todo => (
            <li key={todo._id}
            onClick={() => setCurrentId(todo._id)}
            className="collection-item"><div><h5>{todo.title}</h5><p>{todo.content}<a href="" onClick={() => removeTodo(todo._id)} className="secondary-content"><i className="material-icons">delete</i></a></p></div></li>
          ))} </ul> : <ul className="collection center-align"><li>No Todo exists</li></ul>
        }

      </div>

    </div>
  );
}

export default App;
