import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';
import './LoginPage.css';

const LoginPage = () => {

  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateLogin = (e) => {
    e.preventDefault();

    validateUser(loginData.username, loginData.password).then((response) => {
      let role = String(response.data);

      if (role === "Admin") navigate("/AdminMenu");
      else if (role === "Student") navigate("/StudentMenu");
      else alert("Wrong Username/Password");
    });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) validateLogin(e);
  };

  return (
    <div className="login-wrapper">

      <div className="login-container">

        {/* LOGO  */}
        <img src="img.jpg" alt="logo" className="login-logo" />

        <h2 className="login-title">Welcome back!</h2>

        <form className="login-form">

          {/* EMAIL */}
          <div className="input-box">
            <i className="fa fa-envelope icon"></i>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={loginData.username}
              onChange={onChangeHandler}
            />
          </div>
          {errors.username && <p className="error-text">{errors.username}</p>}

          {/* PASSWORD */}
          <div className="input-box">
            <i className="fa fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={onChangeHandler}
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button className="login-btn" onClick={handleValidation}>
            LOGIN
          </button>
        </form>

        <a href="#" className="forgot-link">Forgot password?</a>

       <p className="register-text">
  Don’t have an account?{" "}
  <span
    className="register-link"
    onClick={() => navigate("/Register")}
  >
    Register here
  </span>
</p>

      </div>

    </div>
  );
};

export default LoginPage;