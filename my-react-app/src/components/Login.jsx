import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqlOperations/mutations";
const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({email:'', password:''});
  const [signinUser,{error,loading,data}] = useMutation(LOGIN_USER,{
    onCompleted(data){
      console.log(data)
      localStorage.setItem("token",data.user.token)
      navigate('/')
    }
  })
  console.log(data)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables:{
          userSignin:formData
      }
  })
  };

  if(loading) return <h1>Loading</h1>
  return (
    <div className="container my-container">
       {
                error && 
                <div className="red card-panel">{error.message}</div>
            }
      <h5>Login</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
           value={formData?.email}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
           value={formData?.password}
        />
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
        <Link to="/signup"><p>Dont have an account ?</p></Link> 

      </form>
    </div>
  );
};

export default Login;
