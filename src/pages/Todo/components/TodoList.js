import React, { useState, useEffect } from 'react';
import { API } from '../../../components/Config/Config';
import axios from 'axios';

const TodoList = () => {
  const [listTodo, setListToDo] = useState([]);

  const getData = () => {
    fetch(`${API}todos`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setListToDo(res);
      });
  };
  console.log(listTodo);
  const doneToDo = (id, todo, isCompleted) => {
    fetch(`${API}todos/:${id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todo,
        isCompleted: isCompleted,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setListToDo(result);
      });
    setTimeout(() => {
      getData();
    }, 10);
  };

  const deleteToDo = id => {
    console.log(id);
    fetch(`${API}todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
    setTimeout(() => {
      getData();
    }, 200);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="listAll">
      {listTodo.length > 0 &&
        listTodo.map(item => {
          const { id, isCompleted, todo } = item;
          return (
            <div
              key={id}
              className="listIndividual d-flex justify-content-between"
            >
              {item.isCompleted ? <s>{item.todo}</s> : item.todo}
              <div className="right d-flex">
                <p
                  onClick={() => {
                    !isCompleted
                      ? doneToDo(id, todo, true)
                      : doneToDo(id, todo, false);
                  }}
                >
                  ✔
                </p>
                <button>수정</button>{' '}
                <button
                  onClick={() => {
                    deleteToDo(id);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TodoList;
