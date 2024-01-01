import React, { useState } from "react";
import "./Signin.css";
import axios from 'axios';
import { useStateValue } from "../../StateProvider";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useStateValue();
  
  const handleLogin = async () => {
    const response = await axios.post('http://localhost:8080/auth/login', { 
        email : email,
        password : password,
    },{
      withCredentials: true,
      credentials: 'include'
    }
    ).then(res=>res?.data)
    console.log(response);

    console.log('Login handler')

    dispatch({
      type: 'SIGN_IN',
      email: email,
      tasks: response
    })
    console.log(state);
  };

  const handleRegister = async () => {
    const response = await axios.post('http://localhost:8080/auth/register', { 
        email : email,
        password : password,
    },{
      withCredentials: true,
      credentials: 'include'
    });
    dispatch({
      type: 'SET_EMAIL',
      email: email,
    })
  };

  return (
    <>
      <div className="Tasks">
        <h1 >To-do's</h1>
        <div className="login-container">
          <h2 className="center">Login or Register</h2>
          <form className="login-form">
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="button-container">
              <button type="button" onClick={handleLogin}>
                Login
              </button>
              <button type="button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;