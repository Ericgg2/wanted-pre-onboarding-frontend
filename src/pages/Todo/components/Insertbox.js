import React, { useState } from 'react';
import { API } from '../../../components/Config/Config';

const Insertbox = () => {
  const [listTodo, setListToDo] = useState('');

  const handleInput = e => {
    const { value } = e.target;
    setListToDo(value);
  };
  const insertToDo = e => {
    e.preventDefault();
    fetch(`${API}todos`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        todo: listTodo,
      }),
    })
      .then(response => response.json())
      .then(result => {
        result.todo && setListToDo('');
      });
  };

  return (
    <div>
      <form>
        <div className="mb-3 d-flex">
          <input
            onChange={handleInput}
            type="text"
            className="form-control "
            name="todo"
            value={listTodo}
            placeholder="입력해주세요"
          />
          <button
            onClick={insertToDo}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Insertbox;
