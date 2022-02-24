import React, { useEffect, useState } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./models/models";

// to get from local storage 

const getLocalItems=()=>{
  let list=localStorage.getItem('lists');
  if(list){
    return JSON.parse(localStorage.getItem('lists')||'');
  }
  else{
    return [];
  }

}
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(getLocalItems());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  // add data to localstorage 
  useEffect(()=>{
  localStorage.setItem('lists',JSON.stringify(todos))
  },[todos]);

  return (
    <div className="App">
      <span className="heading">TODO APP</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
