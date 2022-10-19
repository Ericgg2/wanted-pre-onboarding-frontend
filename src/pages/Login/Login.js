import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../components/Config/Config';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    emailLogin: '',
    passwordLogin: '',
  });
  const navigate = useNavigate();

  const handleInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { email, password, emailLogin, passwordLogin } = user;

  const isValid = email.includes('@') && password.length >= 8;
  const loginIsValid = emailLogin.includes('@') && passwordLogin.length >= 8;

  const signUp = e => {
    e.preventDefault();
    fetch(`${API}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          alert('회원가입 성공!');
        } else {
          alert('회원가입 실패');
        }
      });
  };

  const signIn = e => {
    e.preventDefault();
    fetch(`${API}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          alert('로그인 성공!');
          navigate('/todo');
          localStorage.setItem('access_token', result.access_token);
        } else {
          alert('로그인 실패');
        }
      });
  };

  useEffect(() => {
    localStorage.getItem('access_token') && navigate('/todo');
  }, []);

  return (
    <div className=" ">
      <div className="d-flex justify-content-around">
        <form onChange={handleInput}>
          <div className="mb-3">
            <h1>Register</h1>
            <label className="form-label">email</label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label ">Password</label>
            <input
              type="password"
              className="form-control "
              id="exampleInputPassword1"
              name="password"
            />
          </div>
          <button
            disabled={!isValid}
            onClick={signUp}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        <form onChange={handleInput} className="">
          <div className="mb-3">
            <h1>Login</h1>
            <label className="form-label">email</label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="emailLogin"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label ">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="passwordLogin"
            />
          </div>
          <button
            disabled={!loginIsValid}
            onClick={signIn}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
