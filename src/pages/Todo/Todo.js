import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../components/Config/Config';
import Logout from './components/Logout';
import Insertbox from './components/Insertbox';
import TodoList from './components/TodoList';
import './todo.scss';

const Todo = () => {
  const navigate = useNavigate();

  const [listTodo, setListTodo] = useState([]);

  useEffect(() => {
    !localStorage.getItem('access_token') && navigate('/');
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div className="box">
        <Insertbox listTodo={listTodo} setListTodo={setListTodo}></Insertbox>
        <TodoList listTodo={listTodo} setListTodo={setListTodo}></TodoList>
        <Logout navigate={navigate}></Logout>
      </div>
    </div>
  );
};

export default Todo;
